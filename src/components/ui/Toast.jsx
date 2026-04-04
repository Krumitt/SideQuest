import React from 'react';
import { useCart } from '../../context/CartContext';

export default function Toast() {
    const { toastMessage } = useCart();

    if (!toastMessage) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 bg-black text-white px-6 py-3 rounded-md shadow-lg transition-all duration-300 transform translate-y-0 opacity-100">
            {toastMessage}
        </div>
    );
}
