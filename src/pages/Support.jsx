import React from 'react';
import { Link } from 'react-router-dom';

export default function Support() {
    return (
        <div className="w-full bg-white dark:bg-black min-h-[60vh]">
            <div className="max-w-4xl mx-auto px-6 py-16">
                <header className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-wide">
                        Support &amp; FAQ
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-gray-700 dark:text-gray-300">
                    <section className="md:col-span-2 space-y-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">How can I track my order?</h3>
                            <p>Once your order ships, we'll send you an email with a tracking number and a link to view the status.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What is your return policy?</h3>
                            <p>We accept returns within 30 days of the original purchase date. Items must be unworn and in their original packaging.</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Do you ship internationally?</h3>
                            <p>Yes, we ship to most countries worldwide. International shipping rates and times apply at checkout.</p>
                        </div>
                    </section>

                    <aside className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 h-fit">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h3>
                        <p className="mb-4 text-sm">Need more help? Our support team is available 24/7 to answer your questions.</p>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <span className="font-semibold">Email:</span> support@sidequest.com
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="font-semibold">Phone:</span> 1-800-SIDE-QST
                            </li>
                        </ul>
                    </aside>
                </div>
            </div>
        </div>
    );
}
