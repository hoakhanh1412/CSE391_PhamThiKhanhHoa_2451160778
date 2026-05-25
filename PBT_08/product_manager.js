const products = [
    { id: 1,  name: "iPhone 16",   price: 25990000, category: "phone",     stock: 15,  rating: 4.5 },
    { id: 2,  name: "MacBook Pro",  price: 45990000, category: "laptop",    stock: 8,   rating: 4.8 },
    { id: 3,  name: "AirPods Pro",  price: 6990000,  category: "accessory", stock: 50,  rating: 4.3 },
    { id: 4,  name: "iPad Air",     price: 16990000, category: "tablet",    stock: 0,   rating: 4.6 },
    { id: 5,  name: "Samsung S24",  price: 22990000, category: "phone",     stock: 20,  rating: 4.4 },
    { id: 6,  name: "Dell XPS 15",  price: 35990000, category: "laptop",    stock: 5,   rating: 4.7 },
    { id: 7,  name: "Galaxy Buds",  price: 3490000,  category: "accessory", stock: 100, rating: 4.1 },
    { id: 8,  name: "Xiaomi Pad 6", price: 7990000,  category: "tablet",    stock: 25,  rating: 4.2 },
    { id: 9,  name: "Pixel 9",      price: 19990000, category: "phone",     stock: 12,  rating: 4.6 },
    { id: 10, name: "ThinkPad X1",  price: 32990000, category: "laptop",    stock: 3,   rating: 4.5 },
];

// ─────────────────────────────────────────────────────────────────────────────
// 1. Lọc sản phẩm còn hàng (stock > 0)
// ─────────────────────────────────────────────────────────────────────────────
function getInStock(products) {
    return products.filter(p => p.stock > 0);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Lọc theo category VÀ khoảng giá [minPrice, maxPrice]
// ─────────────────────────────────────────────────────────────────────────────
function filterProducts(products, category, minPrice, maxPrice) {
    return products.filter(
        p => p.category === category &&
             p.price >= minPrice &&
             p.price <= maxPrice
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Sắp xếp theo giá tăng dần ("asc") hoặc giảm dần ("desc")
//    Không mutate mảng gốc — dùng spread trước khi sort
// ─────────────────────────────────────────────────────────────────────────────
function sortByPrice(products, order = "asc") {
    return [...products].sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Tìm sản phẩm rẻ nhất mỗi category
//    → { phone: {...}, laptop: {...}, tablet: {...}, accessory: {...} }
// ─────────────────────────────────────────────────────────────────────────────
function cheapestByCategory(products) {
    // reduce tích lũy dần một object, key = category, value = sản phẩm rẻ nhất
    return products.reduce((acc, p) => {
        const current = acc[p.category];
        if (!current || p.price < current.price) {
            acc[p.category] = p;
        }
        return acc;
    }, {});
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Tính tổng giá trị kho: Σ (price × stock) của tất cả sản phẩm
// ─────────────────────────────────────────────────────────────────────────────
function totalInventoryValue(products) {
    return products.reduce((total, p) => total + p.price * p.stock, 0);
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Tạo mảng chỉ chứa { name, formattedPrice }
//    formattedPrice dạng "25.990.000đ" (dùng toLocaleString với locale "vi-VN")
// ─────────────────────────────────────────────────────────────────────────────
function formatProductList(products) {
    return products.map(p => ({
        name: p.name,
        formattedPrice: p.price.toLocaleString("vi-VN") + "đ",
    }));
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Tính rating trung bình toàn bộ danh sách (làm tròn 2 chữ số thập phân)
// ─────────────────────────────────────────────────────────────────────────────
function averageRating(products) {
    const total = products.reduce((sum, p) => sum + p.rating, 0);
    return Math.round((total / products.length) * 100) / 100;
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. Tìm sản phẩm theo keyword trong name (case-insensitive)
// ─────────────────────────────────────────────────────────────────────────────
function searchProducts(products, keyword) {
    const kw = keyword.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(kw));
}

// ═════════════════════════════════════════════════════════════════════════════
// TEST
// ═════════════════════════════════════════════════════════════════════════════

console.log("=== IN-STOCK PRODUCTS ===");
console.log(getInStock(products));

console.log("\n=== PHONES 15-25 TRIỆU ===");
console.log(filterProducts(products, "phone", 15_000_000, 25_000_000));

console.log("\n=== CHEAPEST BY CATEGORY ===");
console.log(cheapestByCategory(products));

console.log("\n=== TOTAL INVENTORY VALUE ===");
console.log(totalInventoryValue(products).toLocaleString("vi-VN") + "đ");

// ── Bonus tests để kiểm tra các hàm còn lại ─────────────────────────────────

console.log("\n=== SORT BY PRICE ASC ===");
console.log(sortByPrice(products, "asc").map(p => `${p.name}: ${p.price.toLocaleString("vi-VN")}đ`));

console.log("\n=== SORT BY PRICE DESC ===");
console.log(sortByPrice(products, "desc").map(p => `${p.name}: ${p.price.toLocaleString("vi-VN")}đ`));

console.log("\n=== FORMAT PRODUCT LIST ===");
console.log(formatProductList(products));

console.log("\n=== AVERAGE RATING ===");
console.log(averageRating(products));

console.log("\n=== SEARCH 'pro' ===");
console.log(searchProducts(products, "pro"));