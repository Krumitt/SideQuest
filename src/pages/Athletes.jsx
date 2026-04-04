import React from "react";
import ProductCard from "../components/ui/ProductCard";
import { products } from "../data/products";

export default function Athletes() {
  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* ================= PAGE INTRO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold mb-4 dark:text-white">
          Athlete Favorites
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Gear trusted by world-class athletes in the most demanding
          environments.
        </p>
      </section>

      {/* ================= ATHLETE BANNERS ================= */}
      <section className="w-full space-y-16">
        {/* Alex Honnold */}
        <a
          href="#alex"
          onClick={(e) => handleSmoothScroll(e, "alex")}
          className="group block relative min-h-screen overflow-hidden bg-slate-900"
        >
          <img
            src="/assets/athletes/alex.jpg"
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-105"
            alt="Alex Honnold"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-300 mb-2">
                The North Face · Climbing
              </p>
              <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
                Alex Honnold
              </h2>
              <p className="text-lg text-gray-200 max-w-xl">
                Precision, endurance, and minimalism trusted on the world’s
                hardest climbs.
              </p>
            </div>
          </div>
        </a>

        {/* Kit Deslauriers */}
        <a
          href="#kit"
          onClick={(e) => handleSmoothScroll(e, "kit")}
          className="group block relative min-h-screen overflow-hidden bg-slate-900"
        >
          <img
            src="/assets/athletes/kit.jpg"
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-105"
            alt="Kit Deslauriers"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-300 mb-2">
                The North Face · Ski Mountaineering
              </p>
              <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
                Kit Deslauriers
              </h2>
              <p className="text-lg text-gray-200 max-w-xl">
                Alpine systems built for speed, safety, and extreme elevation.
              </p>
            </div>
          </div>
        </a>

        {/* Tommy Caldwell */}
        <a
          href="#tommy"
          onClick={(e) => handleSmoothScroll(e, "tommy")}
          className="group block relative min-h-screen overflow-hidden bg-slate-900"
        >
          <img
            src="/assets/athletes/tommy.jpg"
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-105"
            alt="Tommy Caldwell"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-300 mb-2">
                Patagonia · Big Wall Climbing
              </p>
              <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
                Tommy Caldwell
              </h2>
              <p className="text-lg text-gray-200 max-w-xl">
                Equipment refined on multi-day ascents and vertical endurance.
              </p>
            </div>
          </div>
        </a>

        {/* Caroline Gleich */}
        <a
          href="#caroline"
          onClick={(e) => handleSmoothScroll(e, "caroline")}
          className="group block relative min-h-screen overflow-hidden bg-slate-900"
        >
          <img
            src="/assets/athletes/caroline.jpg"
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-105"
            alt="Caroline Gleich"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-300 mb-2">
                Patagonia · Ski & Advocacy
              </p>
              <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
                Caroline Gleich
              </h2>
              <p className="text-lg text-gray-200 max-w-xl">
                Performance-driven gear with purpose beyond the mountains.
              </p>
            </div>
          </div>
        </a>
      </section>

      {/* ================= DIVIDER ================= */}
      <div className="max-w-7xl mx-auto px-6 my-20 border-t dark:border-gray-700"></div>

      {/* ================= BUNDLES ================= */}
      {["AlexHonnold", "KitDeslauriers", "TommyCaldwell", "CarolineGleich"].map(
        (athlete) => {
          const athleteItems = products.filter(
            (p) => p.subCategory === athlete,
          );
          const titleMap = {
            AlexHonnold: "Alex Honnold's Climbing Kit",
            KitDeslauriers: "Kit Deslauriers' Alpine Kit",
            TommyCaldwell: "Tommy Caldwell’s Big Wall Kit",
            CarolineGleich: "Caroline Gleich’s Touring Kit",
          };
          const idMap = {
            AlexHonnold: "alex",
            KitDeslauriers: "kit",
            TommyCaldwell: "tommy",
            CarolineGleich: "caroline",
          };

          if (athleteItems.length === 0) return null;

          return (
            <section
              key={athlete}
              id={idMap[athlete]}
              className="max-w-7xl mx-auto px-6 py-16 scroll-mt-[40vh]"
            >
              <h2 className="text-3xl font-bold mb-6 dark:text-white">
                {titleMap[athlete]}
              </h2>
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {athleteItems.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    className="min-w-[260px]"
                  />
                ))}
              </div>
            </section>
          );
        },
      )}
    </div>
  );
}
