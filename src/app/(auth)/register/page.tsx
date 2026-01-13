'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { userAPI } from '@/lib/api'
import { RegisterData } from '@/types'

export default function RegisterPage() {
    const { register } = useAuth()
    const [formData, setFormData] = useState<RegisterData>({
        name: ' ',
        email: '',
        username: '',
        password: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
        null
    )
    const [checkingUsername, setCheckingUsername] = useState(false)

    const checkUsername = async (username: string) => {
        if (username.length < 3) {
            setUsernameAvailable(null)
            return
        }

        setCheckingUsername(true)
        try {
            const { data } = await userAPI.checkUsername(username)
            setUsernameAvailable(data.available)
        } catch (error) {
            setUsernameAvailable(false)
        } finally {
            setCheckingUsername(false)
        }
    }

    const handleUsernameChange = (username: string) => {
        setFormData({ ...formData, username })

        const timeout = setTimeout(() => {
            checkUsername(username)
        }, 500)

        return () => clearTimeout(timeout)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            setLoading(false)
            return
        }

        if (!usernameAvailable) {
            setError('Username is not available')
            setLoading(false)
            return
        }

        try {
            await register({
                name: formData.name,
                email: formData.email,
                username: formData.username,
                password: formData.password,
            })
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Create Account
                    </h2>
                    <p className="text-gray-600 mt-2">Join Saraha today</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="John Doe"
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
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 border text-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="johndoe"
                                value={formData.username}
                                onChange={(e) =>
                                    handleUsernameChange(
                                        e.target.value.toLowerCase()
                                    )
                                }
                            />
                            {checkingUsername && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Checking availability...
                                </p>
                            )}
                            {usernameAvailable === true && (
                                <p className="text-sm text-green-600 mt-1">
                                    ✓ Username available
                                </p>
                            )}
                            {usernameAvailable === false && (
                                <p className="text-sm text-red-600 mt-1">
                                    ✗ Username taken
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !usernameAvailable}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-6">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
