'use client'
import React from 'react'

const Register = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [username, setName] = React.useState('')
    const [error, setError] = React.useState('')
    const [success, setSuccess] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const fetchExistingUser = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username , email })
        })
        const existingUser = await fetchExistingUser.json()
        if (existingUser) {
            setError('Username or email already exists')
            setSuccess('')
            setLoading(false)
            e.target.reset()
            return
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, username, role: 'user' })
            })
            const data = await response.json()
            if (response.ok) {
                setSuccess(data.message)
                setError('')
            } else {
                setError(data.message)
                setSuccess('')
            }
        } catch (error) {
            setError('An error occurred. Please try again.')
            setSuccess('')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="flex h-screen w-full items-center justify-center">
                <div className="w-full max-w-md space-y-6 rounded-lg border p-6 shadow-lg">
                    <h1 className="text-2xl font-bold text-center">Register</h1>
                    <p className="text-center text-red-500">{error}</p>
                    <p className="text-center text-green-500">{success}</p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label htmlFor="username">User name</label>
                            <input 
                                id="username" 
                                type="text" 
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-md border px-3 py-2" 
                            />
                        </div>
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
                            {loading ? "Loading ..." : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register