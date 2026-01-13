'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function HomePage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard')
        }
    }, [user, loading])

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-600 to-indigo-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-50 mb-6">
                        Welcome to Saraha
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-12">
                        Send and receive honest anonymous messages
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                        <Link
                            href="/register"
                            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/login"
                            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition"
                        >
                            Sign In
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 text-white">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-bold mb-2">
                                100% Anonymous
                            </h3>
                            <p className="text-blue-800">
                                Send messages without revealing your identity
                            </p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 text-white">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-bold mb-2">
                                Quick & Easy
                            </h3>
                            <p className="text-blue-800">
                                Create your link in seconds and start receiving
                                messages
                            </p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-8 text-white">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-xl font-bold mb-2">
                                Share Anywhere
                            </h3>
                            <p className="text-blue-800">
                                Share your unique link on social media platforms
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
