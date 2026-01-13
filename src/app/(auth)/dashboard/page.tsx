'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { TbMessage } from 'react-icons/tb'
import { IoSettings } from 'react-icons/io5'
import { MdLocalPostOffice } from 'react-icons/md'
import { useMessages } from '@/hooks/useMessage'
export default function Dashboard() {
    const { user, loading } = useAuth()
    const { stats } = useMessages()
    const router = useRouter()
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        )
    }

    if (!user) return null

    const shareUrl = `${window.location.origin}/${user.username}`

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
                    <div className="text-center mb-8">
                        <Image
                            src={user.avatar}
                            alt={user.name}
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h1 className="text-3xl font-bold text-gray-800">
                            Welcome, {user.name}!
                        </h1>
                        <p className="text-gray-600">@{user.username}</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="flex  flex-col items-center mb-4 lg:flex-row text-center gap-2">
                            <TbMessage className=" text-gray-800 w-10 h-10" />

                            <h2 className=" text-base lg:text-xl font-semibold text-gray-800 ">
                                Your Anonymous Message Link
                            </h2>
                        </div>
                        <div className="flex flex-col lg:flex-row items-center space-x-2">
                            <input
                                type="text"
                                value={shareUrl}
                                readOnly
                                className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg bg-white"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="bg-blue-600 text-white mt-4 lg:mt-0 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                {copied ? '✓ Copied!' : 'Copy'}
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-4">
                            Share this link on social media to receive anonymous
                            messages!
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                        onClick={() => router.push('/messages')}
                        className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition"
                    >
                        <MdLocalPostOffice className="w-10 h-10 text-gray-700 mb-2" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            View Messages
                        </h3>
                        <p className="text-gray-600">
                            Check all your received anonymous messages
                        </p>
                        <div className="mt-4 text-2xl font-bold text-blue-600">
                            {stats.totalMessages || 0} messages
                        </div>
                    </div>

                    <div
                        onClick={() => router.push('/settings')}
                        className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition"
                    >
                        <IoSettings className="w-10 h-10 text-gray-700 mb-2" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Settings
                        </h3>
                        <p className="text-gray-600">
                            Manage your profile and privacy settings
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
