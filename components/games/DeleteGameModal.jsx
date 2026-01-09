'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function DeleteGameModal({ isOpen, onClose, gameId }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        // TODO: Implement delete API call
        // DELETE /api/games with { id: gameId }
        // On success, redirect to /dashboard

        console.log('Deleting game:', gameId);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            onClose();
            router.push('/dashboard');
        }, 1000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Delete Game" size="sm">
            <div className="space-y-4">
                <p className="text-sm text-[#A1A1AA]">
                    Are you sure you want to delete this game? This action cannot be undone.
                    All notes and screenshots associated with this game will also be deleted.
                </p>

                <div className="flex gap-3">
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex-1"
                    >
                        {loading ? 'Deleting...' : 'Delete Game'}
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
}