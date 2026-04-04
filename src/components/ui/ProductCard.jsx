import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import AthleteBadge from './AthleteBadge.jsx';

export default function ProductCard({ product, className = '' }) {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            alert('Please log in to add items to your cart.');
            navigate('/login');
            return;
        }
        addToCart(product.id, 'L');
    };

    return (
        <div className={`border p-4 hover:shadow-lg transition-shadow bg-white rounded-lg text-gray-900 flex flex-col justify-between relative ${className} ${product.athleteTag ? 'ring-2 ring-amber-400 ring-offset-1' : ''}`}>
            {/* Athlete Edition ribbon */}
            {product.athleteTag && (
                <div className="absolute top-3 left-3 z-10">
                    <AthleteBadge athleteName={product.athleteName} size="sm" />
                </div>
            )}

            <Link to={`/product/${product.id}`} className="block group cursor-pointer mb-2">
                <div className="relative overflow-hidden rounded-md">
                    <img
                        src={product.image}
                        className="h-64 w-full object-cover group-hover:opacity-90 group-hover:scale-105 transition-all duration-300"
                        alt={product.name}
                        onError={(e) => { e.target.src = '/assets/images/hero/hero.jpg'; }}
                    />
                </div>
                <h3 className={`mt-4 font-semibold text-lg text-black group-hover:underline ${product.athleteTag ? 'mt-6' : ''}`}>
                    {product.name}
                </h3>
            </Link>

            <div>
                <p className="text-gray-600 mb-3">₹{product.price.toLocaleString('en-IN')}</p>
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
