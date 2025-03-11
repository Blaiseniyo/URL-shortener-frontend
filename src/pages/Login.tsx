import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleLoginButton';
import Log from '../components/Log';

import { backendApiCall } from '../api/axiosApi';

const Login: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Call your login API here
            const response = await backendApiCall(
                '/auth/login',
                'POST',
                JSON.stringify({ username: email, password }),
                { 'Content-Type': 'application/json' }
            );
            // Save token to localStorage
            localStorage.setItem('access_token', response.data.access_token);

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Log />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Or{' '}
                    <Link to="/register" className="font-medium text-cyan-400 hover:text-cyan-300">
                        create a new account
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
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                Email address / Username
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
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
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm bg-slate-700 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-slate-600 rounded bg-slate-700"
                                />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-slate-300">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-cyan-400 hover:text-cyan-300">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-600" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-slate-800 text-slate-400">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <GoogleLoginButton />
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-400">
                            By signing in, you agree to our{' '}
                            <a href="#" className="text-cyan-400 hover:text-cyan-300">Terms of Service</a>
                            {' '}and{' '}
                            <a href="#" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;