import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { generateCSV } from '../utils/invoice';
import AthleteBadge from '../components/ui/AthleteBadge';

export default function Cart() {
    const { cart, updateQuantity, removeFromCart, cartTotals, checkout } = useCart();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // 1. Generate CSV
        const csvContent = generateCSV(cart, cartTotals);

        // 2. Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SideQuest_Invoice_${new Date().getTime()}.csv`;
        a.click();
        URL.revokeObjectURL(url);

        // 3. Store Order History data
        const orderPayload = {
            id: `ORD-${new Date().getTime()}`,
            date: new Date().toISOString(),
            items: cart,
            totals: cartTotals
        };
        checkout(orderPayload);
        
        alert('Checkout successful! Invoice downloaded.');
        navigate('/orders');
    };

    return (
        <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items (Left Column) */}
                <div className="lg:col-span-2 space-y-6">
                    {cart.length === 0 ? (
                        <div className="text-gray-500 dark:text-gray-400">
                            Your cart is empty. <Link to="/" className="text-blue-500 hover:underline">Continue shopping.</Link>
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="flex gap-6 border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                                    <img 
                                        src={item.image} 
                                        className="w-full h-full object-cover rounded-md" 
                                        alt={item.name}
                                        onError={(e) => { e.target.src = '/assets/images/hero/hero.jpg'; }}
                                    />
                                </div>
                                <div className="flex-grow flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <Link to={`/product/${item.id}`} className="font-semibold text-lg hover:underline dark:text-white">{item.name}</Link>
                                            {item.athleteTag && (
                                                <div className="mt-1">
                                                    <AthleteBadge athleteName={item.athleteName} size="sm" />
                                                </div>
                                            )}
                                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Size: {item.size}</p>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id, item.size)} className="text-red-500 text-sm hover:underline">Remove</button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                                            <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">-</button>
                                            <span className="px-3 py-1 font-medium dark:text-white border-l border-r border-gray-300 dark:border-gray-600">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">+</button>
                                        </div>
                                        <p className="font-bold dark:text-white">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Order Summary (Right Column) */}
                <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm h-fit">
                    <h2 className="text-xl font-bold mb-6 dark:text-white">Order Summary</h2>

                    <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{cartTotals.subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax (Estimated 18%)</span>
                            <span>₹{cartTotals.tax.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    <div className="flex justify-between font-bold text-lg mt-4 mb-6 dark:text-white">
                        <span>Total</span>
                        <span>₹{cartTotals.total.toLocaleString('en-IN')}</span>
                    </div>

                    <button 
                        onClick={handleCheckout}
                        className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition"
                    >
                        Proceed to Checkout
                    </button>

                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                        Secure Checkout - 30 Day Returns
                    </p>
                </div>
            </div>
        </main>
    );
}
