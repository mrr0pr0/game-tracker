'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import GameForm from '@/components/games/GameForm';
import LoadingSpinner from '@/components/feedback/LoadingSpinner';
import ErrorState from '@/components/feedback/ErrorState';

// Mock data
const MOCK_GAME = {
    id: '1',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    console: 'switch',
    theme: 'adventure',
    status: 'playing',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop',
    notes: 'An amazing open-world adventure game with incredible physics and exploration.',
};

export default function EditGamePage() {
    const params = useParams();
    const gameId = params.gameId;

    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGame();
    }, [gameId]);

    const fetchGame = async () => {
        setLoading(true);
        setError(null);

        try {
            // TODO: Fetch game from API
            // GET /api/games?id=${gameId}

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setGame(MOCK_GAME);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error || !game) {
        return (
            <div className="p-6">
                <ErrorState
                    title="Failed to load game"
                    description={error || 'Game not found'}
                    onRetry={fetchGame}
                />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-[#FAFAFA] mb-2">Edit Game</h1>
                <p className="text-sm text-[#A1A1AA]">
                    Update your game information and details.
                </p>
            </div>

            <GameForm initialData={game} />
        </div>
    );
}