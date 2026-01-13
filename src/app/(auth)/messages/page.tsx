'use client'

import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import MessageCard from '@/components/MessageCard'
import { useRouter } from 'next/navigation'
import { useMessages } from '@/hooks/useMessage'

export default function MessagesPage() {
    const { user, loading: authLoading } = useAuth()
    const { messages, stats, setFilter, filter } = useMessages()
    const router = useRouter()

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login')
            return
        }

        if (!user) return
    }, [user, authLoading])

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    My Messages
                </h1>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="text-3xl font-bold text-blue-600">
                            {stats.totalMessages}
                        </div>
                        <div className="text-gray-600">Total Messages</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="text-3xl font-bold text-green-600">
                            {stats.unreadCount}
                        </div>
                        <div className="text-gray-600">Unread</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="text-3xl font-bold text-yellow-600">
                            {stats.favoritesCount}
                        </div>
                        <div className="text-gray-600">Favorites</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex space-x-4 mb-6">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg ${
                            filter === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('unread')}
                        className={`px-4 py-2 rounded-lg ${
                            filter === 'unread'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Unread
                    </button>
                    <button
                        onClick={() => setFilter('favorites')}
                        className={`px-4 py-2 rounded-lg ${
                            filter === 'favorites'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Favorites
                    </button>
                </div>

                {/* Messages */}
                <div className="space-y-4">
                    {messages.length === 0 ? (
                        <div className="bg-white rounded-lg shadow p-12 text-center">
                            <p className="text-gray-500 text-lg">
                                No messages yet
                            </p>
                            <p className="text-gray-400 mt-2">
                                Share your link to start receiving messages!
                            </p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <MessageCard key={msg._id} {...msg} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
