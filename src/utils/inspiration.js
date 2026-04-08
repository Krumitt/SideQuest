import { products } from '../data/products';
import { assignAnonymousName } from './names';

const INSPIRATION_KEY = 'styleInspirations';

// Sample notes that users typically might leave
const MOCK_NOTES = [
    "Perfect for a casual college day.",
    "Ready for the winter trails! 🥶",
    "Obsessed with this color combo.",
    "Early morning hikes just got better.",
    "Bought this kit for my trip to the Alps.",
    "Clean, essential, and weather-proof.",
    "Gifting this for a birthday 🎁",
    "Athlete approved! Highly recommend.",
    "Can't go wrong with these basics.",
    "The ultimate urban commuter fit."
];

// Seed exactly 20 diverse outfits deterministically if storage is empty
const seedInspirations = () => {
    const defaultSeeds = [];

    for (let i = 0; i < 20; i++) {
        // Pick 2-4 items per outfit randomly
        const itemsCount = 2 + (i % 3);
        const outfitItems = [];
        let total = 0;

        for (let j = 0; j < itemsCount; j++) {
            // Pseudo-random product selection to ensure realistic spreads
            const pId = (i * 7 + j * 13) % products.length;
            const product = products[pId];
            
            outfitItems.push({
                ...product,
                size: ['S', 'M', 'L', 'XL'][(i + j) % 4],
                quantity: 1
            });
            total += product.price;
        }

        // Generate a date strictly in the past (between 5 mins and 14 days ago)
        const randomDaysBack = ((i * 1.5) % 14) + (Math.random()); // Spread out over 14 days realistically
        const timestamp = Date.now() - Math.floor(randomDaysBack * 24 * 60 * 60 * 1000) - (5 * 60 * 1000);

        defaultSeeds.push({
            id: `insp-${timestamp}-${i}`,
            anonymousName: assignAnonymousName(`mock_user_${i}`),
            items: outfitItems,
            totalPrice: total,
            note: i % 2 === 0 ? MOCK_NOTES[(i * 3) % MOCK_NOTES.length] : "", // Only some have notes
            timestamp: timestamp
        });
    }

    // Sort newest first
    defaultSeeds.sort((a, b) => b.timestamp - a.timestamp);
    localStorage.setItem(INSPIRATION_KEY, JSON.stringify(defaultSeeds));
    return defaultSeeds;
};

/**
 * Fetch all style community posts. Seeds automatically on first use.
 * @returns {Array} List of style inspiration objects
 */
export const getInspirations = () => {
    try {
        const stored = localStorage.getItem(INSPIRATION_KEY);
        if (!stored) {
            return seedInspirations();
        }
        
        let parsed = JSON.parse(stored);
        
        // Auto-fix if old buggy future dates are found in local storage
        if (parsed.some(p => p.timestamp > Date.now() + 60000)) {
             parsed = seedInspirations();
        }

        return parsed.sort((a, b) => b.timestamp - a.timestamp);
    } catch (e) {
        console.error("Failed to load style inspirations", e);
        return [];
    }
};

/**
 * Adds a new completed checkout to the inspiration board
 * @param {string} userId - The internal original user id
 * @param {Array} items - The items in the checkout
 * @param {number} total - Total checkout cost
 * @param {string} note - Optional user string note
 */
export const addInspiration = (userId, items, total, note) => {
    try {
        const board = getInspirations();
        const anonymousName = assignAnonymousName(userId);

        const newEntry = {
            id: `insp-${Date.now()}`,
            anonymousName,
            items: items.map(item => ({...item})), // shallow copy
            totalPrice: total,
            note: note.trim(),
            timestamp: Date.now()
        };

        const updatedBoard = [newEntry, ...board];
        localStorage.setItem(INSPIRATION_KEY, JSON.stringify(updatedBoard));
        return true;
    } catch (e) {
        console.error("Failed to add inspiration", e);
        return false;
    }
};
