import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/context/authContext'
import { MessagesProvider } from '@/context/MessagesContext'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <AuthProvider>
                <MessagesProvider>
                    <Navbar />

                    {children}
                </MessagesProvider>
            </AuthProvider>
        </div>
    )
}
