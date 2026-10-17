"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useApply } from "./ApplyProvider";
import { useLang } from "@/components/layout/LanguageProvider";
import { JOBS } from "@/data/jobs";
import type { CopyKey } from "@/data/copy";

const MAX_CV_BYTES = 5 * 1024 * 1024;

type Errors = Partial<Record<"nombre" | "email" | "vacante", boolean>>;

export default function ApplyModal() {
    const { jobId, close } = useApply();
    const { t, pick } = useLang();

    const panelRef = useRef<HTMLDivElement>(null);
    const returnFocus = useRef<HTMLElement | null>(null);

    const [file, setFile] = useState<File | null>(null);
    const [cvError, setCvError] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const [sent, setSent] = useState(false);

    const job = JOBS.find((j) => j.id === jobId) ?? null;
    const open = jobId !== null;

    /* --- Cerrar siempre empieza de cero: el reinicio va en el evento,
           no en un efecto, para no provocar un render en cascada --- */
    const dismiss = useCallback(() => {
        setFile(null);
        setCvError(false);
        setErrors({});
        setSent(false);
        close();
    }, [close]);

    /* --- Escape para cerrar y foco atrapado dentro del modal --- */
    useEffect(() => {
        if (!open) return;

        returnFocus.current = document.activeElement as HTMLElement;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                dismiss();
                return;
            }
            if (e.key !== "Tab") return;

            const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
            );
            if (!focusables?.length) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", onKey);
        const focusTimer = window.setTimeout(
            () =>
                panelRef.current
                    ?.querySelector<HTMLElement>("#apply-nombre")
                    ?.focus(),
            80,
        );

        return () => {
            document.removeEventListener("keydown", onKey);
            window.clearTimeout(focusTimer);
            returnFocus.current?.focus();
        };
    }, [open, dismiss]);


    function acceptFile(candidate: File | undefined) {
        if (!candidate) return;
        const validType =
            candidate.type === "application/pdf" || /\.pdf$/i.test(candidate.name);
        if (!validType || candidate.size > MAX_CV_BYTES) {
            setFile(null);
            setCvError(true);
            return;
        }
        setFile(candidate);
        setCvError(false);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const nombre = String(form.get("nombre") ?? "").trim();
        const email = String(form.get("email") ?? "").trim();
        const vacante = String(form.get("vacante") ?? "").trim();

        const next: Errors = {
            nombre: !nombre,
            email: email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            vacante: !vacante,
        };
        setErrors(next);
        if (next.nombre || next.email || next.vacante) return;

        // Punto de integración con el backend de selección.
        console.info("[bia] Postulación lista para enviar:", {
            nombre,
            email,
            telefono: form.get("telefono"),
            ciudad: form.get("ciudad"),
            vacante,
            cv: file?.name ?? null,
        });

        setSent(true);
    }

    const labels: Record<string, CopyKey> = {
        nombre: "modal.nombre",
        email: "modal.email",
        telefono: "modal.telefono",
        ciudad: "modal.ciudad",
        vacante: "modal.vacante",
        cv: "modal.cv",
    };

    return (
        <div
            className={`fixed inset-0 z-90 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm transition-opacity duration-300 ${
                open ? "visible opacity-100" : "invisible opacity-0"
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-modal-title"
            onClick={(e) => e.target === e.currentTarget && dismiss()}
        >
            <div
                ref={panelRef}
                className={`max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl transition-transform duration-300 ${
                    open ? "translate-y-0 scale-100" : "translate-y-6 scale-[0.98]"
                }`}
            >
                {sent ? (
                    <div className="px-10 py-14 text-center xs:px-14">
                        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-brand-light text-brand">
                            <svg
                                className="h-8 w-8"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="mb-3 text-2xl font-medium xs:text-3xl">
                            {t("modal.exito")}
                        </h3>
                        <p className="mx-auto mb-8 max-w-sm text-gray-500">
                            {t("modal.exitoDesc")}
                        </p>
                        <button
                            type="button"
                            onClick={dismiss}
                            className="rounded-full bg-dark px-8 py-4 font-semibold text-white transition-colors hover:bg-brand"
                        >
                            {t("modal.cerrar")}
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-[2rem] border-b border-gray-100 bg-white p-6 xs:p-8">
                            <div>
                                <p className="kicker mb-2">{t("vacantes.kicker")}</p>
                                <h2
                                    id="apply-modal-title"
                                    className="text-2xl font-medium tracking-tight xs:text-3xl"
                                >
                                    <span className="text-gray-500">{t("modal.titulo")} </span>
                                    <span className="text-brand">
                                        {job ? pick(job.title) : "—"}
                                    </span>
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={dismiss}
                                aria-label={t("modal.cerrar")}
                                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 p-6 xs:p-8" noValidate>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <FieldLabel id="apply-nombre" label={labels.nombre} required />
                                    <input
                                        className="field"
                                        type="text"
                                        id="apply-nombre"
                                        name="nombre"
                                        autoComplete="name"
                                        placeholder={t("modal.nombrePh")}
                                        aria-invalid={!!errors.nombre}
                                    />
                                    <FieldError show={!!errors.nombre} />
                                </div>

                                <div>
                                    <FieldLabel id="apply-email" label={labels.email} />
                                    <input
                                        className="field"
                                        type="email"
                                        id="apply-email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder={t("modal.emailPh")}
                                        aria-invalid={!!errors.email}
                                    />
                                    <FieldError show={!!errors.email} />
                                </div>

                                <div>
                                    <FieldLabel id="apply-telefono" label={labels.telefono} />
                                    <input
                                        className="field"
                                        type="tel"
                                        id="apply-telefono"
                                        name="telefono"
                                        autoComplete="tel"
                                        placeholder={t("modal.telefonoPh")}
                                    />
                                </div>

                                <div>
                                    <FieldLabel id="apply-ciudad" label={labels.ciudad} />
                                    <input
                                        className="field"
                                        type="text"
                                        id="apply-ciudad"
                                        name="ciudad"
                                        placeholder={t("modal.ciudadPh")}
                                    />
                                </div>

                                <div>
                                    <FieldLabel id="apply-vacante" label={labels.vacante} required />
                                    {/* La key remonta el campo al cambiar de
                                        vacante: así el valor preseleccionado
                                        siempre corresponde a la tarjeta pulsada. */}
                                    <select
                                        key={jobId ?? "sin-vacante"}
                                        className="field"
                                        id="apply-vacante"
                                        name="vacante"
                                        defaultValue={jobId ?? ""}
                                        aria-invalid={!!errors.vacante}
                                    >
                                        <option value="">{t("modal.vacantePh")}</option>
                                        {JOBS.map((j) => (
                                            <option key={j.id} value={j.id}>
                                                {pick(j.title)}
                                            </option>
                                        ))}
                                    </select>
                                    <FieldError show={!!errors.vacante} />
                                </div>
                            </div>

                            {/* Currículum */}
                            <div>
                                <span className="mb-2 block text-sm font-medium text-gray-700">
                                    {t(labels.cv)}
                                </span>
                                <label
                                    htmlFor="apply-cv"
                                    className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed px-6 py-8 text-center transition-colors ${
                                        file
                                            ? "border-solid border-brand bg-brand-light"
                                            : cvError
                                              ? "border-red-300 bg-red-50"
                                              : "border-gray-300 bg-surface hover:border-brand hover:bg-brand-light"
                                    }`}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        acceptFile(e.dataTransfer.files?.[0]);
                                    }}
                                >
                                    <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-light text-brand">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 16V4m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                                            />
                                        </svg>
                                    </span>

                                    {file ? (
                                        <span className="text-sm font-semibold text-brand">
                                            {t("modal.cvListo")} · {file.name} ·{" "}
                                            {(file.size / 1024 / 1024).toFixed(1)} MB
                                        </span>
                                    ) : (
                                        <span className="text-sm text-gray-600">
                                            {t("modal.cvPh")}
                                        </span>
                                    )}

                                    {cvError && (
                                        <span className="text-sm text-red-600">
                                            {t("modal.cvError")}
                                        </span>
                                    )}

                                    <input
                                        type="file"
                                        id="apply-cv"
                                        name="cv"
                                        accept="application/pdf,.pdf"
                                        className="sr-only"
                                        onChange={(e) => acceptFile(e.target.files?.[0])}
                                    />
                                </label>
                            </div>

                            <p className="text-xs leading-relaxed text-gray-400">
                                {t("modal.aviso")}{" "}
                                <a
                                    href="/privacidad"
                                    className="underline transition-colors hover:text-brand"
                                >
                                    {t("footer.privacidad")}
                                </a>
                                .
                            </p>

                            <div className="flex flex-col gap-3 pt-2 xs:flex-row-reverse">
                                <button
                                    type="submit"
                                    className="btn inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 font-semibold text-white shadow-lg shadow-brand/30 hover:bg-brand-dark xs:flex-1"
                                >
                                    {t("modal.enviar")}
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            d="M14 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={dismiss}
                                    className="rounded-full bg-gray-100 px-6 py-4 font-semibold text-gray-700 transition-colors hover:bg-gray-200 xs:flex-1"
                                >
                                    {t("modal.cancelar")}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

function FieldLabel({ id, label, required }: { id: string; label: CopyKey; required?: boolean }) {
    const { t } = useLang();
    return (
        <label
            htmlFor={id}
            className="mb-2 block text-sm font-medium text-gray-700"
        >
            {t(label)}
            {required && <span aria-hidden="true"> *</span>}
        </label>
    );
}

function FieldError({ show }: { show: boolean }) {
    const { t } = useLang();
    if (!show) return null;
    return (
        <p role="alert" className="mt-1.5 text-xs text-red-600">
            {t("modal.requerido")}
        </p>
    );
}
