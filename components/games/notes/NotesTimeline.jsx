import NoteCard from './NoteCard';
import EmptyState from '../../feedback/EmptyState';

export default function NotesTimeline({ notes }) {
    if (notes.length === 0) {
        return (
            <EmptyState
                icon={
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                }
                title="No notes yet"
                description="Start adding notes to track your progress and thoughts about this game."
            />
        );
    }

    return (
        <div className="space-y-4">
            {notes.map(note => (
                <NoteCard key={note.id} note={note} />
            ))}
        </div>
    );
}