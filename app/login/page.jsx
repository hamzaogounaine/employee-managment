'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const LoginPage = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const [success, setSuccess] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await signIn('credentials', { email, password, redirect: false })
            if (!res.ok) {
                setError('Invalid email or password')
                setLoading(false)
                return
            }
            setError('')
            setSuccess('Login successful')
            router.push('/adminSpace/dashboard')
        } catch (error) {
            console.log(error)
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="flex h-screen w-full items-center justify-center">
                <div className="w-full max-w-md space-y-6 rounded-lg border p-6 shadow-lg">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <p className="text-center text-red-500">{error}</p>
                    <p className="text-center text-green-500">{success}</p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label htmlFor="email">Email</label>
                            <input 
                                id="email" 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-md border px-3 py-2" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password">Password</label>
                            <input 
                                id="password" 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-md border px-3 py-2" 
                            />
                        </div>
                        <button disabled={loading} type="submit" className="w-full rounded-md bg-black py-2 text-white hover:bg-gray-800">
                            {loading ? "Loading ..." : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage