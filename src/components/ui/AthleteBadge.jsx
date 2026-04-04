import React from 'react';

/**
 * AthleteBadge — renders a premium "Athlete Edition" badge.
 * @param {string} athleteName - e.g. "Alex Honnold"
 * @param {string} [size='sm'] - 'sm' | 'md' | 'lg'
 */
export default function AthleteBadge({ athleteName, size = 'sm' }) {
    if (!athleteName) return null;

    const sizeClasses = {
        sm:  'text-[10px] px-2 py-0.5 gap-1',
        md:  'text-xs px-2.5 py-1 gap-1.5',
        lg:  'text-sm px-3 py-1.5 gap-2',
    };

    return (
        <span
            className={`inline-flex items-center font-bold rounded-full
                bg-gradient-to-r from-amber-500 to-orange-500
                text-white shadow-sm tracking-wide
                ${sizeClasses[size] ?? sizeClasses.sm}`}
            title={`${athleteName} Edition`}
        >
            <svg className="w-3 h-3 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            {athleteName}&nbsp;Edition
        </span>
    );
}
