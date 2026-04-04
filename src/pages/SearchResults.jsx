import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const results = useMemo(() => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.subCategory.toLowerCase().includes(q)
        );
    }, [query]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-10">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-widest font-medium">
                    Search Results
                </p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                    {query ? (
                        <>
                            Results for&nbsp;
                            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                                &ldquo;{query}&rdquo;
                            </span>
                        </>
                    ) : 'Search'}
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {results.length > 0
                        ? `${results.length} product${results.length !== 1 ? 's' : ''} found`
                        : query ? 'No products matched your search.' : 'Enter a search term above to find products.'}
                </p>
            </div>

            {/* Results Grid */}
            {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            ) : query ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No results found</h2>
                    <p className="text-gray-400 dark:text-gray-500 mb-8 max-w-md">
                        We couldn&apos;t find anything for &ldquo;{query}&rdquo;. Try different keywords or browse our categories below.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link to="/men" className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:opacity-80 transition">Men</Link>
                        <Link to="/women" className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition">Women</Link>
                        <Link to="/athletes" className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition">Athletes</Link>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
