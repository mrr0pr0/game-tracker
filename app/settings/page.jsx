'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function SettingsPage() {
    const [profile, setProfile] = useState({
        name: 'User',
        email: 'user@example.com',
    });
    const [password, setPassword] = useState({
        current: '',
        new: '',
        confirm: '',
    });
    const [loading, setLoading] = useState(false);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        // TODO: Implement profile update
        // PUT /api/auth with { name, email }

        console.log('Updating profile:', profile);

        setTimeout(() => {
            setLoading(false);
            alert('Profile updated successfully!');
        }, 1000);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setLoading(true);

        // TODO: Implement password change
        // PUT /api/auth with { currentPassword, newPassword }

        console.log('Changing password');

        setTimeout(() => {
            setLoading(false);
            setPassword({ current: '', new: '', confirm: '' });
            alert('Password changed successfully!');
        }, 1000);
    };

    const handleSignOut = () => {
        // TODO: Implement sign out
        // POST /api/auth with { action: 'signout' }
        // Redirect to /auth

        console.log('Signing out');
        window.location.href = '/auth';
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-[#FAFAFA] mb-2">Settings</h1>
                <p className="text-sm text-[#A1A1AA]">
                    Manage your account settings and preferences.
                </p>
            </div>

            {/* Profile Settings */}
            <Card>
                <h2 className="text-lg font-semibold text-[#FAFAFA] mb-4">Profile</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <Input
                        label="Name"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        disabled={loading}
                    />

                    <Input
                        label="Email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        disabled={loading}
                    />

                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </form>
            </Card>

            {/* Password Change */}
            <Card>
                <h2 className="text-lg font-semibold text-[#FAFAFA] mb-4">Change Password</h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <Input
                        label="Current Password"
                        type="password"
                        value={password.current}
                        onChange={(e) => setPassword(prev => ({ ...prev, current: e.target.value }))}
                        disabled={loading}
                    />

                    <Input
                        label="New Password"
                        type="password"
                        value={password.new}
                        onChange={(e) => setPassword(prev => ({ ...prev, new: e.target.value }))}
                        disabled={loading}
                    />

                    <Input
                        label="Confirm New Password"
                        type="password"
                        value={password.confirm}
                        onChange={(e) => setPassword(prev => ({ ...prev, confirm: e.target.value }))}
                        disabled={loading}
                    />

                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Changing...' : 'Change Password'}
                    </Button>
                </form>
            </Card>

            {/* Danger Zone */}
            <Card>
                <h2 className="text-lg font-semibold text-[#FAFAFA] mb-4">Account</h2>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-[#A1A1AA] mb-3">
                            Sign out of your account on this device.
                        </p>
                        <Button variant="secondary" onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}