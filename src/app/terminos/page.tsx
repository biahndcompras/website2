import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import { LegalArticle, TERMINOS } from "@/components/pages/LegalArticle";

export const metadata: Metadata = {
    title: "Términos y condiciones",
    description: "Condiciones de uso del sitio de bia Honduras y de sus procesos de reclutamiento.",
};

export default function Page() {
    return (
        <>
            <Navbar />

            <LegalArticle doc={TERMINOS} />
        </>
    );
}
