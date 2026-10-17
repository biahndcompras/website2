"use client";

import { useEffect, useRef, type ReactNode } from "react";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLang } from "@/components/layout/LanguageProvider";

let registered = false;

/**
 * Provee scroll suave con Lenis sincronizado con GSAP ScrollTrigger.
 *
 * Expone además un aviso de "scroll bloqueado" para que el modal de
 * postulación detenga el desplazamiento sin pelearse con Lenis.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const { lang } = useLang();

    useEffect(() => {
        if (!registered) {
            gsap.registerPlugin(ScrollTrigger);
            registered = true;
        }

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
        });
        lenisRef.current = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        // La función se guarda para poder quitar exactamente la misma referencia
        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0, 0);

        const onLock = (e: Event) => {
            const locked = (e as CustomEvent<{ locked: boolean }>).detail?.locked;
            if (locked) lenis.stop();
            else lenis.start();
        };
        window.addEventListener("bia:scrolllock", onLock);

        return () => {
            window.removeEventListener("bia:scrolllock", onLock);
            gsap.ticker.remove(raf);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Cambiar de idioma modifica el ancho del texto: hay que recalcular
    // dónde caen los disparadores de las animaciones.
    useEffect(() => {
        const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
        return () => window.clearTimeout(id);
    }, [lang]);

    return <>{children}</>;
}
