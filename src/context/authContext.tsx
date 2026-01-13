'use client'

import { createContext, useState, useEffect, ReactNode } from 'react'
import { authAPI, userAPI } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { AuthContextType, RegisterData, User } from '@/types'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (typeof window === 'undefined') return
        const checkAuth = async () => {
            try {
                const { data } = await authAPI.getMe()
                setUser(data)
            } catch {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = async (email: string, password: string) => {
        const { data } = await authAPI.login({ email, password })
        setUser(data)
        router.push('/dashboard')
    }

    const register = async (formData: RegisterData) => {
        const { data } = await authAPI.register(formData)
        setUser(data)
        router.push('/dashboard')
    }

    const logout = () => {
        authAPI.logout()
        setUser(null)
        router.push('/')
    }

    const updateUser = (updatedUser: User) => {
        userAPI
            .updateProfile(updatedUser)
            .then(() => {
                setUser(updatedUser)
            })
            .catch((error) => {
                console.error('Failed to update user profile:', error)
            })
    }

    return (
        <AuthContext.Provider
            value={{ user, loading, login, register, logout, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    )
}
