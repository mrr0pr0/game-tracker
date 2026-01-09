'use client';

import { useEffect } from 'react';

export default function Modal({
                                  isOpen,
                                  onClose,
                                  title,
                                  children,
                                  size = 'md'
                              }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/80" />

            <div
                className={`
          relative w-full ${sizes[size]}
          bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl
          shadow-2xl
        `}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b border-[#1F1F1F]">
                    <h2 className="text-lg font-semibold text-[#FAFAFA]">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}