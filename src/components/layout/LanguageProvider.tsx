"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import { COPY, type CopyKey } from "@/data/copy";
import type { I18nText, Lang } from "@/data/types";

const STORAGE_KEY = "bia-lang";
const DEFAULT_LANG: Lang = "es";

type LangContextValue = {
    lang: Lang;
    setLang: (lang: Lang) => void;
    /** Traduce una clave del diccionario. Si falta, cae al español. */
    t: (key: CopyKey) => string;
    /** Elige el idioma disponible de un texto bilingüe de los datos. */
    pick: (text: I18nText) => string;
    /** Igual que `pick`, pero para listas bilingües (notas de cata, canales…). */
    pickList: (list: Record<Lang, string[]>) => string[];
};

const LangContext = createContext<LangContextValue | null>(null);

/** Lee la preferencia guardada. En el servidor siempre es español. */
function readStoredLang(): Lang {
    if (typeof window === "undefined") return DEFAULT_LANG;
    try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        return saved === "es" || saved === "en" ? saved : DEFAULT_LANG;
    } catch {
        // Almacenamiento no disponible: se queda en español.
        return DEFAULT_LANG;
    }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    // Se lee al inicializar el estado, no en un efecto: el servidor pinta
    // español y el cliente lo corrige en su primer render, sin parpadeo doble.
    const [lang, setLangState] = useState<Lang>(readStoredLang);

    const setLang = useCallback((next: Lang) => {
        setLangState(next);
        try {
            window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
            /* sin persistencia */
        }
    }, []);

    const value = useMemo<LangContextValue>(
        () => ({
            lang,
            setLang,
            t: (key) => COPY[lang][key] ?? COPY.es[key] ?? key,
            pick: (text) => text?.[lang] ?? text?.es ?? "",
            pickList: (list) => list?.[lang] ?? list?.es ?? [],
        }),
        [lang, setLang],
    );

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
    const ctx = useContext(LangContext);
    if (!ctx) throw new Error("useLang debe usarse dentro de <LanguageProvider>");
    return ctx;
}
