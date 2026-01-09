import Badge from '../ui/Badge';

export default function GameHeader({ game }) {
    return (
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
            {/* Cover Image */}
            <div className="w-full sm:w-48 aspect-[3/4] rounded-xl overflow-hidden bg-[#161616] flex-shrink-0">
                {game.coverImage ? (
                    <img
                        src={game.coverImage}
                        alt={game.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#71717A]">
                        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Game Info */}
            <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-semibold text-[#FAFAFA] mb-2">
                            {game.title}
                        </h1>
                        <div className="flex items-center gap-3 text-sm text-[#A1A1AA]">
                            <span>{game.console}</span>
                            <span>•</span>
                            <span>{game.theme}</span>
                        </div>
                    </div>
                    <Badge status={game.status} />
                </div>

                {game.notes && (
                    <div className="mt-4">
                        <h3 className="text-sm font-medium text-[#A1A1AA] mb-2">Initial Notes</h3>
                        <p className="text-sm text-[#FAFAFA] leading-relaxed">
                            {game.notes}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}