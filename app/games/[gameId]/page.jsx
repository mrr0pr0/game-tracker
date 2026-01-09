'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import GameHeader from '@/components/games/GameHeader';
import GameActions from '@/components/games/GameActions';
import NoteForm from '@/components/games/notes/NoteForm';
import NotesTimeline from '@/components/games/notes/NotesTimeline';
import LoadingSpinner from '@/components/feedback/LoadingSpinner';
import ErrorState from '@/components/feedback/ErrorState';

// Mock data
const MOCK_GAME = {
    id: '1',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    console: 'Nintendo Switch',
    theme: 'Adventure',
    status: 'playing',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop',
    notes: 'An amazing open-world adventure game with incredible physics and exploration.',
    createdAt: new Date().toISOString(),
};

const MOCK_NOTES = [
    {
        id: '1',
        gameId: '1',
        content: 'Just completed the first temple! The puzzles were challenging but rewarding.',
        screenshot: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        gameId: '1',
        content: 'Found a cool weapon fusion combination that works great against tough enemies.',
        screenshot: null,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
];

export default function GameDetailPage() {
    const params = useParams();
    const gameId = params.gameId;

    const [game, setGame] = useState(null);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGameData();
    }, [gameId]);

    const fetchGameData = async () => {
        setLoading(true);
        setError(null);

        try {
            // TODO: Fetch game and notes from API
            // GET /api/games?id=${gameId}
            // GET /api/notes?gameId=${gameId}

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setGame(MOCK_GAME);
            setNotes(MOCK_NOTES);
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
                    onRetry={fetchGameData}
                />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <GameHeader game={game} />

            <div className="mb-6">
                <GameActions gameId={gameId} />
            </div>

            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold text-[#FAFAFA] mb-4">Notes & Progress</h2>
                    <NoteForm gameId={gameId} onNoteAdded={fetchGameData} />
                </div>

                <div>
                    <h3 className="text-lg font-medium text-[#FAFAFA] mb-4">Timeline</h3>
                    <NotesTimeline notes={notes} />
                </div>
            </div>
        </div>
    );
}