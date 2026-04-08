import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import { getReviews, addReview, removeReview, getUserReview } from '../../utils/reviews';

export default function ReviewSection({ productId, onReviewAdded }) {
    const [reviews, setReviews] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [userExistingReview, setUserExistingReview] = useState(null);

    // Form states
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Init reviews & current user
        const loggedInUser = localStorage.getItem('currentUser');
        setCurrentUser(loggedInUser);

        loadReviewsData(loggedInUser);
    }, [productId]);

    const loadReviewsData = (loggedInUser) => {
        const productReviews = getReviews(productId);
        // Sort newest first based on timestamp
        const sortedReviews = productReviews.sort((a, b) => b.timestamp - a.timestamp);
        setReviews(sortedReviews);

        if (loggedInUser) {
            const existing = getUserReview(productId, loggedInUser);
            setUserExistingReview(existing);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currentUser) return;
        if (rating === 0) {
            alert('Please select a star rating.');
            return;
        }

        setIsSubmitting(true);
        const newReview = {
            userId: currentUser,
            rating,
            review: reviewText,
            timestamp: Date.now()
        };

        const success = addReview(productId, newReview);
        if (success) {
            setRating(0);
            setReviewText('');
            loadReviewsData(currentUser);
            if (onReviewAdded) onReviewAdded();
        } else {
            alert("Failed to submit review.");
        }
        setIsSubmitting(false);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your review?")) {
            const success = removeReview(productId, currentUser);
            if (success) {
                setUserExistingReview(null);
                setRating(0);
                setReviewText('');
                loadReviewsData(currentUser);
                if (onReviewAdded) onReviewAdded();
            }
        }
    };

    const formatDate = (timestamp) => {
        const d = new Date(timestamp);
        return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div className="mt-12 w-full max-w-4xl border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Customer Reviews</h2>

            {/* Submit Review Interface */}
            <div className="mb-10 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-100 dark:border-gray-700">
                {!currentUser ? (
                    <div className="text-center py-4">
                        <p className="text-gray-600 dark:text-gray-300 mb-2">Login to write a review</p>
                        <a href="/login" className="text-blue-500 font-semibold hover:underline">Go to Login</a>
                    </div>
                ) : userExistingReview ? (
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">You have already reviewed this product</h3>
                            <button onClick={handleDelete} className="text-sm text-red-500 hover:text-red-600 font-medium hover:underline">
                                Delete Review
                            </button>
                        </div>
                        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold">{userExistingReview.userId}</span>
                                <span className="text-gray-400 text-sm">•</span>
                                <StarRating rating={userExistingReview.rating} size="w-4 h-4" />
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{userExistingReview.review || <span className="text-gray-400 italic">No written content</span>}</p>
                            <p className="text-xs text-gray-400 mt-2">{formatDate(userExistingReview.timestamp)}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-4 text-center">To modify your review, please delete it and submit a new one.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Write a Review</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Overall Rating *</label>
                            <StarRating rating={rating} interactive={true} onChange={setRating} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Detailed Review (Optional)</label>
                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                rows="4"
                                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-3 focus:ring-2 focus:ring-yellow-400 outline-none"
                                placeholder="What did you like or dislike?"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting || rating === 0}
                            className={`px-6 py-2 rounded-md font-medium text-white transition ${isSubmitting || rating === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                )}
            </div>

            {/* List all reviews */}
            <div className="space-y-6">
                {reviews.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 italic">No customer reviews yet. Be the first to share your experience!</p>
                ) : (
                    reviews.map((r, idx) => (
                        <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                                    {r.userId.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{r.userId}</p>
                                    <div className="flex items-center gap-2">
                                        <StarRating rating={r.rating} size="w-3 h-3" />
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(r.timestamp)}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mt-2">{r.review}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
