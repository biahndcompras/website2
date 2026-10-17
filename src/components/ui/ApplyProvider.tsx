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

type ApplyContextValue = {
    /** Vacante seleccionada, o null si el modal está cerrado. */
    jobId: string | null;
    open: (jobId: string) => void;
    close: () => void;
};

const ApplyContext = createContext<ApplyContextValue | null>(null);

/**
 * Estado del modal de postulación, compartido por toda la página.
 * Cualquier botón con `data-apply-job` puede abrirlo.
 */
export function ApplyProvider({ children }: { children: ReactNode }) {
    const [jobId, setJobId] = useState<string | null>(null);

    const open = useCallback((id: string) => setJobId(id), []);
    const close = useCallback(() => setJobId(null), []);

    // El scroll suave debe detenerse mientras el modal esté abierto
    useEffect(() => {
        if (typeof window === "undefined") return;
        window.dispatchEvent(
            new CustomEvent("bia:scrolllock", { detail: { locked: jobId !== null } }),
        );
    }, [jobId]);

    const value = useMemo(() => ({ jobId, open, close }), [jobId, open, close]);

    return <ApplyContext.Provider value={value}>{children}</ApplyContext.Provider>;
}

export function useApply(): ApplyContextValue {
    const ctx = useContext(ApplyContext);
    if (!ctx) throw new Error("useApply debe usarse dentro de <ApplyProvider>");
    return ctx;
}
