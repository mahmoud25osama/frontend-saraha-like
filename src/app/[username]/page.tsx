'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { userAPI, messageAPI } from '@/lib/api'
import Image from 'next/image'
import { User } from '@/types'

export default function SendMessagePage() {
    const params = useParams()
    const username = params.username as string

    const [user, setUser] = useState<User | null>(null)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        let mounted = true

        const loadUser = async () => {
            try {
                const { data } = await userAPI.getPublicProfile(username)
                if (mounted) setUser(data)
            } catch {
                if (mounted) setError('User not found')
            }
        }

        if (username) loadUser()

        return () => {
            mounted = false
        }
    }, [username])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess(false)

        try {
            await messageAPI.sendMessage(username, message)
            setSuccess(true)
            setMessage('')
            setTimeout(() => setSuccess(false), 3000)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send message')
        } finally {
            setLoading(false)
        }
    }

    if (error && !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        User Not Found
                    </h1>
                    <p className="text-gray-600">
                        {`The user @${username} doesn't exist.`}
                    </p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        )
    }

    if (!user.allowMessages) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Messages Disabled
                    </h1>
                    <p className="text-gray-600">
                        @{username} is not accepting messages at this time.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <div className="text-center mb-8">
                        <Image
                            src={user.avatar}
                            alt={user.name}
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h1 className="text-3xl font-bold text-gray-800">
                            {user.name}
                        </h1>
                        <p className="text-gray-600">@{user.username}</p>
                        {user.bio && (
                            <p className="text-gray-500 mt-2">{user.bio}</p>
                        )}
                    </div>

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                            Message sent successfully! 🎉
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">
                                Send an anonymous message to {user.name}
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message here... (Be kind!)"
                                className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={6}
                                maxLength={1000}
                                required
                            />
                            <div className="text-right text-sm text-gray-500 mt-1">
                                {message.length}/1000
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !message.trim()}
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {loading ? 'Sending...' : 'Send Anonymous Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
