'use client';

import { CONSOLES, THEMES, STATUSES } from '@/lib/constants';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Link from 'next/link';

export default function FilterBar({ filters, onFilterChange }) {
    const consoleOptions = [
        { value: 'all', label: 'All Consoles' },
        ...CONSOLES,
    ];

    const themeOptions = [
        { value: 'all', label: 'All Themes' },
        ...THEMES,
    ];

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        ...STATUSES,
    ];

    return (
        <div className="sticky top-16 z-30 bg-[#000]/80 backdrop-blur border-b border-[#1F1F1F] p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
                    <Select
                        options={consoleOptions}
                        value={filters.console}
                        onChange={(e) => onFilterChange('console', e.target.value)}
                        className="w-full sm:w-40"
                    />

                    <Select
                        options={themeOptions}
                        value={filters.theme}
                        onChange={(e) => onFilterChange('theme', e.target.value)}
                        className="w-full sm:w-40"
                    />

                    <Select
                        options={statusOptions}
                        value={filters.status}
                        onChange={(e) => onFilterChange('status', e.target.value)}
                        className="w-full sm:w-40"
                    />
                </div>

                <Link href="/games/add">
                    <Button variant="primary">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Game
                    </Button>
                </Link>
            </div>
        </div>
    );
}