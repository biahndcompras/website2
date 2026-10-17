import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CulturaBeneficios from "@/components/pages/CulturaBeneficios";

export const metadata: Metadata = {
    title: "Cultura & Beneficios",
    description:
        "La cultura de bia Honduras: identidad, orgullo y crecimiento. Beneficios, Universidad Apex y preguntas frecuentes.",
};

export default function Page() {
    return (
        <>
            <Navbar current="cultura" />

            <main id="main">
                <CulturaBeneficios />
            </main>

            <Footer />
        </>
    );
}
