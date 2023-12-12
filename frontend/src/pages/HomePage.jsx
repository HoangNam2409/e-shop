import React from "react";
import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Route/Hero/Hero.jsx";
import Categories from "../components/Route/Categories/Categories.jsx";
import BestDeals from "../components/Route/BestDeals/BestDeals.jsx";
import Events from "../components/Events/Events.jsx";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct.jsx";
import Sponsored from "../components/Route/Sponsored.jsx";
import Footer from "../components/Layout/Footer.jsx";

export default function HomePage() {
    return (
        <div>
            <Header activeHeading={1} />
            <Hero />
            <Categories />
            <BestDeals /> d
            <Events />
            <FeaturedProduct />
            <Sponsored />
            <Footer />
        </div>
    );
}
