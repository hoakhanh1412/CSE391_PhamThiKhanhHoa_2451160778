// ═══════════════════════════════════════════════════════════════════════════
// shopping_cart.js — Module Giỏ Hàng dùng Closure
// ═══════════════════════════════════════════════════════════════════════════

function createCart() {
    // ── Private state ────────────────────────────────────────────────────────
    let items = [];          // [{ product, quantity }]
    let discount = null;     // { code, type: "percent"|"flat", value }

    // ── Private helpers ──────────────────────────────────────────────────────

    // Tìm index của item trong giỏ theo productId
    function findIndex(productId) {
        return items.findIndex(item => item.product.id === productId);
    }

    // Format số tiền kiểu "25.990.000"
    function fmt(number) {
        return number.toLocaleString("vi-VN");
    }

    // Tính tổng trước giảm giá
    function calcSubtotal() {
        return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }

    // Tính số tiền được giảm (trả về 0 nếu chưa có discount)
    function calcDiscountAmount(subtotal) {
        if (!discount) return 0;
        if (discount.type === "percent") return Math.round(subtotal * discount.value / 100);
        if (discount.type === "flat")    return discount.value;
        return 0;
    }

    // In đường kẻ ngang theo độ rộng
    function line(char = "─", len = 62) {
        return char.repeat(len);
    }

    // Canh phải chuỗi trong ô có độ rộng w
    function padL(str, w) {
        return String(str).padStart(w);
    }

    // Canh trái chuỗi trong ô có độ rộng w
    function padR(str, w) {
        return String(str).padEnd(w);
    }

    // ── Public API ───────────────────────────────────────────────────────────
    return {

        // 1. Thêm sản phẩm — nếu đã có thì tăng quantity
        addItem(product, quantity = 1) {
            if (quantity <= 0) {
                console.warn(`addItem: quantity phải > 0`);
                return;
            }
            const idx = findIndex(product.id);
            if (idx !== -1) {
                items[idx].quantity += quantity;
            } else {
                items.push({ product, quantity });
            }
        },

        // 2. Xóa sản phẩm theo id
        removeItem(productId) {
            const idx = findIndex(productId);
            if (idx === -1) {
                console.warn(`removeItem: không tìm thấy sản phẩm id=${productId}`);
                return;
            }
            items.splice(idx, 1);
        },

        // 3. Cập nhật số lượng — nếu newQuantity = 0 thì xóa luôn
        updateQuantity(productId, newQuantity) {
            if (newQuantity < 0) {
                console.warn(`updateQuantity: quantity không được âm`);
                return;
            }
            if (newQuantity === 0) {
                this.removeItem(productId);
                return;
            }
            const idx = findIndex(productId);
            if (idx === -1) {
                console.warn(`updateQuantity: không tìm thấy sản phẩm id=${productId}`);
                return;
            }
            items[idx].quantity = newQuantity;
        },

        // 4. Tính tổng tiền (đã trừ discount nếu có)
        getTotal() {
            const subtotal = calcSubtotal();
            return subtotal - calcDiscountAmount(subtotal);
        },

        // 5. Áp dụng mã giảm giá
        //    SALE10   → giảm 10%
        //    SALE20   → giảm 20%
        //    FREESHIP → giảm phẳng 30.000đ
        applyDiscount(code) {
            const codes = {
                SALE10:   { type: "percent", value: 10 },
                SALE20:   { type: "percent", value: 20 },
                FREESHIP: { type: "flat",    value: 30000 },
            };
            if (!codes[code]) {
                console.warn(`applyDiscount: mã "${code}" không hợp lệ`);
                return;
            }
            discount = { code, ...codes[code] };
            console.log(`✓ Đã áp dụng mã ${code}`);
        },

        // 6. In giỏ hàng dạng bảng
        printCart() {
            const W = 62; // tổng độ rộng bảng (không tính 2 ký tự viền)

            const top    = `┌${line("─", W)}┐`;
            const mid    = `├${line("─", W)}┤`;
            const bot    = `└${line("─", W)}┘`;

            // Header
            const header =
                `│ ${"#".padEnd(2)} │ ${"Sản phẩm".padEnd(14)} │ ${"SL".padStart(2)} │ ${"Đơn giá".padStart(11)} │ ${"Tổng".padStart(12)} │`;

            console.log(top);
            console.log(header);

            // Rows
            items.forEach((item, i) => {
                const no       = padR(i + 1, 2);
                const name     = padR(item.product.name, 14);
                const qty      = padL(item.quantity, 2);
                const unit     = padL(fmt(item.product.price), 11);
                const rowTotal = padL(fmt(item.product.price * item.quantity), 12);
                console.log(`│ ${no} │ ${name} │ ${qty} │ ${unit} │ ${rowTotal} │`);
            });

            // Subtotal + discount rows
            const subtotal      = calcSubtotal();
            const discountAmt   = calcDiscountAmount(subtotal);
            const total         = subtotal - discountAmt;

            console.log(mid);

            if (discount && discountAmt > 0) {
                const discLabel = discount.type === "percent"
                    ? `Giảm giá (${discount.code} −${discount.value}%)`
                    : `Miễn phí ship (${discount.code})`;

                const discStr = `−${fmt(discountAmt)}đ`;
                const discLine = `│ ${padR(discLabel, W - discStr.length - 2)}${discStr} │`;
                console.log(discLine);
            }

            const totalStr  = `${fmt(total)}đ`;
            const totalLine = `│ ${padR("Tổng cộng:", W - totalStr.length - 2)}${totalStr} │`;
            console.log(totalLine);
            console.log(bot);
        },

        // 7. Lấy tổng số lượng sản phẩm (cộng tất cả quantity)
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        // 8. Xóa toàn bộ giỏ hàng và reset discount
        clearCart() {
            items    = [];
            discount = null;
            console.log("✓ Đã xóa toàn bộ giỏ hàng");
        },
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// TEST
// ═══════════════════════════════════════════════════════════════════════════

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16",  price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16",  price: 25990000 }, 1); // Tăng lên 2

console.log("\n📦 GIỎ HÀNG BAN ĐẦU");
cart.printCart();

cart.applyDiscount("SALE10");
console.log("\n🏷️  SAU KHI ÁP MÃ SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount()); // → 4

cart.removeItem(3);
console.log("Sau xóa AirPods:", cart.getItemCount()); // → 2

console.log("\n📦 SAU KHI XÓA AIRPODS");
cart.printCart();

// ── Bonus tests ──────────────────────────────────────────────────────────────
console.log("\n── updateQuantity iPhone → 5 ──");
cart.updateQuantity(1, 5);
cart.printCart();

console.log("\n── applyDiscount FREESHIP ──");
cart.applyDiscount("FREESHIP");
cart.printCart();

console.log("\n── applyDiscount mã sai ──");
cart.applyDiscount("HELLO99");

console.log("\n── clearCart ──");
cart.clearCart();
console.log("Số SP sau clear:", cart.getItemCount()); // → 0