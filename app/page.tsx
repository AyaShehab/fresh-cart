// import Categories from "./_components/Categories/Categories";
const Categories=lazy(() => import('./_components/Categories/Categories'));
import { lazy, Suspense } from "react";
import FeaturedProducts from "./_components/FeaturedProducts/FeaturedProducts";
import Features from "./_components/Features/Features";
import Slider, { SlideType } from "./_components/Slider/Slider";
import img1 from "./assets/home-slider-1.d79601a8.png";

const slides: SlideType[] = [
    {
        image: img1.src,
        title: "Fresh Products Delivered to your Door",
        subtitle: "Get 20% off your first order",
        primaryBtnText: "Shop Now",
        secondaryBtnText: "View Deals",
    },
    {
        image: img1.src,
        title: "Fast & Free Delivery",
        subtitle: "Same day delivery available",
        primaryBtnText: "Order Now",
        secondaryBtnText: "Delivery Info",
    },
     {
        image: img1.src,
        title: "Premium Quality Guaranteed",
        subtitle: "Fresh From Farm To Your Table",
        primaryBtnText: "Shop Now",
        secondaryBtnText: "Learn More",
    },
];

export default function Home() {
    return (
        <>
            <Slider spaceBetween={0} slidesPerView={1} slidesList={slides} />
            <Features/>
            <Suspense fallback={<div className="h-25 w-full bg-green-200 flex justify-center items-center">Loading...</div>}>

            <Categories/>
            </Suspense>
            <FeaturedProducts />
        </>
    );
}