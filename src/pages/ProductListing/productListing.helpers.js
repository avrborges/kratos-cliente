// --------------------------
// Helpers generales
// --------------------------
export const ITEMS_PER_PAGE = 10;

export const clamp = (n, min, max) =>
    Math.max(min, Math.min(n, max));


// --------------------------
// Función: ordenar items
// --------------------------
export function getSortedItems(items, sortBy) {
    const arr = [...items];

    const toNumber = (v) => (typeof v === "number" ? v : Number(v ?? 0));
    const getOffer = (it) => toNumber(it.offerprice);
    const getCreated = (it) => new Date(it.createdAt).getTime();

    switch (sortBy) {
        case "price-asc":
            arr.sort((a, b) => getOffer(a) - getOffer(b));
            break;
        case "price-desc":
            arr.sort((a, b) => getOffer(b) - getOffer(a));
            break;
        case "rating-desc":
            arr.sort((a, b) => toNumber(b.rating) - toNumber(a.rating));
            break;
        case "newest":
            arr.sort((a, b) => getCreated(b) - getCreated(a));
            break;
        default: // default: orden original
            arr.sort((a, b) => a.__originalIndex - b.__originalIndex);
    }

    return arr;
}


// --------------------------
// Paginación
// --------------------------
export function paginateItems(sortedItems, page, pageSize = ITEMS_PER_PAGE) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
        items: sortedItems.slice(start, end),
        start,
        end,
        totalItems: sortedItems.length,
        totalPages: Math.max(1, Math.ceil(sortedItems.length / pageSize)),
    };
}


// --------------------------
// Etiqueta de paginación
// --------------------------
export function getRangeLabel(start, end, totalItems) {
    if (totalItems === 0) return "0–0 de 0";
    return `${start + 1}–${Math.min(end, totalItems)} de ${totalItems}`;
}


// --------------------------
// Actualizar parámetros de URL
// --------------------------
export function updateURLParams(searchParams, setSearchParams, changes) {
    const next = new URLSearchParams(searchParams);

    if (changes.page !== undefined)
        next.set("page", String(changes.page));

    if (changes.sort !== undefined)
        next.set("sort", changes.sort);

    if (changes.view !== undefined)
        next.set("view", changes.view);

    setSearchParams(next);
}