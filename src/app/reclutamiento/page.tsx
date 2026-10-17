import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Reclutamiento from "@/components/pages/Reclutamiento";

export const metadata: Metadata = {
    title: "Reclutamiento",
    description:
        "Todas las vacantes abiertas de bia Honduras en marketing, operaciones, comercial y people. Postula en minutos.",
};

export default function Page() {
    return (
        <>
            <Navbar current="reclutamiento" />

            <main id="main">
                <Reclutamiento />
            </main>

            <Footer />
        </>
    );
}
