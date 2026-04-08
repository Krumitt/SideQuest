import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import AthleteBadge from '../components/ui/AthleteBadge';
import StarRating from '../components/ui/StarRating';
import ReviewSection from '../components/ui/ReviewSection';
import { calculateRating } from '../utils/reviews';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState('L');
    const [refreshReviews, setRefreshReviews] = useState(0);

    const product = products.find(p => p.id === id);

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-24 text-center">
                <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
                <Link to="/" className="text-blue-500 hover:underline">Go back home</Link>
            </div>
        );
    }

    const { averageRating, totalReviews } = calculateRating(product.id, product.defaultRating, product.defaultReviewCount);

    const brand = product.category === 'athlete' && product.name.includes("TNF") ? "The North Face" :
        (product.category === 'athlete' && product.name.includes("Patagonia")) ? "Patagonia" : "SideQuest Gear";

    const handleAddToCart = () => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            alert("Please log in to add items to your cart.");
            navigate('/login');
            return;
        }
        addToCart(product.id, selectedSize);
    };

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            {/* Breadcrumbs */}
            <nav className="text-sm text-gray-500 mb-8 dark:text-gray-400">
                <Link to="/" className="hover:underline text-gray-700 dark:text-gray-300">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 dark:text-white font-medium">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Section */}
                <div className="sticky top-24 h-fit">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 group cursor-zoom-in">
                        <img
                            src={product.image}
                            alt={product.name}
                            onError={(e) => { e.target.src = '/assets/MenProducts/Footwear/Foot4.jpg'; }}
                            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-sm text-blue-600 font-semibold tracking-wide uppercase">{brand}</h2>
                            {product.gender && (
                                <span className="px-2.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full border border-gray-200 dark:border-gray-600 shadow-sm">
                                    Gender: {product.gender}
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">{product.name}</h1>
                        {product.athleteTag && (
                            <div className="mt-3 mb-1">
                                <AthleteBadge athleteName={product.athleteName} size="lg" />
                            </div>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                            <StarRating rating={averageRating} size="w-5 h-5" />
                            <span className="text-gray-800 dark:text-gray-200 font-bold ml-1">{averageRating.toFixed(1)}</span>
                            <span className="text-gray-500 dark:text-gray-400 text-sm hover:underline cursor-pointer" onClick={() => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})}>({totalReviews} reviews)</span>
                        </div>
                    </div>

                    <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">₹{product.price.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Engineered for the outdoors. The {product.name} offers breathable protection and unrestricted movement. Designed for durability and performance in rugged environments.
                        </p>
                    </div>

                    {/* Product Options */}
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Select Size</h3>
                        <div className="flex gap-3">
                            {['S', 'M', 'L', 'XL'].map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-12 flex items-center justify-center border rounded-md transition ${selectedSize === size ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white' : 'border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white text-gray-700 dark:text-gray-300'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 pt-4">
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-yellow-400 text-black py-3 rounded-full font-bold hover:bg-yellow-500 transition shadow-sm"
                        >
                            Add to Cart
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-4 pt-6 text-center text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Authentic Gear</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <span>Secure Payment</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span>Easy Returns</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Section Details */}
            <ReviewSection 
                productId={product.id} 
                onReviewAdded={() => setRefreshReviews(prev => prev + 1)} 
            />
        </main>
    );
}
