import React from 'react';
import CategoryPage from './CategoryPage';
import ModelSlideshow from '../components/ui/ModelSlideshow';

const maleSlides = [
    {
        image: '/assets/models/male/model-1.jpeg',
        caption: 'Engineered for the Summit',
    },
    {
        image: '/assets/models/male/model-2.jpeg',
        caption: 'Built for Every Trail',
    },
    {
        image: '/assets/models/male/model-3.jpeg',
        caption: 'Gear That Moves With You',
    },
];

export default function Men() {
    return (
        <>
            <CategoryPage category="men" title="Men's Collection" bannerImage="/assets/images/hero/hero.jpg" />
            <ModelSlideshow slides={maleSlides} title="Styled for the Trail" />
        </>
    );
}
