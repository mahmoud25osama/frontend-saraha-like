'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { userAPI } from '@/lib/api'
import { useRouter } from 'next/navigation'
import Error from 'next/error'

export default function SettingsPage() {
    const { user, loading: authLoading, updateUser } = useAuth()
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        allowMessages: true,
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login')
        } else if (user) {
            setFormData({
                name: user.name,
                bio: user.bio || '',
                allowMessages: user.allowMessages,
            })
        }
    }, [user, authLoading])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess(false)

        try {
            const { data } = await userAPI.updateProfile(formData)
            updateUser(data)
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Update failed')
        } finally {
            setLoading(false)
        }
    }

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-700">Loading...</div>
            </div>
        )
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Settings
                </h1>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                            Profile updated successfully! ✓
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bio
                            </label>
                            <textarea
                                className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={4}
                                maxLength={200}
                                placeholder="Tell people about yourself..."
                                value={formData.bio}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        bio: e.target.value,
                                    })
                                }
                            />
                            <div className="text-right text-sm text-gray-500 mt-1">
                                {formData.bio.length}/200
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Privacy Settings
                            </h3>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-700">
                                        Allow Messages
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        When disabled, people won't be able to
                                        send you messages
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            allowMessages:
                                                !formData.allowMessages,
                                        })
                                    }
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                        formData.allowMessages
                                            ? 'bg-blue-600'
                                            : 'bg-gray-300'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                            formData.allowMessages
                                                ? 'translate-x-6'
                                                : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Account Information
                            </h3>
                            <div className="space-y-2 text-sm">
                                <p>
                                    <span className="text-gray-800">
                                        Email:
                                    </span>{' '}
                                    <span className="font-medium text-gray-600">
                                        {user.email}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-gray-800">
                                        Username:
                                    </span>{' '}
                                    <span className="font-medium text-gray-600">
                                        @{user.username}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
