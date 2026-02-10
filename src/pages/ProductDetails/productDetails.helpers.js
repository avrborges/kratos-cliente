// Convertir número a ARS
export const currencyAR = (n) =>
    typeof n === "number"
        ? n.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
        })
        : null;

// Calcular si hay descuento
export const computeOfferPrice = (item) => {
    if (!item) return 0;

    const originalPrice = Number(item.price) || 0;

    if (Number(item.offerprice)) return Number(item.offerprice);

    if (Number(item.discount) > 0) {
        return originalPrice * (1 - Number(item.discount) / 100);
    }

    return originalPrice;
};

// Stock helpers
export const isOutOfStock = (item) =>
    Number(item?.stock) === 0;

export const isLowStock = (item) =>
    Number(item?.stock) > 0 && Number(item?.stock) <= 5;

// Wishlist helpers
export const isItemInWishlist = (wishlist, item) =>
    Array.isArray(wishlist) &&
    !!item &&
    wishlist.some((w) => w.id === item.id);

// Crear objeto para agregar carrito
export const buildCartItem = (item, offerPrice, selectedSize, selectedColor, quantity) => ({
    id: item.id,
    name: item.name,
    price: offerPrice,
    image: item?.images?.[0],
    size: selectedSize,
    color: selectedColor,
    quantity,
});