"use client";

import { useEffect } from "react";

/**
 * Quita la clase `reveal-pending` del <html> cuando React ya ha montado.
 *
 * El CSS oculta `[data-reveal]` mientras esa clase está puesta, para que el
 * contenido no aparezca y desaparezca en el primer pintado. Se coloca como
 * último hijo de <body> para que sus efectos corran después que los de cada
 * `<Reveal>`: así, cuando la clase desaparece, GSAP ya aplicó el estado
 * inicial de cada animación y no hay destello.
 */
export default function RevealReady() {
    useEffect(() => {
        document.documentElement.classList.remove("reveal-pending");
    }, []);

    return null;
}