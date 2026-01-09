import Link from 'next/link';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function GameCard({ game }) {
    return (
        <Link href={`/games/${game.id}`}>
            <Card hover className="h-full">
                {/* Cover Image */}
                <div className="relative aspect-[3/4] mb-4 rounded-lg overflow-hidden bg-[#161616]">
                    {game.coverImage ? (
                        <img
                            src={game.coverImage}
                            alt={game.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#71717A]">
                            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-2 right-2">
                        <Badge status={game.status} />
                    </div>
                </div>

                {/* Game Info */}
                <div>
                    <h3 className="text-base font-semibold text-[#FAFAFA] mb-2 line-clamp-1">
                        {game.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                        <span>{game.console}</span>
                        <span>•</span>
                        <span>{game.theme}</span>
                    </div>
                </div>
            </Card>
        </Link>
    );
}