import fs from 'fs';
import path from 'path';

const currentDir = process.cwd();
const productsPath = path.join(currentDir, 'src', 'data', 'products.js');

let content = fs.readFileSync(productsPath, 'utf8');

let counter = 0;

// Every time we find a category or crossCategory property before '    },', we append the ratings.
content = content.replace(/( +)(\w+: [^,]+,)\n( +)\},/g, (match, p1, p2, p3) => {
    // Determine random values deterministically based on counter
    counter++;
    const defaultRating = (3.5 + ((counter * 7) % 15) / 10).toFixed(1); // Values like 3.5, 4.2
    const defaultReviewCount = 20 + ((counter * 13) % 180); // Values like ~20 - 200

    return `${p1}${p2}\n${p1}defaultRating: ${defaultRating},\n${p1}defaultReviewCount: ${defaultReviewCount},\n${p3}},`;
});

// For the last element which might end in '];' instead
content = content.replace(/( +)(\w+: [^,]+,)\n( +)\}\n];/g, (match, p1, p2, p3) => {
    counter++;
     const defaultRating = (3.5 + ((counter * 7) % 15) / 10).toFixed(1);
    const defaultReviewCount = 20 + ((counter * 13) % 180);

    return `${p1}${p2}\n${p1}defaultRating: ${defaultRating},\n${p1}defaultReviewCount: ${defaultReviewCount},\n${p3}}\n];`;
});

fs.writeFileSync(productsPath, content);
console.log("Updated products.js successfully.");
