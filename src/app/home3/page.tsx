import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { HomeBody } from "@/components/pages/HomeBody";
import { HeroOrigen } from "@/components/sections/heroes/HeroOrigen";

export const metadata: Metadata = {
    title: "Home 3 · variante de portada",
    // Variante de diseño: no debe competir con la portada en buscadores.
    robots: { index: false, follow: false },
};

export default function Page() {
    return (
        <>
            <Navbar current="inicio" />

            <main id="main">
                <HeroOrigen />
                <HomeBody />
            </main>

            <Footer />
        </>
    );
}
