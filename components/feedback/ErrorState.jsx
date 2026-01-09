export default function ErrorState({
                                       title = 'Something went wrong',
                                       description,
                                       onRetry
                                   }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="mb-4 text-[#EF4444]">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#FAFAFA] mb-2">
                {title}
            </h3>
            {description && (
                <p className="text-sm text-[#A1A1AA] mb-6 max-w-md">
                    {description}
                </p>
            )}
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-[#FAFAFA] text-black rounded-lg text-sm font-medium hover:bg-[#E5E5E5] transition-colors"
                >
                    Try Again
                </button>
            )}
        </div>
    );
}