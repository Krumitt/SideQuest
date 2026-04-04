import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products.js';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { currentUser, getUserData, updateUserData } = useAuth();
    const [cart, setCart] = useState([]);
    const [toastMessage, setToastMessage] = useState(null);

    // Sync cart state with active user
    useEffect(() => {
        if (currentUser) {
            const userData = getUserData(currentUser);
            if (userData && userData.cart) {
                setCart(userData.cart);
            }
        } else {
            // clear cart from memory if nobody is logged in
            setCart([]);
        }
    }, [currentUser]); // Note: We only strictly depend on currentUser changing to re-pull memory

    // Save changes to Auth Context DB whenever the cart mutates
    useEffect(() => {
        if (currentUser) {
            // avoid infinite loops by letting updateUserData merge
            updateUserData(currentUser, { cart });
        }
    }, [cart]); // Note: Reacting to cart changes avoids cyclical dependencies

    const addToCart = (productId, selectedSize = 'L') => {
        if (!currentUser) return false;

        const product = products.find(p => p.id === productId);
        if (!product) return false;

        setCart(prevCart => {
            // Match both ID and Size for true isolation
            const existingItem = prevCart.find(item => item.id === productId && item.size === selectedSize);
            if (existingItem) {
                return prevCart.map(item =>
                    (item.id === productId && item.size === selectedSize) 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                );
            }
            return [...prevCart, { ...product, size: selectedSize, quantity: 1 }];
        });

        setToastMessage(`${product.name} added to cart!`);
        setTimeout(() => setToastMessage(null), 3000);
        return true;
    };

    const updateQuantity = (productId, size, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId, size);
            return;
        }

        setCart(prevCart => 
            prevCart.map(item => 
                (item.id === productId && item.size === size) 
                    ? { ...item, quantity: newQuantity } 
                    : item
            )
        );
    };

    const removeFromCart = (productId, size) => {
        setCart(prevCart => prevCart.filter(item => !(item.id === productId && item.size === size)));
    };

    const clearCart = () => {
        setCart([]);
    };

    const checkout = (orderPayload) => {
        if (!currentUser) return;
        const currentData = getUserData(currentUser);
        const newHistory = currentData.orderHistory ? [...currentData.orderHistory, orderPayload] : [orderPayload];
        
        // This directly writes to the DB avoiding infinite cart loops on clear
        updateUserData(currentUser, { 
            orderHistory: newHistory,
            cart: [] 
        });
        setCart([]);
    };

    // Calculate totals
    const cartTotals = cart.reduce((acc, item) => {
        acc.subtotal += item.price * item.quantity;
        acc.items += item.quantity;
        return acc;
    }, { subtotal: 0, tax: 0, total: 0, items: 0 });

    cartTotals.tax = Math.round(cartTotals.subtotal * 0.18);
    cartTotals.total = cartTotals.subtotal + cartTotals.tax;

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            updateQuantity, 
            removeFromCart, 
            clearCart,
            checkout,
            cartTotals,
            toastMessage
        }}>
            {children}
        </CartContext.Provider>
    );
};
