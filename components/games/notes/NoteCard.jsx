'use client';

import { useState } from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import DeleteNoteModal from './DeleteNoteModal';

export default function NoteCard({ note }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showFullImage, setShowFullImage] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <>
            <Card>
                <div className="flex items-start justify-between mb-3">
                    <time className="text-xs text-[#71717A]">
                        {formatDate(note.createdAt)}
                    </time>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowDeleteModal(true)}
                        className="!h-6 !px-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </Button>
                </div>

                <p className="text-sm text-[#FAFAFA] leading-relaxed mb-4 whitespace-pre-wrap">
                    {note.content}
                </p>

                {note.screenshot && (
                    <div
                        className="rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setShowFullImage(true)}
                    >
                        <img
                            src={note.screenshot}
                            alt="Screenshot"
                            className="w-full max-h-[200px] object-cover"
                        />
                    </div>
                )}
            </Card>

            <DeleteNoteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                noteId={note.id}
            />

            {/* Full Image Modal */}
            {showFullImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur"
                    onClick={() => setShowFullImage(false)}
                >
                    <div className="absolute inset-0 bg-black/90" />
                    <img
                        src={note.screenshot}
                        alt="Screenshot"
                        className="relative max-w-full max-h-full rounded-lg"
                    />
                </div>
            )}
        </>
    );
}