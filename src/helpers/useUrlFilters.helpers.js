import { useMemo, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

/* ======================================================
   Helpers chicos (no te preocupes, son utilitarios)
====================================================== */
const splitCsv = (value) =>
    String(value || "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

const joinCsv = (arr) => (arr?.length ? arr.join(",") : "");

const toNumber = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
};

/* ======================================================
   useUrlFilters (EL HELPER)
====================================================== */
export function useUrlFilters({ defaults, schema }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState(defaults);
    const [hasInitializedFromURL, setHasInitializedFromURL] = useState(false);

    /* ---------- updateURL reutilizable ---------- */
    const updateURL = useCallback(
        (changes) => {
            setSearchParams((prev) => {
                const params = new URLSearchParams(prev);

                Object.entries(changes).forEach(([key, value]) => {
                    if (value === null || value === undefined || value === "") {
                        params.delete(key);
                    } else {
                        params.set(key, String(value));
                    }
                });

                return params;
            });
        },
        [setSearchParams]
    );

    /* ======================================================
       1) LEER filtros desde la URL
    ====================================================== */
    const urlFilters = useMemo(() => {
        const result = { ...defaults };

        Object.entries(schema).forEach(([filterKey, cfg]) => {
            const { param, type, fallbackParam } = cfg;

            const raw =
                searchParams.get(param) ??
                (fallbackParam ? searchParams.get(fallbackParam) : null);

            if (!raw) return;

            if (type === "csv") result[filterKey] = splitCsv(raw);
            if (type === "number") result[filterKey] = toNumber(raw);
            if (type === "range") {
                const [a, b] = raw.split("-");
                const min = toNumber(a);
                const max = toNumber(b);
                if (min !== null && max !== null) result[filterKey] = [min, max];
            }
        });

        return result;
    }, [searchParams, defaults, schema]);

    /* ======================================================
       2) HIDRATAR filtros desde URL (una sola vez)
    ====================================================== */
    useEffect(() => {
        setFilters((prev) => {
            let changed = false;
            const next = { ...prev };

            Object.keys(schema).forEach((k) => {
                const a = prev[k];
                const b = urlFilters[k];

                const same = Array.isArray(a)
                    ? Array.isArray(b) &&
                    a.length === b.length &&
                    a.every((x, i) => x === b[i])
                    : a === b;

                if (!same) {
                    next[k] = b;
                    changed = true;
                }
            });

            return changed ? next : prev;
        });

        setHasInitializedFromURL(true);
    }, [urlFilters, schema]);

    /* ======================================================
       3) SYNC filtros → URL (DESPUÉS de inicializar)
    ====================================================== */
    useEffect(() => {
        if (!hasInitializedFromURL) return;

        const changes = {};

        Object.entries(schema).forEach(([filterKey, cfg]) => {
            const { param, type, fallbackParam } = cfg;
            const value = filters[filterKey];

            if (fallbackParam) changes[fallbackParam] = null;

            if (type === "csv") changes[param] = joinCsv(value) || null;
            if (type === "number") changes[param] = value ?? null;
            if (type === "range")
                changes[param] = value ? `${value[0]}-${value[1]}` : null;
        });

        updateURL(changes);
    }, [filters, hasInitializedFromURL, schema, updateURL]);

    return {
        filters,
        setFilters,
        updateURL,
        hasInitializedFromURL,
        searchParams
    };
}