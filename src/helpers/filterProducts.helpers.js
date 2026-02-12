// helpers/filterProducts.js
export function filterProducts(items, filters) {
    return items.filter((item) => {
        // 1️⃣ Categorías
        if (
            filters.categories.length > 0 &&
            !filters.categories.includes(item.category)
        ) {
            return false;
        }

        // 2️⃣ Talles
        if (filters.sizes.length > 0) {
            const matchesSize = filters.sizes.some((size) =>
                item.size.includes(size)
            );
            if (!matchesSize) return false;
        }

        // 3️⃣ Colores
        if (filters.colors.length > 0) {
            const itemColors = item.colors.map((c) => c.hex);
            const matchesColor = filters.colors.some((color) =>
                itemColors.includes(color)
            );
            if (!matchesColor) return false;
        }

        // 4️⃣ Rating (X estrellas o más)
        if (filters.rating && item.rating < filters.rating) {
            return false;
        }

        // 5️⃣ Precio
        const price = item.offerprice ?? item.price;
        if (price < filters.price[0] || price > filters.price[1]) {
            return false;
        }

        // ✅ Si pasa todos los filtros
        return true;
    });
}