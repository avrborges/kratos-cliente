// Normaliza strings: sin acentos, trim, lower
export const normalize = (str) =>
    String(str || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();

// Filtrar items por categoría o "Ofertas"
export const filterByCategory = (items, categoryName) => {
    if (categoryName === "Todos") return items;

    const key = normalize(categoryName);

    if (key === "ofertas") {
        return items.filter((item) => Number(item.discount) > 0);
    }

    return items.filter((item) => normalize(item.category) === key);
};

// Top 5 más vendidos
export const getTop5BestSellers = (items) => {
    return [...items]
        .sort((a, b) => {
            if (b.totalSales !== a.totalSales) return b.totalSales - a.totalSales;
            return new Date(b.createdAt) - new Date(a.createdAt);
        })
        .filter((item) => Number(item.stock) > 0)
        .slice(0, 5);
};

// Top 5 nuevos ingresos
export const getTop5NewItems = (items) => {
    return [...items]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .filter((item) => Number(item.stock) > 0)
        .slice(0, 5);
};

// Top 5 destacados
export const getTop5Featured = (items) => {
    return [...items]
        .filter((item) => item.featured === true && Number(item.stock) > 0)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
};

// Top 5 últimos disponibles
export const getTop5LastAvailable = (items) => {
    return [...items]
        .filter((item) => Number(item.stock) <= 5 && Number(item.stock) > 0)
        .sort((a, b) => a.stock - b.stock)
        .slice(0, 5);
};