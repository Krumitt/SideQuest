import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/products';

export default function Home() {
    const featuredProducts = products.filter(p => p.featured);

    return (
        <div>
            {/* ================= HERO SECTION ================= */}
            <section className="relative w-full h-[80vh] overflow-hidden bg-black">
                <div id="nf" className="absolute inset-0 opacity-100 pointer-events-auto transition-opacity duration-700">
                    <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                        <source src="/assets/videos/main_promo.mov" type="video/mp4" />
                    </video>
                </div>
            </section>

            {/* ================= FEATURED PRODUCTS ================= */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold mb-8">Featured Gear</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* ================= CTA SECTION ================= */}
            <section className="relative h-[80vh] w-full bg-black overflow-hidden">
                <img 
                    src="/assets/images/hero/hero2.png" 
                    alt="Adventure Hero" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 text-white text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold max-w-3xl animate-[title-physics_8s_cubic-bezier(0.4,0,0.2,1)_infinite]">
                        Never Stop Exploring
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-gray-200 hero-subtitle-typing animate-[subtitle-physics_8s_cubic-bezier(0.4,0,0.2,1)_infinite]">
                        Premium outdoor gear built for adventure, endurance, and exploration.
                    </p>
                    <Link to="/athletes" className="mt-8 w-fit mx-auto md:mx-0 px-6 py-3 border border-white text-white rounded-md font-semibold text-base hover:bg-white hover:text-black transition duration-300">
                        Checkout Our Athlete Kits →
                    </Link>
                </div>
            </section>
        </div>
    );
}
