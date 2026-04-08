export const REVIEW_STORAGE_KEY = 'productReviews';

/**
 * Get all reviews for a specific product
 * @param {string} productId 
 * @returns {Array} Array of review objects
 */
export const getReviews = (productId) => {
    try {
        const stored = localStorage.getItem(REVIEW_STORAGE_KEY);
        if (!stored) return [];
        const parsed = JSON.parse(stored);
        return parsed[productId] || [];
    } catch (e) {
        console.error("Failed to parse reviews from localStorage", e);
        return [];
    }
};

/**
 * Add a new review for a product
 * @param {string} productId 
 * @param {Object} reviewObj { userId, rating, review, timestamp }
 */
export const addReview = (productId, reviewObj) => {
    try {
        const stored = localStorage.getItem(REVIEW_STORAGE_KEY);
        let parsed = stored ? JSON.parse(stored) : {};
        if (!parsed[productId]) {
            parsed[productId] = [];
        }
        
        // Prevent duplicate - if user already reviewed, replace it
        const existingIdx = parsed[productId].findIndex(r => r.userId === reviewObj.userId);
        if (existingIdx >= 0) {
            parsed[productId][existingIdx] = reviewObj;
        } else {
            parsed[productId].push(reviewObj);
        }

        localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(parsed));
        return true;
    } catch (e) {
        console.error("Failed to save review to localStorage", e);
        return false;
    }
};

/**
 * Remove a user's review for a product
 * @param {string} productId 
 * @param {string} userId 
 */
export const removeReview = (productId, userId) => {
    try {
        const stored = localStorage.getItem(REVIEW_STORAGE_KEY);
        if (!stored) return false;
        let parsed = JSON.parse(stored);
        
        if (parsed[productId]) {
            parsed[productId] = parsed[productId].filter(r => r.userId !== userId);
            localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(parsed));
            return true;
        }
        return false;
    } catch (e) {
        console.error("Failed to remove review from localStorage", e);
        return false;
    }
};

/**
 * Get a specific user's review for a product (if exists)
 * @param {string} productId 
 * @param {string} userId 
 */
export const getUserReview = (productId, userId) => {
    const reviews = getReviews(productId);
    return reviews.find(r => r.userId === userId) || null;
};

/**
 * Computes average rating using base default values and actual user reviews.
 * 
 * Formula:
 * (default sum + user sum) / (default count + user count)
 * 
 * @param {string} productId 
 * @param {number} defaultRating 
 * @param {number} defaultReviewCount 
 * @returns {Object} { averageRating: number, totalReviews: number }
 */
export const calculateRating = (productId, defaultRating = 4.0, defaultReviewCount = 100) => {
    const reviews = getReviews(productId);
    const userReviewCount = reviews.length;
    
    if (userReviewCount === 0) {
        return {
            averageRating: Number(defaultRating),
            totalReviews: Number(defaultReviewCount)
        };
    }
    
    const userRatingSum = reviews.reduce((sum, r) => sum + Number(r.rating), 0);
    const defaultSum = Number(defaultRating) * Number(defaultReviewCount);
    
    const totalSum = defaultSum + userRatingSum;
    const totalCount = Number(defaultReviewCount) + userReviewCount;
    
    const computedAverage = totalSum / totalCount;
    
    return {
        averageRating: Number(computedAverage.toFixed(1)), // Keep 1 decimal
        totalReviews: totalCount
    };
};
