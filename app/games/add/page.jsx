import GameForm from '@/components/games/GameForm';

export default function AddGamePage() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-[#FAFAFA] mb-2">Add New Game</h1>
                <p className="text-sm text-[#A1A1AA]">
                    Add a game to your collection and start tracking your progress.
                </p>
            </div>

            <GameForm />
        </div>
    );
}