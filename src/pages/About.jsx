import React from 'react';

export default function About() {
    return (
        <div className="w-full bg-white dark:bg-black min-h-[60vh]">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <header className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-wide">
                        About SideQuest
                    </h1>
                </header>
                
                <section className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    <p className="lead text-xl font-medium mb-8">
                        SideQuest was born out of a simple belief: the world is meant to be explored. We engineer adventure-ready outdoor gear built for athletes, explorers, and trailblazers who push boundaries.
                    </p>
                    
                    <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900 dark:text-white">Our Mission</h2>
                    <p className="mb-6">
                        We strive to equip you with the highest quality, most durable, and innovative gear possible, so you can focus entirely on the journey ahead. Every seam, every zipper, and every technical fabric is rigorously tested to ensure it withstands the harshest environments.
                    </p>
                    
                    <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900 dark:text-white">Our Inspiration</h2>
                    <p className="mb-6">
                        From towering peaks to untamed rivers, nature is our ultimate muse. We are inspired by the relentless human spirit and the desire to seek what lies beyond the horizon. Whether you're climbing your first mountain or training for an ultramarathon, SideQuest is with you every step of the way.
                    </p>
                </section>
            </div>
        </div>
    );
}
