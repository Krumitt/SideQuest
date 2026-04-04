import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row md:justify-between gap-8">
                {/* Brand */}
                <div>
                    <h4 className="font-bold text-white mb-4 text-lg">SideQuest</h4>
                    <p className="text-sm">
                        Adventure-ready outdoor gear built for athletes, explorers, and trailblazers.
                    </p>
                </div>
                {/* Company */}
                <div>
                    <h4 className="font-bold text-white mb-4">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/about" className="hover:underline">About</Link></li>
                    </ul>
                </div>
                {/* Support */}
                <div>
                    <h4 className="font-bold text-white mb-4">Support</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/support" className="hover:underline">Support &amp; FAQ</Link></li>
                        <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
