"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type From = "left" | "right" | "up" | "down" | "scale" | "none";

// Se registra al importar el módulo, no dentro de un efecto: así ninguna
// animación depende del orden de montaje y con "movimiento reducido" (donde
// SmoothScroll no inicializa nada) el plugin sigue disponible.
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const OFFSETS: Record<From, gsap.TweenVars> = {
    up: { y: 34 },
    left: { x: -40 },
    right: { x: 40 },
    down: { y: -28 },
    scale: { scale: 0.94 },
    none: {},
};

type RevealProps = {
    children: ReactNode;
    /** Dirección de la entrada. */
    from?: From;
    /** Retraso en segundos. */
    delay?: number;
    /** Punto de disparo de ScrollTrigger. */
    start?: string;
    as?: ElementType;
    className?: string;
};

/**
 * Entrada individual al llegar a pantalla.
 * No oculta nada por sí mismo: si el JS no monta, el contenido se ve igual.
 */
export function Reveal({
    children,
    from = "up",
    delay = 0,
    start = "top 86%",
    as: Tag = "div",
    className,
}: RevealProps) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                { opacity: 0, ...OFFSETS[from] },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.85,
                    delay,
                    ease: "power3.out",
                    scrollTrigger: { trigger: el, start, once: true },
                },
            );
        }, el);

        return () => ctx.revert();
    }, [from, delay, start]);

    return (
        <Tag ref={ref} className={className} data-reveal="">
            {children}
        </Tag>
    );
}

type RevealGroupProps = {
    children: ReactNode;
    /** Escalonado de los hijos en segundos. */
    stagger?: number;
    start?: string;
    as?: ElementType;
    className?: string;
};

/** Entrada escalonada de los hijos directos. */
export function RevealGroup({
    children,
    stagger = 0.09,
    start = "top 84%",
    as: Tag = "div",
    className,
}: RevealGroupProps) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                Array.from(el.children),
                { opacity: 0, y: 34 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    stagger,
                    scrollTrigger: { trigger: el, start, once: true },
                },
            );
        }, el);

        return () => ctx.revert();
    }, [stagger, start]);

    return (
        <Tag ref={ref} className={className} data-reveal-group="">
            {children}
        </Tag>
    );
}

/** Revelado progresivo: cada hijo tiene su propio disparador. */
export function RevealSequence({
    children,
    start = "top 78%",
    as: Tag = "div",
    className,
}: {
    children: ReactNode;
    start?: string;
    as?: ElementType;
    className?: string;
}) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const items = Array.from(el.children) as HTMLElement[];

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = gsap.context(() => {
            items.forEach((item) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, x: -40 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.75,
                        ease: "power3.out",
                        scrollTrigger: { trigger: item, start, once: true },
                    },
                );
            });
        }, el);

        return () => ctx.revert();
    }, [start]);

    return (
        <Tag ref={ref} className={className} data-reveal-group="">
            {children}
        </Tag>
    );
}

export { ScrollTrigger };
