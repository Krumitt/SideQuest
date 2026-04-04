import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AthleteBadge from '../components/ui/AthleteBadge';

export default function OrderHistory() {
    const { currentUser, getUserData } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    const userData = getUserData(currentUser);
    const orderHistory = userData?.orderHistory || [];

    const lifetimeSpending = orderHistory.reduce((total, order) => total + order.totals.total, 0);

    return (
        <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Order History</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">View your past orders and download your invoices.</p>

            {/* Lifetime Summary */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-lg text-gray-600 dark:text-gray-300">Lifetime Spending</h2>
                    <p className="text-3xl font-bold dark:text-white">₹{lifetimeSpending.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right">
                    <h2 className="text-lg text-gray-600 dark:text-gray-300">Total Orders</h2>
                    <p className="text-3xl font-bold dark:text-white">{orderHistory.length}</p>
                </div>
            </div>

            {/* Orders List */}
            {orderHistory.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                    You have no past orders. <br />
                    <Link to="/" className="text-blue-500 hover:underline mt-2 inline-block">Start your adventure</Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Render newest first */}
                    {[...orderHistory].reverse().map((order) => (
                        <div key={order.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center flex-wrap gap-4">
                                <div className="flex gap-8">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Order Placed</p>
                                        <p className="font-medium dark:text-white">{new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Total</p>
                                        <p className="font-medium dark:text-white">₹{order.totals.total.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Order ID</p>
                                        <p className="font-medium dark:text-white">{order.id}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { e.target.src = '/assets/images/hero/hero.jpg'; }}
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <Link to={`/product/${item.id}`} className="font-semibold text-lg hover:underline dark:text-white">{item.name}</Link>
                                                {item.athleteTag && (
                                                    <div className="mt-1">
                                                        <AthleteBadge athleteName={item.athleteName} size="sm" />
                                                    </div>
                                                )}
                                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Size: {item.size}</p>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right font-semibold dark:text-white">
                                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
