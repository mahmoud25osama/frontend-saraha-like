'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import Image from 'next/image'
import { useMessages } from '@/hooks/useMessage'

export default function Navbar() {
    const { user, logout } = useAuth()
    const { newMessages } = useMessages()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo + Brand */}
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 group"
                        >
                            <div className="relative">
                                <Image
                                    src="/saraha-logo.png"
                                    alt="Saraha"
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 transition-transform group-hover:scale-110"
                                />
                                {/* Optional: Add a subtle glow effect on hover */}
                                <div className="absolute inset-0 bg-blue-400 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity"></div>
                            </div>
                            <span className="text-2xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Saraha
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/messages"
                                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative"
                                >
                                    Messages
                                    {newMessages > 0 && (
                                        <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {newMessages > 9
                                                ? '9+'
                                                : newMessages}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    href="/settings"
                                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                                >
                                    Settings
                                </Link>
                                <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                                    <div className="flex items-center space-x-2">
                                        <Image
                                            src={user.avatar}
                                            alt={user.name}
                                            width={32}
                                            height={32}
                                            className="h-8 w-8 rounded-full ring-2 ring-blue-100"
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            {user.name}
                                        </span>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {mobileMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        {user ? (
                            <>
                                <div className="flex items-center space-x-3 py-3 border-b border-gray-200">
                                    <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        width={40}
                                        height={40}
                                        className="h-10 w-10 rounded-full ring-2 ring-blue-100"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {user.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            @{user.username}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/dashboard"
                                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/messages"
                                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors relative"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Messages
                                    {newMessages && newMessages > 0 && (
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                                            {newMessages > 9
                                                ? '9+'
                                                : newMessages}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    href="/settings"
                                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Settings
                                </Link>
                                <button
                                    onClick={() => {
                                        logout()
                                        setMobileMenuOpen(false)
                                    }}
                                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="block px-4 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-center font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
