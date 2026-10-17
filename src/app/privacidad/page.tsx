import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import { LegalArticle, PRIVACIDAD } from "@/components/pages/LegalArticle";

export const metadata: Metadata = {
    title: "Aviso de privacidad",
    description: "Qué información recopilamos, cómo la usamos y qué decisiones tienes a tu disposición en bia Honduras.",
};

export default function Page() {
    return (
        <>
            <Navbar />

            <LegalArticle doc={PRIVACIDAD} />
        </>
    );
}
