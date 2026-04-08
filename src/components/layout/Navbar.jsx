import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { products } from '../../data/products.js';

// Helpful utility for avatar color
function getStringColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
}

// Format price helper
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
}

export default function Navbar() {
    const { isDarkMode, toggleDark } = useTheme();
    const { cart } = useCart();
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const profileRef = useRef(null);
    const searchRef = useRef(null);
    const inputRef = useRef(null);

    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    // Sync input with URL query on load
    useEffect(() => {
        const q = searchParams.get('q');
        if (q) setSearchInput(q);
    }, []);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
                setSuggestions([]);
                setHighlightedIndex(-1);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Generate live suggestions
    const getSuggestions = useCallback((query) => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return products
            .filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.subCategory.toLowerCase().includes(q)
            )
            .slice(0, 6);
    }, []);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setSearchInput(val);
        setHighlightedIndex(-1);
        setSuggestions(getSuggestions(val));
    };

    const handleSearchSubmit = (e) => {
        e && e.preventDefault();
        const query = highlightedIndex >= 0 ? suggestions[highlightedIndex].name : searchInput;
        if (!query.trim()) return;
        setIsSearchOpen(false);
        setSuggestions([]);
        setHighlightedIndex(-1);
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    };

    const handleSuggestionClick = (product) => {
        setSearchInput(product.name);
        setSuggestions([]);
        setIsSearchOpen(false);
        navigate(`/product/${product.id}`);
    };

    const handleKeyDown = (e) => {
        if (!suggestions.length) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(i => Math.min(i + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(i => Math.max(i - 1, -1));
        } else if (e.key === 'Escape') {
            setSuggestions([]);
            setIsSearchOpen(false);
        }
    };

    const openSearch = () => {
        setIsSearchOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
    };

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate('/');
    };

    return (
        <header className="w-full border-b dark:border-gray-700 sticky top-0 z-50 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative gap-4">

                {/* Logo + Brand */}
                <Link to="/" className="flex items-center gap-3 shrink-0">
                    <svg viewBox="0 0 200 200" className="h-12 w-12 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 90 L70 40 L95 65 L115 50 L160 90 L140 85 L115 70 L95 85 L70 60 Z" fill="currentColor" />
                        <path d="M20 110 L70 160 L95 135 L115 150 L160 110 L140 115 L115 130 L95 115 L70 140 Z" fill="currentColor" />
                    </svg>
                    <span className="font-extrabold text-3xl tracking-wide text-black dark:text-white">
                        SideQuest
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex gap-10 font-semibold text-lg">
                    <NavLink to="/men" className={({ isActive }) => `border-b-2 transition duration-200 ${isActive ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-500 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white'}`}>Men</NavLink>
                    <NavLink to="/women" className={({ isActive }) => `border-b-2 transition duration-200 ${isActive ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-500 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white'}`}>Women</NavLink>
                    <NavLink to="/athletes" className={({ isActive }) => `border-b-2 transition duration-200 ${isActive ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-500 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white'}`}>Athlete Favorites</NavLink>
                    <NavLink to="/inspiration" className={({ isActive }) => `border-b-2 transition duration-200 flex items-center gap-1 ${isActive ? 'border-pink-500 dark:border-pink-400 text-pink-500 dark:text-pink-400' : 'border-transparent text-gray-500 hover:border-pink-500 dark:hover:border-pink-400 hover:text-pink-500 dark:hover:text-pink-400'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        Community Fits
                    </NavLink>
                </nav>

                {/* Search Bar (Desktop) */}
                <div
                    ref={searchRef}
                    className="hidden lg:flex relative items-center"
                    style={{ minWidth: isSearchOpen ? '300px' : '44px', transition: 'min-width 0.35s cubic-bezier(0.4,0,0.2,1)' }}
                >
                    <form onSubmit={handleSearchSubmit} className="w-full">
                        <div className={`flex items-center rounded-full border transition-all duration-350 overflow-hidden
                            ${isSearchOpen
                                ? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 shadow-md w-full'
                                : 'border-transparent bg-transparent w-11'
                            }`}
                        >
                            <button
                                type="button"
                                onClick={openSearch}
                                className="flex items-center justify-center h-11 w-11 shrink-0 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                                aria-label="Open search"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>

                            {isSearchOpen && (
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={searchInput}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search products..."
                                    className="flex-1 bg-transparent outline-none pr-4 py-2 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                    autoComplete="off"
                                />
                            )}

                            {isSearchOpen && searchInput && (
                                <button
                                    type="button"
                                    onClick={() => { setSearchInput(''); setSuggestions([]); inputRef.current?.focus(); }}
                                    className="flex items-center justify-center h-8 w-8 mr-1 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Suggestions Dropdown */}
                    {isSearchOpen && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                            {suggestions.map((product, idx) => (
                                <button
                                    key={product.id}
                                    onClick={() => handleSuggestionClick(product)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer
                                        ${idx === highlightedIndex
                                            ? 'bg-gray-100 dark:bg-gray-700'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-750'
                                        }`}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-10 w-10 object-cover rounded-lg shrink-0 bg-gray-100 dark:bg-gray-700"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{product.name}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">
                                            {product.category} &middot; {product.subCategory}
                                        </p>
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 shrink-0">
                                        {formatPrice(product.price)}
                                    </span>
                                </button>
                            ))}
                            <button
                                onClick={handleSearchSubmit}
                                className="w-full flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-900 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition border-t border-gray-100 dark:border-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                See all results for &ldquo;{searchInput}&rdquo;
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Actions (desktop only) */}
                <div className="hidden lg:flex items-center gap-6 text-lg font-medium text-black dark:text-white">
                    {/* Dark Mode Toggle */}
                    <button onClick={toggleDark} className="cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        {isDarkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    {/* Cart */}
                    <Link to="/cart" className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition relative">
                        Cart
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>

                    {/* Auth Area */}
                    {currentUser ? (
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center justify-center w-10 h-10 rounded-full text-white font-bold transition-transform hover:scale-105"
                                style={{ backgroundColor: getStringColor(currentUser) }}
                            >
                                {currentUser.charAt(0).toUpperCase()}
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 top-full">
                                    <div className="px-4 py-2 border-b dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 truncate">
                                        Signed in as <br /><span className="font-bold text-gray-900 dark:text-white">{currentUser}</span>
                                    </div>
                                    <Link
                                        to="/orders"
                                        onClick={() => setIsProfileOpen(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                    >
                                        Order History
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                            Login
                        </Link>
                    )}
                </div>

                {/* Hamburger (mobile only) */}
                <div className="lg:hidden flex items-center gap-4">
                    {/* Mobile Search Icon */}
                    <button
                        onClick={() => setIsMenuOpen(prev => { if (!prev) setTimeout(() => document.getElementById('mobile-search-input')?.focus(), 100); return !prev; })}
                        className="p-2 text-black dark:text-white"
                        aria-label="Search"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    {/* Quick mobile Cart */}
                    <Link to="/cart" className="relative p-2 text-black dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartItemCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartItemCount}</span>}
                    </Link>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex flex-col gap-1 cursor-pointer p-2">
                        <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
                        <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
                        <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border-t dark:border-gray-700 lg:hidden shadow-lg">
                        {/* Mobile Search */}
                        <div className="px-6 pt-4 pb-2">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!searchInput.trim()) return;
                                    setIsMenuOpen(false);
                                    navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
                                }}
                                className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 bg-gray-50 dark:bg-gray-900"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    id="mobile-search-input"
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder="Search products..."
                                    className="flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-white placeholder-gray-400"
                                    autoComplete="off"
                                />
                            </form>
                        </div>

                        <nav className="flex flex-col gap-6 px-6 py-6 text-lg font-medium text-black dark:text-white">

                            {/* Auth Mobile Area */}
                            {currentUser ? (
                                <div className="flex items-center gap-4 pb-4 border-b dark:border-gray-700">
                                    <div
                                        className="flex items-center justify-center w-10 h-10 rounded-full text-white font-bold"
                                        style={{ backgroundColor: getStringColor(currentUser) }}
                                    >
                                        {currentUser.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Welcome</div>
                                        <div className="font-bold">{currentUser}</div>
                                    </div>
                                </div>
                            ) : null}

                            <NavLink to="/men" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? 'text-black dark:text-white' : 'text-gray-500 hover:text-black dark:hover:text-white transition'}>Men</NavLink>
                            <NavLink to="/women" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? 'text-black dark:text-white' : 'text-gray-500 hover:text-black dark:hover:text-white transition'}>Women</NavLink>
                            <NavLink to="/athletes" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? 'text-black dark:text-white' : 'text-gray-500 hover:text-black dark:hover:text-white transition'}>Athlete Favorites</NavLink>
                            <NavLink to="/inspiration" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-bold transition flex gap-1 ${isActive ? 'text-pink-500 dark:text-pink-400' : 'text-gray-400 hover:text-pink-500'}`}>Community Fits ✨</NavLink>
                            <hr className="dark:border-gray-700" />

                            {currentUser ? (
                                <>
                                    <Link to="/orders" onClick={() => setIsMenuOpen(false)}>Order History</Link>
                                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-left text-red-500">Logout</button>
                                </>
                            ) : (
                                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login / Sign up</Link>
                            )}

                            <div className="flex items-center border-t dark:border-gray-700 pt-4 mt-2">
                                <button onClick={toggleDark} className="flex items-center gap-2 w-full">
                                    <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                                </button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
