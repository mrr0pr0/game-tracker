import GameCard from './GameCard';
import EmptyState from '../feedback/EmptyState';
import Button from '../ui/Button';
import Link from 'next/link';

export default function GameGrid({ games }) {
    if (games.length === 0) {
        return (
            <EmptyState
                icon={
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                }
                title="No games yet"
                description="Add your first game to start tracking your gaming journey."
                action={
                    <Link href="/games/add">
                        <Button variant="primary">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Game
                        </Button>
                    </Link>
                }
            />
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map(game => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    );
}