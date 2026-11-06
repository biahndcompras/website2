import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { TeamGallery } from "@/components/sections/TeamGallery";
import { HomeBody } from "@/components/pages/HomeBody";

export default function Home() {
    return (
        <>
            <Navbar current="inicio" />

            <main id="main">
                <HeroVideo />
                <HomeBody />
                <TeamGallery />
            </main>

            <Footer />
        </>
    );
}
