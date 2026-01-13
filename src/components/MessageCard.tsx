'use client'

import { Message } from '@/types'
import { useMessages } from '@/hooks/useMessage'
import { FaRegStar, FaStar, FaTrash } from 'react-icons/fa'

export default function MessageCard(message: Message) {
    const { handleMarkAsRead, handleDelete, handleToggleFavorite, loading } =
        useMessages()

    return (
        <div
            className={`bg-white rounded-lg shadow-md p-6  ${
                !message.isRead
                    ? 'border-l-4 border-blue-500 cursor-pointer'
                    : ''
            }`}
            onClick={() => handleMarkAsRead(message)}
        >
            <div className="flex justify-between items-start mb-4">
                <span className="text-sm text-gray-500">
                    {new Date(message.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
                <div className="flex space-x-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleToggleFavorite(message)
                        }}
                        disabled={loading}
                        className={`${
                            message.isFavorite
                                ? 'text-yellow-500'
                                : 'text-gray-400'
                        } hover:text-yellow-500 cursor-pointer`}
                    >
                        {message.isFavorite ? <FaStar /> : <FaRegStar />}
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(message)
                        }}
                        disabled={loading}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">
                {message.content}
            </p>
        </div>
    )
}
