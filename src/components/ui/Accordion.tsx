"use client";

import { useId, useState } from "react";

import type { I18nText } from "@/data/types";
import { useLang } from "@/components/layout/LanguageProvider";

export type AccordionItem = {
    /** Título ya traducible. */
    question: string;
    /** Respuesta bilingüe. */
    answer: I18nText;
};

/**
 * Acordeón de preguntas frecuentes.
 * Abre y cierra un panel a la vez; la altura se anima con grid-rows para
 * no depender de JS para medir alturas.
 */
export function Accordion({ items }: { items: AccordionItem[] }) {
    const { pick } = useLang();
    const [open, setOpen] = useState<number | null>(null);
    const id = useId();

    return (
        <div className="space-y-4">
            {items.map((item, i) => {
                const isOpen = open === i;
                const panelId = `${id}-panel-${i}`;
                const buttonId = `${id}-button-${i}`;

                return (
                    <div
                        key={item.question}
                        className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                    >
                        <button
                            id={buttonId}
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            onClick={() => setOpen(isOpen ? null : i)}
                            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-medium transition-colors hover:text-brand"
                        >
                            {item.question}
                            <span
                                className={`shrink-0 text-2xl font-light text-brand transition-transform duration-300 ${
                                    isOpen ? "rotate-45" : ""
                                }`}
                                aria-hidden="true"
                            >
                                +
                            </span>
                        </button>
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            className={`grid transition-all duration-300 ${
                                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                            }`}
                        >
                            <div className="overflow-hidden">
                                <p className="px-6 pb-5 text-gray-600">{pick(item.answer)}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
