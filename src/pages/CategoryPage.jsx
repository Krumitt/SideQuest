import React, { useState, useMemo, useRef } from 'react';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/products';

export default function CategoryPage({ category, title, bannerImage }) {
    const scrollContainerRef = useRef(null);
    const [filters, setFilters] = useState({
        JacketsVests: false,
        Fleece: false,
        Bottoms: false,
        Footwear: false,
    });

    const [sortOrder, setSortOrder] = useState('asc');
    const [showAthleteOnly, setShowAthleteOnly] = useState(false);

    const handleFilterChange = (subCat) => {
        setFilters(prev => ({ ...prev, [subCat]: !prev[subCat] }));
    };

    const { regularProducts, athleteProducts } = useMemo(() => {
        // 1. Gather all products that belong to this category (native OR cross-listed athlete)
        const allForCategory = products.filter(
            p => p.category === category || p.crossCategory === category
        );

        // 2. Athlete-tagged products (cross-listed from athlete page)
        const athlete = allForCategory.filter(p => p.athleteTag);

        // 3. Regular (non-athlete) products in this category
        let regular = allForCategory.filter(p => !p.athleteTag);

        // 4. Apply sub-category filters to the regular pool
        const activeFilters = Object.keys(filters).filter(k => filters[k]);
        if (activeFilters.length > 0) {
            regular = regular.filter(p => activeFilters.includes(p.subCategory));
        }

        // 5. Sort
        regular.sort((a, b) =>
            sortOrder === 'asc' ? a.price - b.price : b.price - a.price
        );

        return { regularProducts: regular, athleteProducts: athlete };
    }, [category, filters, sortOrder]);

    const displayProducts = showAthleteOnly ? [] : regularProducts;

    return (
        <div className="w-full">
            {/* Banner */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden mb-12">
                <img src={bannerImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">{title}</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">

                {/* Sidebar Filters */}
                <div className="md:col-span-1 border-r pr-4 border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">Filters</h2>

                    <div className="space-y-4 mb-8">
                        <label className="flex items-center gap-2 cursor-pointer dark:text-gray-200">
                            <input type="checkbox" checked={filters.JacketsVests} onChange={() => handleFilterChange('JacketsVests')} className="w-4 h-4" />
                            <span>Jackets &amp; Vests</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer dark:text-gray-200">
                            <input type="checkbox" checked={filters.Fleece} onChange={() => handleFilterChange('Fleece')} className="w-4 h-4" />
                            <span>Fleece</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer dark:text-gray-200">
                            <input type="checkbox" checked={filters.Bottoms} onChange={() => handleFilterChange('Bottoms')} className="w-4 h-4" />
                            <span>Pants &amp; Bottoms</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer dark:text-gray-200">
                            <input type="checkbox" checked={filters.Footwear} onChange={() => handleFilterChange('Footwear')} className="w-4 h-4" />
                            <span>Footwear</span>
                        </label>
                    </div>

                    <h2 className="text-xl font-bold mb-4 mt-8 dark:text-white">Sort By</h2>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full border p-2 rounded-md bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
                    >
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>

                    {/* Athlete filter toggle */}
                    {athleteProducts.length > 0 && (
                        <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
                            <h3 className="font-bold text-amber-800 dark:text-amber-300 text-sm mb-2">⭐ Athlete Edition</h3>
                            <p className="text-xs text-amber-700 dark:text-amber-400 mb-3">
                                {athleteProducts.length} athlete-endorsed items available
                            </p>
                            <a
                                href="#athlete-edition"
                                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const athleteEl = document.getElementById('athlete-edition');
                                    if (athleteEl && scrollContainerRef.current) {
                                        scrollContainerRef.current.scrollTo({
                                            top: athleteEl.offsetTop - 20, // Add a bit of top margin
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                            >
                                Jump to Athlete Edition ↓
                            </a>
                        </div>
                    )}
                </div>

                {/* Product Grid */}
                <div 
                    ref={scrollContainerRef} 
                    className="md:col-span-3 h-[80vh] overflow-y-auto relative pb-24 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {displayProducts.length === 0 && !showAthleteOnly ? (
                        <p className="text-gray-500 italic mt-8 dark:text-gray-400">No products match your criteria. Try adjusting your filters.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    )}

                    {/* Athlete Edition Section */}
                    {athleteProducts.length > 0 && (
                        <div id="athlete-edition" className="mt-16 scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-px flex-1 bg-gradient-to-r from-amber-400 to-orange-500" />
                                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white whitespace-nowrap">
                                    ⭐ Athlete Edition
                                </h2>
                                <div className="h-px flex-1 bg-gradient-to-l from-amber-400 to-orange-500" />
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                                Gear trusted and curated by world-class athletes — available in this collection.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {athleteProducts.map(p => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
