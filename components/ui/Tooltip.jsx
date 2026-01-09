'use client';

import { useState } from 'react';

export default function Tooltip({ children, content, position = 'top' }) {
    const [isVisible, setIsVisible] = useState(false);

    const positions = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    className={`
            absolute ${positions[position]} z-50
            px-2 py-1 rounded-md
            bg-[#111] border border-[#2A2A2A]
            text-xs text-[#FAFAFA] whitespace-nowrap
            pointer-events-none
          `}
                >
                    {content}
                </div>
            )}
        </div>
    );
}