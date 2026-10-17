import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Nosotros from "@/components/pages/Nosotros";

export const metadata: Metadata = {
    title: "Nosotros",
    description:
        "bia Honduras: cuatro generaciones, cuatro marcas y doce centros que mueven todo el país. Conoce nuestra historia desde 1935.",
};

export default function Page() {
    return (
        <>
            <Navbar current="nosotros" />

            <main id="main">
                <Nosotros />
            </main>

            <Footer />
        </>
    );
}
