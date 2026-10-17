import FooterClient from "./FooterClient";

/**
 * El año se resuelve en el servidor y se cachea: así las páginas siguen
 * siendo estáticas en Vercel y el valor no cambia entre renders.
 */
async function getBuildYear() {
    "use cache";
    return new Date().getFullYear();
}

export default async function Footer() {
    const year = await getBuildYear();
    return <FooterClient year={year} />;
}