/**
 * Unified product catalogue for SideQuest.
 *
 * Athlete products carry:
 *   athleteTag: true
 *   athleteName: string
 *   crossCategory: 'men' | 'women'   ← makes them appear in the respective category page
 *
 * CategoryPage filters on:  p.category === category  OR  p.crossCategory === category
 */

export const products = [

    // ═══════════════════════════════════════════════════════
    //  MEN'S — JACKETS & VESTS
    // ═══════════════════════════════════════════════════════
    {
        id: 'm_j1',
        name: 'Summit Jacket',
        price: 4999,
        image: '/assets/MenProducts/JacketsVests/Jacket1.jpg',
        category: 'men',
        subCategory: 'JacketsVests',
        featured: true,
    },
    {
        id: 'm_j2',
        name: 'Hardshell Jacket',
        price: 3599,
        image: '/assets/MenProducts/JacketsVests/Jacket2.jpg',
        category: 'men',
        subCategory: 'JacketsVests',
        featured: false,
    },
    {
        id: 'm_j3',
        name: 'Barbour Heritage Wax Jacket',
        price: 7499,
        image: '/assets/MenProducts/JacketsVests/Jacket3.webp',
        category: 'men',
        subCategory: 'JacketsVests',
        featured: false,
    },
    {
        id: 'm_j4',
        name: 'Mountain Classic Anorak',
        price: 5299,
        image: '/assets/MenProducts/JacketsVests/Jacket4.jpeg',
        category: 'men',
        subCategory: 'JacketsVests',
        featured: true,
    },
    {
        id: 'm_j5',
        name: 'Hytte Recycled Shell Jacket',
        price: 4799,
        image: '/assets/MenProducts/JacketsVests/Jacket5.jpeg',
        category: 'men',
        subCategory: 'JacketsVests',
        featured: false,
    },
    {
        id: 'm_j6',
        name: 'Ridge Waterproof Hooded Jacket',
        price: 5599,
        image: '/assets/MenProducts/JacketsVests/Jacket6.jpeg',
        category: 'men',
        subCategory: 'JacketsVests',
        featured: false,
    },
    {
        id: 'm_j7',
        name: 'TNF Junction Insulated Jacket',
        price: 6299,
        image: '/assets/MenProducts/JacketsVests/Jacket7.jpeg',
        category: 'men',
        subCategory: 'JacketsVests',
        featured: false,
    },
    {
        id: 'm_j8',
        name: 'Tsurugi Lite Alpine Jacket',
        price: 8499,
        image: '/assets/MenProducts/JacketsVests/Jacket8.jpeg',
        category: 'men',
        subCategory: 'JacketsVests',
        featured: true,
    },

    // ═══════════════════════════════════════════════════════
    //  MEN'S — FLEECE
    // ═══════════════════════════════════════════════════════
    {
        id: 'm_f1',
        name: 'Alpine Fleece',
        price: 3499,
        image: '/assets/MenProducts/Fleece/Fleece1.jpg',
        category: 'men',
        subCategory: 'Fleece',
        featured: true,
    },
    {
        id: 'm_f2',
        name: 'Rawthey Half-Zip Fleece',
        price: 2999,
        image: '/assets/MenProducts/Fleece/Fleece2.jpeg',
        category: 'men',
        subCategory: 'Fleece',
        featured: false,
    },
    {
        id: 'm_f3',
        name: 'Cypress Sherpa Fleece',
        price: 3799,
        image: '/assets/MenProducts/Fleece/Fleece3.jpeg',
        category: 'men',
        subCategory: 'Fleece',
        featured: true,
    },
    {
        id: 'm_f4',
        name: 'Offgrid Recycled Sherpa Fleece',
        price: 3199,
        image: '/assets/MenProducts/Fleece/Fleece4.jpeg',
        category: 'men',
        subCategory: 'Fleece',
        featured: false,
    },
    {
        id: 'm_f5',
        name: 'Woodland Hooded Polar Fleece',
        price: 2799,
        image: '/assets/MenProducts/Fleece/Fleece5.jpeg',
        category: 'men',
        subCategory: 'Fleece',
        featured: false,
    },

    // ═══════════════════════════════════════════════════════
    //  MEN'S — BOTTOMS
    // ═══════════════════════════════════════════════════════
    {
        id: 'm_b1',
        name: 'Trail Pants',
        price: 3999,
        image: '/assets/MenProducts/Bottoms/Bottoms1.jpg',
        category: 'men',
        subCategory: 'Bottoms',
        featured: true,
    },
    {
        id: 'm_b2',
        name: 'Waterproof Cargo Trousers',
        price: 3599,
        image: '/assets/MenProducts/Bottoms/Bottoms2.jpeg',
        category: 'men',
        subCategory: 'Bottoms',
        featured: false,
    },
    {
        id: 'm_b3',
        name: 'Ripstop Multi-Pocket Trousers',
        price: 4199,
        image: '/assets/MenProducts/Bottoms/Bottoms3.jpeg',
        category: 'men',
        subCategory: 'Bottoms',
        featured: false,
    },
    {
        id: 'm_b4',
        name: 'Vanadis Trekking Trousers',
        price: 3299,
        image: '/assets/MenProducts/Bottoms/Bottoms4.jpeg',
        category: 'men',
        subCategory: 'Bottoms',
        featured: true,
    },
    {
        id: 'm_b5',
        name: 'Tactical Molle Combat Pants',
        price: 3899,
        image: '/assets/MenProducts/Bottoms/Bottoms5.jpeg',
        category: 'men',
        subCategory: 'Bottoms',
        featured: false,
    },

    // ═══════════════════════════════════════════════════════
    //  MEN'S — FOOTWEAR
    // ═══════════════════════════════════════════════════════
    {
        id: 'm_ft1',
        name: 'Trail Runners',
        price: 7999,
        image: '/assets/MenProducts/Footwear/Foot1.jpg',
        category: 'men',
        subCategory: 'Footwear',
        featured: false,
    },
    {
        id: 'm_ft2',
        name: 'MT5-GTX Mid Trekking Boot',
        price: 8999,
        image: '/assets/MenProducts/Footwear/Foot2.jpeg',
        category: 'men',
        subCategory: 'Footwear',
        featured: true,
    },
    {
        id: 'm_ft3',
        name: 'Hightrail Mid Waterproof Boot',
        price: 7499,
        image: '/assets/MenProducts/Footwear/Foot3.jpeg',
        category: 'men',
        subCategory: 'Footwear',
        featured: false,
    },
    {
        id: 'm_ft4',
        name: 'Bergen Mid Waterproof Boot',
        price: 8299,
        image: '/assets/MenProducts/Footwear/Foot4.jpg',
        category: 'men',
        subCategory: 'Footwear',
        featured: false,
    },
    {
        id: 'm_ft5',
        name: 'Route Outdoor Walking Shoe',
        price: 5999,
        image: '/assets/MenProducts/Footwear/Foot5.jpeg',
        category: 'men',
        subCategory: 'Footwear',
        featured: false,
    },
    {
        id: 'm_ft6',
        name: 'TNF Fully Loaded Hiking Boot',
        price: 10499,
        image: '/assets/MenProducts/Footwear/Foot6.jpeg',
        category: 'men',
        subCategory: 'Footwear',
        featured: true,
    },
    {
        id: 'm_ft7',
        name: 'Apex Summit Trail Boot',
        price: 9499,
        image: '/assets/MenProducts/Footwear/Foot7.jpeg',
        category: 'men',
        subCategory: 'Footwear',
        featured: false,
    },

    // ═══════════════════════════════════════════════════════
    //  WOMEN'S — JACKETS & VESTS
    // ═══════════════════════════════════════════════════════
    {
        id: 'w_j1',
        name: "Women's Summit Jacket",
        price: 4999,
        image: '/assets/WomenProducts/JacketsVests/Jacket1.jpg',
        category: 'women',
        subCategory: 'JacketsVests',
        featured: true,
    },
    {
        id: 'w_j2',
        name: 'Prowess Burton Jacket',
        price: 6299,
        image: '/assets/WomenProducts/JacketsVests/Jacket2.jpeg',
        category: 'women',
        subCategory: 'JacketsVests',
        featured: false,
    },
    {
        id: 'w_j3',
        name: 'Ultimate Alpine Hooded Jacket',
        price: 8499,
        image: '/assets/WomenProducts/JacketsVests/Jacket3.jpeg',
        category: 'women',
        subCategory: 'JacketsVests',
        featured: true,
    },
    {
        id: 'w_j4',
        name: 'Trekking Shell Jacket',
        price: 5199,
        image: '/assets/WomenProducts/JacketsVests/Jacket4.jpeg',
        category: 'women',
        subCategory: 'JacketsVests',
        featured: false,
    },
    {
        id: 'w_j5',
        name: 'Aldthorn Heavyweight Coat',
        price: 7299,
        image: '/assets/WomenProducts/JacketsVests/Jacket5.jpeg',
        category: 'women',
        subCategory: 'JacketsVests',
        featured: false,
    },
    {
        id: 'w_j6',
        name: 'Multi-Sport Rain Jacket',
        price: 5799,
        image: '/assets/WomenProducts/JacketsVests/Jacket6.jpeg',
        category: 'women',
        subCategory: 'JacketsVests',
        featured: false,
    },

    // ═══════════════════════════════════════════════════════
    //  WOMEN'S — FLEECE
    // ═══════════════════════════════════════════════════════
    {
        id: 'w_f1',
        name: "Women's Alpine Fleece",
        price: 3499,
        image: '/assets/WomenProducts/Fleece/Fleece1.jpg',
        category: 'women',
        subCategory: 'Fleece',
        featured: true,
    },
    {
        id: 'w_f2',
        name: 'Adventure Full-Zip Thick Fleece',
        price: 3899,
        image: '/assets/WomenProducts/Fleece/Fleece2.jpeg',
        category: 'women',
        subCategory: 'Fleece',
        featured: false,
    },
    {
        id: 'w_f3',
        name: 'TNF Fleece Pullover',
        price: 4299,
        image: '/assets/WomenProducts/Fleece/Fleece3.jpeg',
        category: 'women',
        subCategory: 'Fleece',
        featured: true,
    },
    {
        id: 'w_f4',
        name: 'Lightweight Trail Fleece',
        price: 2799,
        image: '/assets/WomenProducts/Fleece/Fleece4.jpeg',
        category: 'women',
        subCategory: 'Fleece',
        featured: false,
    },
    {
        id: 'w_f5',
        name: 'Mountain Classic Fleece Jacket',
        price: 3299,
        image: '/assets/WomenProducts/Fleece/Fleece5.jpeg',
        category: 'women',
        subCategory: 'Fleece',
        featured: false,
    },
    {
        id: 'w_f6',
        name: 'Columbia Fleece Zip-Up',
        price: 3599,
        image: '/assets/WomenProducts/Fleece/Fleece6.jpeg',
        category: 'women',
        subCategory: 'Fleece',
        featured: false,
    },

    // ═══════════════════════════════════════════════════════
    //  WOMEN'S — BOTTOMS
    // ═══════════════════════════════════════════════════════
    {
        id: 'w_b1',
        name: "Women's Trail Pants",
        price: 3999,
        image: '/assets/WomenProducts/Bottoms/Bottoms1.jpg',
        category: 'women',
        subCategory: 'Bottoms',
        featured: false,
    },
    {
        id: 'w_b2',
        name: 'Libin Quick-Dry Cargo Pants',
        price: 2799,
        image: '/assets/WomenProducts/Bottoms/Bottoms2.jpeg',
        category: 'women',
        subCategory: 'Bottoms',
        featured: false,
    },
    {
        id: 'w_b3',
        name: 'Singbring Lightweight Jogger Pants',
        price: 3199,
        image: '/assets/WomenProducts/Bottoms/Bottoms3.jpeg',
        category: 'women',
        subCategory: 'Bottoms',
        featured: true,
    },
    {
        id: 'w_b4',
        name: 'All-Terrain Black Bottoms',
        price: 2999,
        image: '/assets/WomenProducts/Bottoms/Bottoms4.jpeg',
        category: 'women',
        subCategory: 'Bottoms',
        featured: false,
    },
    {
        id: 'w_b5',
        name: 'Evertrail Forest Green Shorts',
        price: 2499,
        image: '/assets/WomenProducts/Bottoms/Bottoms5.jpg',
        category: 'women',
        subCategory: 'Bottoms',
        featured: false,
    },

    // ═══════════════════════════════════════════════════════
    //  WOMEN'S — FOOTWEAR
    // ═══════════════════════════════════════════════════════
    {
        id: 'w_ft1',
        name: "Women's Trail Runners",
        price: 7999,
        image: '/assets/WomenProducts/Footwear/Foot1.jpg',
        category: 'women',
        subCategory: 'Footwear',
        featured: false,
    },
    {
        id: 'w_ft2',
        name: 'Merrell MOAB 3 GORE-TEX Shoe',
        price: 8999,
        image: '/assets/WomenProducts/Footwear/Foot2.jpeg',
        category: 'women',
        subCategory: 'Footwear',
        featured: true,
    },
    {
        id: 'w_ft3',
        name: 'Moab Speed 2 Leather Mid WP',
        price: 8499,
        image: '/assets/WomenProducts/Footwear/Foot3.jpeg',
        category: 'women',
        subCategory: 'Footwear',
        featured: false,
    },
    {
        id: 'w_ft4',
        name: 'On Running Cloudventure Shoe',
        price: 10999,
        image: '/assets/WomenProducts/Footwear/Foot4.jpeg',
        category: 'women',
        subCategory: 'Footwear',
        featured: false,
    },
    {
        id: 'w_ft5',
        name: 'Salomon XA Pro 3D Ultra GTX',
        price: 11499,
        image: '/assets/WomenProducts/Footwear/Foot5.jpeg',
        category: 'women',
        subCategory: 'Footwear',
        featured: true,
    },
    {
        id: 'w_ft6',
        name: 'Salomon Quest GORE-TEX Boot',
        price: 12499,
        image: '/assets/WomenProducts/Footwear/Foot6.jpeg',
        category: 'women',
        subCategory: 'Footwear',
        featured: false,
    },

    // ═══════════════════════════════════════════════════════
    //  ATHLETE PRODUCTS — ALEX HONNOLD (Male)
    //  crossCategory: 'men' → also shown on Men's page
    // ═══════════════════════════════════════════════════════
    {
        id: 'ath_ah1',
        name: 'Summit Series Climbing Top',
        price: 8999,
        image: '/assets/athletes/AlexProd/Alex_top.jpg',
        category: 'athlete',
        subCategory: 'AlexHonnold',
        athleteTag: true,
        athleteName: 'Alex Honnold',
        crossCategory: 'men',
    },
    {
        id: 'ath_ah2',
        name: 'Climbing Pants',
        price: 6999,
        image: '/assets/athletes/AlexProd/Alex_bottoms.jpeg',
        category: 'athlete',
        subCategory: 'AlexHonnold',
        athleteTag: true,
        athleteName: 'Alex Honnold',
        crossCategory: 'men',
    },
    {
        id: 'ath_ah3',
        name: 'Approach Shoes',
        price: 12999,
        image: '/assets/athletes/AlexProd/Alex_shoes.jpg',
        category: 'athlete',
        subCategory: 'AlexHonnold',
        athleteTag: true,
        athleteName: 'Alex Honnold',
        crossCategory: 'men',
    },

    // ═══════════════════════════════════════════════════════
    //  ATHLETE PRODUCTS — KIT DESLAURIERS (Female)
    //  crossCategory: 'women' → also shown on Women's page
    // ═══════════════════════════════════════════════════════
    {
        id: 'ath_kd1',
        name: 'Alpine Shell Jacket',
        price: 10999,
        image: '/assets/athletes/KitProd/Kit_top.jpg',
        category: 'athlete',
        subCategory: 'KitDeslauriers',
        athleteTag: true,
        athleteName: 'Kit Deslauriers',
        crossCategory: 'women',
    },
    {
        id: 'ath_kd2',
        name: 'Expedition Ski Bibs',
        price: 14999,
        image: '/assets/athletes/KitProd/Kit_bottoms.jpg',
        category: 'athlete',
        subCategory: 'KitDeslauriers',
        athleteTag: true,
        athleteName: 'Kit Deslauriers',
        crossCategory: 'women',
    },
    {
        id: 'ath_kd3',
        name: 'Mountaineering Boots',
        price: 18999,
        image: '/assets/athletes/KitProd/Kit_shoes.jpg',
        category: 'athlete',
        subCategory: 'KitDeslauriers',
        athleteTag: true,
        athleteName: 'Kit Deslauriers',
        crossCategory: 'women',
    },

    // ═══════════════════════════════════════════════════════
    //  ATHLETE PRODUCTS — TOMMY CALDWELL (Male)
    //  crossCategory: 'men' → also shown on Men's page
    // ═══════════════════════════════════════════════════════
    {
        id: 'ath_tc1',
        name: 'Big Wall Hoodie',
        price: 6499,
        image: '/assets/athletes/TommyProd/Tommy_top.jpg',
        category: 'athlete',
        subCategory: 'TommyCaldwell',
        athleteTag: true,
        athleteName: 'Tommy Caldwell',
        crossCategory: 'men',
    },
    {
        id: 'ath_tc2',
        name: 'Rock Pants',
        price: 5999,
        image: '/assets/athletes/TommyProd/Tommy_bottoms.jpg',
        category: 'athlete',
        subCategory: 'TommyCaldwell',
        athleteTag: true,
        athleteName: 'Tommy Caldwell',
        crossCategory: 'men',
    },
    {
        id: 'ath_tc3',
        name: 'TC Pro Climbing Shoes',
        price: 11999,
        image: '/assets/athletes/TommyProd/Tommy_shoes.jpg',
        category: 'athlete',
        subCategory: 'TommyCaldwell',
        athleteTag: true,
        athleteName: 'Tommy Caldwell',
        crossCategory: 'men',
    },

    // ═══════════════════════════════════════════════════════
    //  ATHLETE PRODUCTS — CAROLINE GLEICH (Female)
    //  crossCategory: 'women' → also shown on Women's page
    // ═══════════════════════════════════════════════════════
    {
        id: 'ath_cg1',
        name: 'Ski Touring Jacket',
        price: 12499,
        image: '/assets/athletes/CarolineProd/Caroline_top.jpg',
        category: 'athlete',
        subCategory: 'CarolineGleich',
        athleteTag: true,
        athleteName: 'Caroline Gleich',
        crossCategory: 'women',
    },
    {
        id: 'ath_cg2',
        name: 'Ski Bibs',
        price: 13999,
        image: '/assets/athletes/CarolineProd/Caroline_bottom.jpg',
        category: 'athlete',
        subCategory: 'CarolineGleich',
        athleteTag: true,
        athleteName: 'Caroline Gleich',
        crossCategory: 'women',
    },
    {
        id: 'ath_cg3',
        name: 'Touring Boots',
        price: 24999,
        image: '/assets/athletes/CarolineProd/shoes.jpg',
        category: 'athlete',
        subCategory: 'CarolineGleich',
        athleteTag: true,
        athleteName: 'Caroline Gleich',
        crossCategory: 'women',
    },
];
