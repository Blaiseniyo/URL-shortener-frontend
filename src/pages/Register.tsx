import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleLoginButton';
import Log from '../components/Log';

import { backendApiCall } from '../api/axiosApi';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        if (!username || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (password.length < 8) {
            setError('Password should be at least 6 characters');
            return false;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Call your registration API here

            // Call your login API here
            await backendApiCall(
                '/auth/register',
                'POST',
                JSON.stringify({ username, email, password }),
                { 'Content-Type': 'application/json' }
            );

            // const response = await fetch('/api/auth/register', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ username, email, password }),
            // });

            // const data = await response.json();

            // if (!response.ok) {
            //     throw new Error(data.message || 'Registration failed');
            // }

            // Redirect to login page after successful registration
            navigate('/login', {
                state: { message: 'Registration successful! Please log in with your new account.' }
            });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Log />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-700">
                    {error && (
                        <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-slate-300">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm bg-slate-700 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm bg-slate-700 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm bg-slate-700 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">
                                Confirm password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm bg-slate-700 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-slate-600 rounded bg-slate-700"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-slate-300">
                                I agree to the{' '}
                                <a href="#" className="text-cyan-400 hover:text-cyan-300">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a>
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? 'Creating account...' : 'Create account'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-600" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-slate-800 text-slate-400">Or sign up with</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <GoogleLoginButton />
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-400">
                            By creating an account, you're agreeing to our{' '}
                            <a href="#" className="text-cyan-400 hover:text-cyan-300">Terms of Service</a>,{' '}
                            <a href="#" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a>, and{' '}
                            <a href="#" className="text-cyan-400 hover:text-cyan-300">Cookie Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
