import React from "react";
import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Route/Hero/Hero.jsx";
import Categories from "../components/Route/Categories/Categories.jsx";

export default function HomePage() {
    return (
        <div>
            <Header activeHeading={1} />
            <Hero />
            <Categories />
        </div>
    );
}
