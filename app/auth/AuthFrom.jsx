'use client';

import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function AuthForm() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        // Basic validation
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (isSignUp && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        // TODO: Implement authentication logic
        // For sign up: POST to /api/auth with { email, password, action: 'signup' }
        // For sign in: POST to /api/auth with { email, password, action: 'signin' }
        // On success, redirect to /dashboard

        console.log('Auth action:', isSignUp ? 'Sign Up' : 'Sign In', formData);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            // window.location.href = '/dashboard';
        }, 1000);
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex w-12 h-12 bg-gradient-purple rounded-lg items-center justify-center mb-4">
                        <span className="text-white font-bold text-xl">G</span>
                    </div>
                    <h1 className="text-2xl font-semibold text-[#FAFAFA] mb-2">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p className="text-sm text-[#A1A1AA]">
                        {isSignUp
                            ? 'Start tracking your gaming journey'
                            : 'Sign in to continue tracking your games'
                        }
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        error={errors.email}
                        disabled={loading}
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        error={errors.password}
                        disabled={loading}
                    />

                    {isSignUp && (
                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            error={errors.confirmPassword}
                            disabled={loading}
                        />
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setErrors({});
                        }}
                        className="text-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
                        disabled={loading}
                    >
                        {isSignUp
                            ? 'Already have an account? Sign in'
                            : "Don't have an account? Sign up"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}