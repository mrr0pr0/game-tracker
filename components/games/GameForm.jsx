'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { CONSOLES, THEMES, STATUSES } from '@/lib/constants';

export default function GameForm({ initialData = null }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        console: initialData?.console || 'ps5',
        theme: initialData?.theme || 'action',
        status: initialData?.status || 'backlog',
        coverImage: initialData?.coverImage || '',
        notes: initialData?.notes || '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        // Validation
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        // TODO: Implement API call
        // If initialData exists (editing): PUT /api/games with { id, ...formData }
        // If no initialData (creating): POST /api/games with formData
        // On success, redirect to /dashboard or /games/[id]

        console.log(initialData ? 'Updating game:' : 'Creating game:', formData);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            router.push('/dashboard');
        }, 1000);
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <Input
                label="Game Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter game title"
                error={errors.title}
                disabled={loading}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                    label="Console"
                    name="console"
                    options={CONSOLES}
                    value={formData.console}
                    onChange={handleChange}
                    disabled={loading}
                />

                <Select
                    label="Theme/Genre"
                    name="theme"
                    options={THEMES}
                    value={formData.theme}
                    onChange={handleChange}
                    disabled={loading}
                />
            </div>

            <Select
                label="Status"
                name="status"
                options={STATUSES}
                value={formData.status}
                onChange={handleChange}
                disabled={loading}
            />

            <Input
                label="Cover Image URL (optional)"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="/images/CoverImage.jpg"
                disabled={loading}
            />

            <Textarea
                label="Notes (optional)"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any initial notes about this game..."
                rows={4}
                disabled={loading}
            />

            <div className="flex gap-3">
                <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="flex-1"
                >
                    {loading ? 'Saving...' : (initialData ? 'Update Game' : 'Add Game')}
                </Button>

                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => router.back()}
                    disabled={loading}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}