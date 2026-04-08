const ANONYMOUS_NAMES = [
    "Sneaky Panda", "Lazy Tiger", "Drip Wizard", "Chill Koala", "Hype Penguin",
    "Savage Sloth", "Zen Gorilla", "Electric Eel", "Cyber Ninja", "Cosmic Owl",
    "Turbo Turtle", "Funky Monkey", "Neon Wolf", "Retro Rhino", "Swag Lama",
    "Radical Bear", "Vibe Checker", "Mystic Moose", "Sleek Panther", "Frosty Fox",
    "Dapper Dog", "Fancy Falcon", "Groovy Gecko", "Epic Eagle", "Breezy Badger",
    "Salty Seagull", "Spicy Dragon", "Ice Cold Yeti", "Glitch Goblin", "Pixel Pirate",
    "Couch Potato", "Wandering Wizard", "Nomadic Knight", "Urban Unicorn", "Quiet Cheetah",
    "Loud Lion", "Smooth Shark", "Wild Stallion", "Happy Hippo", "Jumping Jaguar",
    "Sneaky Snake", "Pragmatic Parrot", "Lucky Locust", "Sunny Salamander", "Moody Mantis",
    "Clever Crow", "Brave Buffalo", "Tactical Toad", "Phantom Pigeon", "Golden Gibbon",
    "Silver Swan", "Bronze Baboon", "Iron Iguana", "Copper Crab", "Steel Squid",
    "Neon Narwhal", "Shadow Sheep", "Ghostly Goat", "Phantom Pig", "Cosmic Cow",
    "Glimmering Gazelle", "Shining Shrimp", "Sparkling Squid", "Radiant Rabbit", "Glowing Grizzly",
    "Flickering Fly", "Dazzling Duck", "Brilliant Bat", "Luminous Lemur", "Shiny Snail",
    "Flashy Flamingo", "Gleaming Gorilla", "Polished Pelican", "Slick Seal", "Glossy Goose",
    "Smooth Spider", "Soft Squirrel", "Fuzzy Ferret", "Fluffy Fox", "Silky Skunk",
    "Velvet Vulture", "Plush Puma", "Crisp Crocodile", "Sharp Shark", "Edgy Elephant",
    "Pointy Porcupine", "Spiky Sponge", "Thorny Toad", "Prickly Penguin", "Rough Raven",
    "Tough Tiger", "Hardy Hawk", "Sturdy Stag", "Solid Salmon", "Firm Falcon",
    "Stone Swan", "Rock Rhino", "Gravel Gorilla", "Sand Seagull", "Dusty Dog"
];

const STORAGE_KEY = 'anonymousNamesMap';

/**
 * Assigns a unique, consistent anonymous name to a user.
 * @param {string} userId - The unique identifier of the user
 * @returns {string} The assigned anonymous name
 */
export const assignAnonymousName = (userId) => {
    try {
        const storedMap = localStorage.getItem(STORAGE_KEY);
        let nameMap = storedMap ? JSON.parse(storedMap) : {};

        // 1. If user already has a name, return it
        if (nameMap[userId]) {
            return nameMap[userId];
        }

        // 2. Find all currently assigned names
        const assignedNames = Object.values(nameMap);

        // 3. Find available names
        let availableNames = ANONYMOUS_NAMES.filter(name => !assignedNames.includes(name));

        // Note: If all 100 names are used, we fallback to reusing from the pool to avoid breaking
        if (availableNames.length === 0) {
            availableNames = ANONYMOUS_NAMES;
        }

        // 4. Randomly pick one from available
        const randomIndex = Math.floor(Math.random() * availableNames.length);
        const assignedName = availableNames[randomIndex];

        // 5. Store and return
        nameMap[userId] = assignedName;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nameMap));
        
        return assignedName;
    } catch (e) {
        console.error("Failed to assign anonymous name", e);
        // Fallback for private mode or errors
        return "Silent Spectator"; 
    }
};

/**
 * Gets the list of available remaining names (just for diagnostic/UI purposes if ever needed)
 */
export const getAvailableNamesCount = () => {
    const storedMap = localStorage.getItem(STORAGE_KEY);
    const nameMap = storedMap ? JSON.parse(storedMap) : {};
    return Math.max(0, ANONYMOUS_NAMES.length - Object.keys(nameMap).length);
};
