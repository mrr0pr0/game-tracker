'use client';

import { useState } from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';

export default function DeleteNoteModal({ isOpen, onClose, noteId }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        // TODO: Implement delete note API call
        // DELETE /api/notes with { id: noteId }
        // On success, refresh the notes list

        console.log('Deleting note:', noteId);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            onClose();
            // Refresh notes list
            window.location.reload();
        }, 1000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Delete Note" size="sm">
            <div className="space-y-4">
                <p className="text-sm text-[#A1A1AA]">
                    Are you sure you want to delete this note? This action cannot be undone.
                </p>

                <div className="flex gap-3">
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex-1"
                    >
                        {loading ? 'Deleting...' : 'Delete Note'}
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