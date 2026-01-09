'use client';

import { useState } from 'react';
import Link from 'next/link';
import SidebarItem from './SidebarItem';
import SidebarSection from './SidebarSection';
import { NAV_ITEMS } from '@/lib/constants';

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`
        fixed left-0 top-0 h-screen
        bg-[#000] border-r border-[#1F1F1F]
        transition-all duration-200
        ${collapsed ? 'w-[72px]' : 'w-[260px]'}
        hidden md:block
      `}
        >
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="flex items-center justify-between p-6 border-b border-[#1F1F1F]">
                    {!collapsed && (
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-purple rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">G</span>
                            </div>
                            <span className="text-lg font-semibold text-[#FAFAFA]">Game Tracker</span>
                        </Link>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <SidebarSection title="Main" collapsed={collapsed}>
                        {NAV_ITEMS.map(item => (
                            <SidebarItem
                                key={item.href}
                                href={item.href}
                                label={item.label}
                                icon={item.icon}
                                collapsed={collapsed}
                            />
                        ))}
                    </SidebarSection>
                </nav>

                {/* User section */}
                <div className="p-4 border-t border-[#1F1F1F]">
                    <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
                        <div className="w-8 h-8 bg-[#7C3AED] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">U</span>
                        </div>
                        {!collapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#FAFAFA] truncate">User</p>
                                <p className="text-xs text-[#71717A] truncate">user@example.com</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}