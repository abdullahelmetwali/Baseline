"use server";
import ProductSwiper from "../ProductPGComponents/ProductSwiper";

const WhatToGet = async ({ url, swiperLength }) => {
    let newArrivalsProducts = [];
    let error = null;
    try {
        const response = await fetch(url, { next: { revalidate: 120 } })
        const newArrivalsData = await response.json();
        if (!response.ok) {
            throw new Error('Failed to get Last Arrivals');
        };
        newArrivalsProducts = newArrivalsData.products
    } catch (err) {
        error = err.message;
    };
    return <ProductSwiper sameProducts={newArrivalsProducts} type={`new-arrivals`} whatPage={'home'} swiperLength={swiperLength} />
}
export default WhatToGet