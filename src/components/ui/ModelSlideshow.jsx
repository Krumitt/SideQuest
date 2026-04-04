import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * ModelSlideshow — responsive auto-playing carousel with arrows + dots.
 * @param {Array<{image: string, caption?: string}>} slides
 * @param {string} [title]
 * @param {number} [interval=4000] - ms between auto-advance
 */
export default function ModelSlideshow({ slides = [], title = 'Our Models', interval = 4000 }) {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef(null);

    const next = useCallback(() => {
        setCurrent(c => (c + 1) % slides.length);
    }, [slides.length]);

    const prev = useCallback(() => {
        setCurrent(c => (c - 1 + slides.length) % slides.length);
    }, [slides.length]);

    // Auto-advance
    useEffect(() => {
        if (slides.length <= 1 || isPaused) return;
        timerRef.current = setInterval(next, interval);
        return () => clearInterval(timerRef.current);
    }, [next, interval, isPaused, slides.length]);

    if (!slides.length) return null;

    return (
        <section className="w-full bg-gray-900 dark:bg-black py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">Style Gallery</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">{title}</h2>
                </div>

                {/* Carousel Viewport */}
                <div
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                    style={{ aspectRatio: '16/9', maxHeight: '600px' }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {slides.map((slide, idx) => (
                        <div
                            key={idx}
                            className="absolute inset-0 transition-opacity duration-700"
                            style={{ opacity: idx === current ? 1 : 0, zIndex: idx === current ? 1 : 0 }}
                        >
                            <img
                                src={slide.image}
                                alt={slide.caption || `Slide ${idx + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = '/assets/images/hero/hero.jpg'; }}
                                loading="lazy"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            {/* Caption */}
                            {slide.caption && (
                                <div className="absolute bottom-8 left-0 right-0 text-center px-6">
                                    <p className="text-white text-lg md:text-xl font-semibold drop-shadow-lg">{slide.caption}</p>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Left Arrow */}
                    {slides.length > 1 && (
                        <button
                            onClick={prev}
                            aria-label="Previous slide"
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                                w-10 h-10 rounded-full bg-black/40 hover:bg-black/70
                                flex items-center justify-center
                                text-white transition-all hover:scale-110 backdrop-blur-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Right Arrow */}
                    {slides.length > 1 && (
                        <button
                            onClick={next}
                            aria-label="Next slide"
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                                w-10 h-10 rounded-full bg-black/40 hover:bg-black/70
                                flex items-center justify-center
                                text-white transition-all hover:scale-110 backdrop-blur-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* Slide counter */}
                    <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {current + 1} / {slides.length}
                    </div>
                </div>

                {/* Dot Indicators */}
                {slides.length > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                                className={`rounded-full transition-all duration-300
                                    ${idx === current
                                        ? 'bg-amber-400 w-6 h-2.5'
                                        : 'bg-white/40 hover:bg-white/70 w-2.5 h-2.5'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
