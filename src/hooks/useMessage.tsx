import { MessagesContext } from '@/context/MessagesContext'
import { useContext } from 'react'

export const useMessages = () => {
    const ctx = useContext(MessagesContext)
    if (!ctx) {
        throw new Error('useMessages must be used within MessagesProvider')
    }
    return ctx
}
