'use client'

import { RegisterData } from '@/types'
import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 5000,
})

export const authAPI = {
    register: (data: RegisterData) => api.post('/auth/register', data),
    login: (data: { email: string; password: string }) =>
        api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
    getMe: () => api.get('/auth/me'),
}

export const messageAPI = {
    sendMessage: (username: string, content: string) =>
        api.post(`/messages/send/${username}`, { content }),
    getMyMessages: (page = 1, filter?: string) =>
        api.get('/messages/my-messages', {
            params: { page, limit: 20, filter },
        }),
    getStats: () => api.get('/messages/stats'),
    markAsRead: (id: string) => api.patch(`/messages/${id}/read`),
    toggleFavorite: (id: string) => api.patch(`/messages/${id}/favorite`),
    deleteMessage: (id: string) => api.delete(`/messages/${id}`),
}

export const userAPI = {
    getPublicProfile: (username: string) =>
        api.get(`/users/profile/${username}`),
    updateProfile: (data: {
        name?: string
        bio?: string
        allowMessages?: boolean
    }) => api.put('/users/profile', data),
    checkUsername: (username: string) =>
        api.get(`/users/check-username/${username}`),
}

export default api
