// src/pages/Wishlist/wishlist.helpers.js

// Formatear moneda ARS
export const formatCurrency = (value) =>
    typeof value === "number"
        ? new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0,
        }).format(value)
        : "";

/**
 * Devuelve un objeto consistente para el thumbnail o null.
 * Estructura: { src: string, alt: string }
 */
export const getThumbnail = (item) => {
    const src =
        Array.isArray(item?.images) && item.images.length > 0
            ? item.images[0]
            : null;

    if (!src) return null;

    return {
        src,
        alt: item?.name || "Producto",
    };
};

// Obtener info de precios (con oferta integrada)
export const getPriceInfo = (item) => {
    const price = Number(item?.price) || 0;
    const offer = Number(item?.offerprice) > 0 ? Number(item.offerprice) : null;
    return { price, offer };
};