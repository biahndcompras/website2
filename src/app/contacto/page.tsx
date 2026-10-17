import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Contacto from "@/components/pages/Contacto";

export const metadata: Metadata = {
    title: "Contacto",
    description:
        "¿Tienes dudas sobre una vacante, sobre el proceso o sobre nuestra operación en Honduras? Escríbenos y el equipo adecuado te responde.",
};

export default function Page() {
    return (
        <>
            <Navbar current="contacto" />

            <main id="main">
                <Contacto />
            </main>

            <Footer />
        </>
    );
}
