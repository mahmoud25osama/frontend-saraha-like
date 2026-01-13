'use client'

import { createContext, useEffect, useState, ReactNode } from 'react'
import { messageAPI } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'
import { Message, MessagesContextType } from '@/types'

export const MessagesContext = createContext<MessagesContextType | null>(null)

export function MessagesProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth()

    const [messages, setMessages] = useState<Message[]>([])
    const [stats, setStats] = useState({
        totalMessages: 0,
        unreadCount: 0,
        favoritesCount: 0,
    })

    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [filter, setFilter] = useState<string>('all')

    const loadAll = async (background = false) => {
        if (!user) return

        if (!background) setLoading(true)
        else setRefreshing(true)

        try {
            const [messagesRes, statsRes] = await Promise.all([
                messageAPI.getMyMessages(
                    1,
                    filter === 'all' ? undefined : filter
                ),
                messageAPI.getStats(),
            ])

            setMessages(messagesRes.data.messages)
            setStats(statsRes.data)
        } catch (e) {
            console.error(e)
        } finally {
            if (!background) setLoading(false)
            else setRefreshing(false)
        }
    }
    const handleToggleFavorite = async (msg: Message) => {
        setLoading(true)
        try {
            await messageAPI.toggleFavorite(msg._id)
            loadAll()
        } catch (error) {
            console.error('Error toggling favorite:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (msg: Message) => {
        if (confirm('Are you sure you want to delete this message?')) {
            setLoading(true)
            try {
                await messageAPI.deleteMessage(msg._id)
                loadAll()
            } catch (error) {
                console.error('Error deleting message:', error)
            } finally {
                setLoading(false)
            }
        }
    }

    const handleMarkAsRead = async (message: Message) => {
        if (!message.isRead) {
            try {
                await messageAPI.markAsRead(message._id)
                loadAll()
            } catch (error) {
                console.error('Error marking as read:', error)
            }
        }
    }
    useEffect(() => {
        if (!user) return

        loadAll()

        const interval = setInterval(() => {
            loadAll(true)
        }, 5000)

        return () => clearInterval(interval)
    }, [user])

    return (
        <MessagesContext.Provider
            value={{
                messages,
                stats,
                setFilter,
                filter,
                newMessages: stats.unreadCount,
                loading,
                refreshing,
                handleToggleFavorite,
                handleDelete,
                handleMarkAsRead,
                refresh: () => loadAll(true),
            }}
        >
            {children}
        </MessagesContext.Provider>
    )
}
