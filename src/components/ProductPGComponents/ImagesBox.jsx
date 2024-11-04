"use client"
import { useRef } from "react";
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, A11y } from 'swiper/modules';
import IsTabletOrLarger from "@/hooks/isTabletOrLarger";
import 'swiper/css/pagination';
import 'swiper/css';

const ImagesBox = ({ productDetails }) => {
    const swiperRef = useRef(null);
    const isTabletOrLarger = IsTabletOrLarger();
    return (
        <>
            {
                isTabletOrLarger ?
                    <>
                        <section className="border-r text-lg border-r-black tab:border-r-0">
                            <Swiper
                                className="border-b border-b-black my-3"
                                ref={swiperRef}
                                modules={[Pagination, Scrollbar, A11y]}
                                spaceBetween={0}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                loop={true}
                            >
                                {
                                    productDetails.images?.map((img, imgIndx) => (
                                        <SwiperSlide key={imgIndx}>
                                            <Image
                                                src={img.src}
                                                alt={`${productDetails.title}-${img?.id}`}
                                                priority
                                                unoptimized
                                                width={3000}
                                                height={50}
                                                className={`border- border-b-black`}
                                            />
                                        </SwiperSlide>
                                    ))
                                }
                                <div className='justify-end my-3 px-3 hidden tab:flex'>
                                    <button onClick={() => {
                                        if (swiperRef.current) {
                                            swiperRef.current.swiper.slidePrev();
                                        }
                                    }}>
                                        <Image src={`/icons/ArrLeft.svg`} alt='Left Arrow' width={24} height={24} title='Previous Product' className='mx-2' />
                                    </button>
                                    <button onClick={() => {
                                        if (swiperRef.current) {
                                            swiperRef.current.swiper.slideNext();
                                        }
                                    }}>
                                        <Image src={`/icons/ArrRight.svg`} alt='Right Arrow' width={24} height={24} title='Next Product' />
                                    </button>
                                </div>
                            </Swiper>
                        </section>
                    </> : <>
                        <section className="border-r border-black">
                            {
                                productDetails.images?.map((img, imgIndex) => (
                                    <Image
                                        key={imgIndex}
                                        src={img.src}
                                        alt={`${productDetails.title}-${img?.id}`}
                                        priority
                                        unoptimized
                                        width={3000}
                                        height={50}
                                        className={`${(imgIndex % 2 === 0)
                                            ? imgIndex === 0 ? 'border-b border-b-black' : (imgIndex === productDetails.images.length - 1) ? 'border-t border-t-black' : 'border-y border-y-black'
                                            : ''}`}
                                    />
                                ))
                            }
                        </section>
                    </>
            }
        </>
    )
}
export default ImagesBox