import LoadingSpinner from '@/components/feedback/LoadingSpinner';

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <LoadingSpinner size="lg" />
        </div>
    );
}