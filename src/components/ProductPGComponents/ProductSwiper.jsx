"use client";
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import ProductBox from "../ShopComponents/ProductBox";
import Image from 'next/image';
import { useRef, useState } from 'react';
import IsTabletOrLarger from '@/hooks/isTabletOrLarger';

const ProductSwiper = ({ sameProducts, type, whatPage, swiperLength, txtClass, clickFnc }) => {
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isTablet = IsTabletOrLarger();
    const updateSlideChanging = () => {
        if (swiperRef.current) {
            setActiveIndex(swiperRef.current.swiper.realIndex);
        }
    };
    const returnLink = (title) => {
        if (title.includes('Jordan')) return `air-jordan`;
        else if (title.includes('Balance')) return `new-balance`;
        else if (title.includes('Nike')) return `nike-dunks`;
        else if (title.includes('Reebok')) return `reebok`;
        else if (title.includes('Converse')) return `converse`;
        else if (title.includes('Vans')) return `vans`;
        else if (title.includes('Asics')) return `asics`;
        else return `all`
    };

    return (
        <main className='border-t border-t-black'>
            <Swiper
                ref={swiperRef}
                modules={[Pagination, A11y]}
                spaceBetween={0}
                onSlideChange={updateSlideChanging}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {sameProducts.map((sameProduct, productIndex) => (
                    <SwiperSlide key={productIndex} className={`${productIndex === sameProducts.length - 1 ? 'border-none' : 'border-r border-r-black tab:border-none'}`}>
                        <ProductBox product={sameProduct} type={type === null ? returnLink(sameProduct?.title) : type} txtClass={txtClass} clickFnc={clickFnc} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className='flex justify-between items-center px-3 my-3'>
                {
                    whatPage === 'home' ?
                        isTablet ?
                            <div>
                                {sameProducts.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => swiperRef.current?.swiper.slideTo(index)}
                                        className={`w-2 h-2 rounded-full mx-[2px] ${index === activeIndex ? 'bg-black' : 'bg-gray-300'}`}
                                    />
                                ))}
                            </div>
                            :
                            <div>
                                {Array.from({ length: swiperLength }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => swiperRef.current?.swiper.slideTo(index)}
                                        className={`w-2 h-2 rounded-full mx-[2px] ${index === activeIndex ? 'bg-black' : 'bg-gray-300'}`}
                                    />
                                ))}
                            </div>
                        :
                        <div className='hidden tab:block'>
                            {sameProducts.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => swiperRef.current?.swiper.slideTo(index)}
                                    className={`w-2 h-2 rounded-full mx-[2px] ${index === activeIndex ? 'bg-black' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>

                }
                <div className={`${whatPage === 'home' ? 'block' : whatPage === 'product' ? 'hidden tab:block' : ''}`}>
                    <button onClick={() => swiperRef.current?.swiper.slidePrev()}>
                        <Image src={`/icons/ArrLeft.svg`} alt='Left Arrow' width={24} height={24} title='Previous Product' className='mx-2 w-6 h-auto' />
                    </button>
                    <button onClick={() => swiperRef.current?.swiper.slideNext()}>
                        <Image src={`/icons/ArrRight.svg`} alt='Right Arrow' width={24} height={24} title='Next Product' className='w-6 h-auto' />
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ProductSwiper;
