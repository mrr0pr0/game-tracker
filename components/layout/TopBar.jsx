'use client';

import { usePathname } from 'next/navigation';

export default function TopBar() {
    const pathname = usePathname();

    const getPageTitle = () => {
        if (pathname === '/dashboard') return 'Dashboard';
        if (pathname === '/games/add') return 'Add Game';
        if (pathname.startsWith('/games/') && pathname.endsWith('/edit')) return 'Edit Game';
        if (pathname.startsWith('/games/')) return 'Game Details';
        if (pathname === '/settings') return 'Settings';
        if (pathname === '/auth') return 'Sign In';
        return 'Game Tracker';
    };

    return (
        <header className="sticky top-0 z-40 bg-[#000]/80 backdrop-blur border-b border-[#1F1F1F]">
            <div className="flex items-center justify-between h-16 px-6">
                <h1 className="text-xl font-semibold text-[#FAFAFA]">
                    {getPageTitle()}
                </h1>

                <div className="flex items-center gap-4">
                    {/* Search - placeholder for future */}
                    <button className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    {/* Notifications - placeholder for future */}
                    <button className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}