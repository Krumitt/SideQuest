import React, { useState } from 'react';

export default function StarRating({ rating = 0, interactive = false, onChange, size = 'w-5 h-5' }) {
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (value) => {
        if (interactive && onChange) {
            onChange(value);
        }
    };

    const renderStar = (index) => {
        const starValue = index + 1;
        
        // For interactive mode
        if (interactive) {
            const isFilled = hoverRating ? starValue <= hoverRating : starValue <= rating;
            return (
                <svg 
                    key={index}
                    onClick={() => handleClick(starValue)}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`${size} cursor-pointer transition-colors duration-200 ${isFilled ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300'}`}
                >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            );
        }

        // For display mode (supports fractional half stars roughly)
        const isFull = rating >= starValue;
        const isHalf = !isFull && rating >= starValue - 0.5;

        return (
            <div key={index} className="relative">
                {/* Empty Background Star */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${size} text-gray-300 dark:text-gray-600`}>
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                
                {/* Overlay Half/Full Star */}
                {(isFull || isHalf) && (
                    <div className="absolute top-0 left-0 overflow-hidden" style={{ width: isHalf ? '50%' : '100%' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${size} text-yellow-500`}>
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex gap-1 items-center">
            {[0, 1, 2, 3, 4].map(renderStar)}
        </div>
    );
}
