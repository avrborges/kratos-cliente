// src/hooks/useFiltersUrlSync.js
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const FILTER_DEFAULTS = {
    categories: [],        // string[]
    stock: [],             // string[] (ids del filtro de stock)
    sizes: [],             // string[]
    colors: [],            // string[] (hex con #)
    price: [100, 50000],   // [min, max]
    minRating: 0,          // number 0..5
};

const CSV = {
    parse: (s) => (s ? s.split(",").filter(Boolean) : []),
    stringify: (arr) => (arr && arr.length ? arr.join(",") : ""),
};

const encodeColor = (hex) => hex?.replace(/^#/, "%23");
const decodeColor = (hex) => hex?.replace(/^%23/, "#");

function parseFromUrl(params, defaults) {
    const categories = CSV.parse(params.get("cat"));
    const stock = CSV.parse(params.get("stock"));
    const sizes = CSV.parse(params.get("sizes"));
    const colorsRaw = CSV.parse(params.get("colors"));
    const colors = colorsRaw.map(decodeColor);

    const priceStr = params.get("price");
    let price = defaults.price;
    if (priceStr && priceStr.includes("-")) {
        const [a, b] = priceStr.split("-").map(Number);
        if (Number.isFinite(a) && Number.isFinite(b)) price = [a, b];
    }

    const minRating = Number(params.get("minRating")) || 0;

    return { categories, stock, sizes, colors, price, minRating };
}

function writeToUrl(params, filters, defaults) {
    const setOrDel = (key, val) => {
        if (val == null || val === "" || (Array.isArray(val) && val.length === 0)) {
            params.delete(key);
        } else {
            params.set(key, val);
        }
    };

    setOrDel("cat", CSV.stringify(filters.categories));
    setOrDel("stock", CSV.stringify(filters.stock));
    setOrDel("sizes", CSV.stringify(filters.sizes));
    setOrDel("colors", CSV.stringify(filters.colors.map(encodeColor)));

    const [minP, maxP] = filters.price || defaults.price;
    setOrDel("price", `${Number(minP) || defaults.price[0]}-${Number(maxP) || defaults.price[1]}`);

    setOrDel("minRating", filters.minRating ? String(filters.minRating) : "");
}

export function useFiltersUrlSync(defaults = FILTER_DEFAULTS) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState(() => parseFromUrl(searchParams, defaults));

    // Si la URL cambia (atrás/adelante), actualizar estado
    useEffect(() => {
        setFilters(parseFromUrl(searchParams, defaults));
    }, [searchParams, defaults]);

    // Setter que actualiza estado + URL y resetea page=1
    const updateFilters = useCallback(
        (next) => {
            setFilters((prev) => {
                const nextVal = typeof next === "function" ? next(prev) : next;
                const params = new URLSearchParams(searchParams);
                writeToUrl(params, nextVal, defaults);
                params.set("page", "1"); // resetea página
                setSearchParams(params); // push
                return nextVal;
            });
        },
        [searchParams, setSearchParams, defaults]
    );

    return { filters, setFilters: updateFilters };
}