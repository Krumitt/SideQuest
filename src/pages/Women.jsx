import React from 'react';
import CategoryPage from './CategoryPage';
import ModelSlideshow from '../components/ui/ModelSlideshow';

const femaleSlides = [
    {
        image: '/assets/models/female/model-1.jpeg',
        caption: 'From Basecamp to Summit',
    },
    {
        image: '/assets/models/female/model-2.jpeg',
        caption: 'Confidence in Every Layer',
    },
    {
        image: '/assets/models/female/model-3.jpeg',
        caption: 'Performance Meets Style',
    },
];

export default function Women() {
    return (
        <>
            <CategoryPage category="women" title="Women's Collection" bannerImage="/assets/images/hero/hero.jpg" />
            <ModelSlideshow slides={femaleSlides} title="She Moves Mountains" />
        </>
    );
}
