'use client'

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';

import 'swiper/css';

export type SlideType = {
    image: string;
    title: string;
    subtitle: string;
    primaryBtnText: string;
    secondaryBtnText: string;
};

type SliderType = {
    spaceBetween?: number;
    slidesPerView?: number;
    slidesList?: SlideType[];
};

export default function Slider({ spaceBetween = 0, slidesPerView = 1, slidesList = [] }: SliderType) {
    const swiperRef = useRef<SwiperType | null>(null);
    const [active, setActive] = useState(0);

    if (slidesList.length === 0) return null;

    return (
        <div className="relative w-full h-[400px] md:h-[500px]">
            <Swiper
                modules={[Autoplay]}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={slidesList.length > slidesPerView}
                onSwiper={(s) => (swiperRef.current = s)}
                onSlideChange={(s) => setActive(s.realIndex)}
                className="w-full h-full"
            >
                {slidesList.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                priority={index === 0}
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-emerald-600/50" />

                            <div className="absolute inset-0 flex flex-col justify-center px-16 md:px-24 text-white">
                                <h2 className="text-3xl md:text-5xl font-extrabold mb-3 max-w-md">
                                    {slide.title}
                                </h2>
                                <p className="mb-6 max-w-md">{slide.subtitle}</p>
                                <div className="flex gap-4">
                                    <button className="bg-white text-emerald-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-100">
                                        {slide.primaryBtnText}
                                    </button>
                                    <button className="border border-white/70 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-white/10">
                                        {slide.secondaryBtnText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* زرار السابق */}
            <button
                type="button"
                aria-label="Previous slide"
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-green-600 shadow-md transition hover:scale-105"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            {/* زرار التالي */}
            <button
                type="button"
                aria-label="Next slide"
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-green-600 shadow-md transition hover:scale-105"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>

            {/* النقط */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
                {slidesList.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => swiperRef.current?.slideToLoop(i)}
                        className={`h-2.5 rounded-full bg-white transition-all duration-300 ${
                            active === i ? 'w-8 opacity-100' : 'w-2.5 opacity-60'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}