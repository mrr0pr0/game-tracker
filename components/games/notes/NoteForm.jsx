'use client';

import { useState } from 'react';
import Textarea from '../../ui/Textarea';
import Button from '../../ui/Button';

export default function NoteForm({ gameId, onNoteAdded }) {
    const [content, setContent] = useState('');
    const [screenshot, setScreenshot] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!content.trim()) {
            setError('Note content is required');
            return;
        }

        setLoading(true);

        // TODO: Implement note creation
        // 1. If screenshot exists, upload it first: POST /api/upload with FormData
        // 2. Create note: POST /api/notes with { gameId, content, screenshot: uploadedUrl }
        // 3. Call onNoteAdded() to refresh the notes list

        console.log('Creating note:', { gameId, content, screenshot });

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setContent('');
            setScreenshot(null);
            if (onNoteAdded) onNoteAdded();
        }, 1000);
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('Screenshot must be less than 5MB');
                return;
            }
            setScreenshot(file);
            setError('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#111] border border-[#1F1F1F] rounded-xl p-4">
            <Textarea
                label="Add a Note"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts, progress, or tips..."
                rows={3}
                error={error}
                disabled={loading}
            />

            <div className="mt-4 flex items-center gap-3">
                <label className="flex-1">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={loading}
                        className="hidden"
                    />
                    <div className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#2A2A2A] text-[#FAFAFA] rounded-lg text-sm font-medium hover:bg-[#161616] hover:border-[#3A3A3A] transition-colors cursor-pointer">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {screenshot ? screenshot.name : 'Add Screenshot'}
                    </div>
                </label>

                <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Note'}
                </Button>
            </div>
        </form>
    );
}