export interface User {
    _id: string
    name: string
    email: string
    username: string
    avatar: string
    bio?: string
    allowMessages: boolean
    messageCount?: number
}

export interface Message {
    _id: string
    recipient: string
    content: string
    isRead: boolean
    isFavorite: boolean
    isDeleted: boolean
    createdAt: string
    updatedAt: string
}

export interface MessageStats {
    totalMessages: number
    unreadCount: number
    favoritesCount: number
}

export interface RegisterData {
    name: string
    email: string
    username: string
    password: string
}
export interface AuthContextType {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (data: RegisterData) => Promise<void>
    logout: () => void
    updateUser: (user: User) => void
}
export type MessagesContextType = {
    messages: Message[]
    stats: MessageStats
    newMessages: number
    loading: boolean
    filter: string
    setFilter: (filter: string) => void
    refreshing: boolean
    handleToggleFavorite: (message: Message) => Promise<void>
    handleDelete: (message: Message) => Promise<void>
    handleMarkAsRead: (message: Message) => Promise<void>
    refresh: () => void
}
