import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInspirations } from '../utils/inspiration';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function timeSince(date) {
    const seconds = Math.max(0, Math.floor((new Date() - new Date(date)) / 1000));
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + (interval === 1 ? " year ago" : " years ago");
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + (interval === 1 ? " month ago" : " months ago");
    
    interval = Math.floor(seconds / 604800);
    if (interval >= 1) return interval + (interval === 1 ? " week ago" : " weeks ago");
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + (interval === 1 ? " day ago" : " days ago");
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + (interval === 1 ? " hour ago" : " hours ago");
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + (interval === 1 ? " min ago" : " mins ago");
    
    return seconds + (seconds === 1 ? " second ago" : " seconds ago");
}

// Quick avatar color generator
function getStringColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
}

export default function Inspiration() {
    const [posts, setPosts] = useState([]);
    const { currentUser } = useAuth();
    const { addMultipleToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        // Load posts
        setPosts(getInspirations());
    }, []);

    const handleCopy = (items) => {
        if (!currentUser) {
            alert("Please sign in to copy outfits to your cart.");
            navigate('/login');
            return;
        }
        addMultipleToCart(items);
    };

    return (
        <div className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header Phase */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Style Inspiration
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        See what the community is gearing up with. Copy entire kits with a single click and hit the trails.
                    </p>
                </div>

                {/* Posts Masonry/Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {posts.map(post => (
                        <div key={post.id} className="break-inside-avoid bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition duration-300">
                            
                            {/* Card Header (User) */}
                            <div className="p-5 flex items-center justify-between border-b border-gray-50 dark:border-gray-750">
                                <div className="flex items-center gap-3">
                                    <div 
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                                        style={{ backgroundColor: getStringColor(post.anonymousName) }}
                                    >
                                        {post.anonymousName.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">{post.anonymousName}</h3>
                                        <p className="text-xs text-gray-400">{timeSince(post.timestamp)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* User Note (Optional) */}
                            {post.note && (
                                <div className="px-5 pt-4">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30">
                                        <p className="text-sm font-medium text-blue-800 dark:text-blue-300 flex gap-2">
                                            <span className="text-blue-400">“</span>
                                            {post.note}
                                            <span className="text-blue-400">”</span>
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Items Scrollable Display */}
                            <div className="p-5">
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                    {post.items.length} Items in Kit
                                </h4>
                                <div className="flex overflow-x-auto gap-3 pb-2 [scrollbar-width:thin]">
                                    {post.items.map((item, idx) => (
                                        <div key={`${item.id}-${idx}`} className="shrink-0 w-24 flex flex-col gap-1 items-center">
                                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-750 rounded-md overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-cover" 
                                                    onError={(e) => { e.target.src = '/assets/images/hero/hero.jpg'; }}
                                                />
                                            </div>
                                            <p className="text-[10px] text-center text-gray-600 dark:text-gray-400 truncate w-full px-1">{item.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer (Price & Action) */}
                            <div className="p-5 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-750">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 font-medium">Total Kit Value</span>
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                                        ₹{post.totalPrice.toLocaleString('en-IN')}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => handleCopy(post.items)}
                                    className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-full font-bold text-sm hover:scale-105 transition active:scale-95"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copy This Look
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
