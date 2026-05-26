// ============================================================
// Bài B3 — Higher-Order Functions Challenge
// ============================================================

// ─────────────────────────────────────────────
// 1. pipe() — Nối chuỗi functions
// ─────────────────────────────────────────────
function pipe(...fns) {
    return function (value) {
        return fns.reduce((acc, fn) => fn(acc), value);
    };
}

const process = pipe(
    x => x * 2,           // 5 → 10
    x => x + 10,          // 10 → 20
    x => x.toString(),    // 20 → "20"
    x => "Kết quả: " + x  // "20" → "Kết quả: 20"
);

console.log("=== pipe() ===");
console.log(process(5)); // → "Kết quả: 20"


// ─────────────────────────────────────────────
// 2. memoize() — Cache kết quả
// ─────────────────────────────────────────────
function memoize(fn) {
    const cache = new Map();

    return function (...args) {
        // Tạo cache key từ tất cả arguments (hỗ trợ nhiều tham số)
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key); // Trả về từ cache, không gọi lại fn
        }

        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("\n=== memoize() ===");
console.log(expensiveCalc(1000000)); // In "Đang tính..." → 499999500000
console.log(expensiveCalc(1000000)); // Không in "Đang tính..." → 499999500000 (từ cache)
console.log(expensiveCalc(500));     // In "Đang tính..." (lần đầu với n=500) → 124750
console.log(expensiveCalc(500));     // Không in "Đang tính..." → 124750 (từ cache)


// ─────────────────────────────────────────────
// 3. debounce() — Chờ user ngừng gõ mới thực hiện
// ─────────────────────────────────────────────
function debounce(fn, delay) {
    let timeoutId = null;

    return function (...args) {
        // Hủy timer cũ nếu đang chờ
        clearTimeout(timeoutId);

        // Đặt timer mới — chỉ chạy fn sau khi "im lặng" đủ `delay` ms
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
            timeoutId = null;
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

console.log("\n=== debounce() ===");
console.log("(Gọi search liên tục — chỉ lần cuối mới chạy sau 500ms)");
search("h");
search("he");
search("hel");
search("hell");
search("hello");
// → Chỉ in: "Searching: hello" (sau 500ms kể từ lần gọi cuối)


// ─────────────────────────────────────────────
// 4. retry() — Thử lại nếu lỗi
// ─────────────────────────────────────────────
async function retry(fn, maxAttempts = 3, delay = 0) {
    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            console.log(`  [Lần ${attempt}/${maxAttempts}] Đang thử...`);
            const result = await fn();
            console.log(`  ✓ Thành công ở lần ${attempt}`);
            return result;
        } catch (error) {
            lastError = error;
            console.log(`  ✗ Lần ${attempt} thất bại: ${error.message}`);

            // Nếu chưa hết lượt và có delay → chờ trước khi thử lại
            if (attempt < maxAttempts && delay > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    // Hết lượt thử → ném lỗi cuối cùng
    throw new Error(`Thất bại sau ${maxAttempts} lần thử. Lỗi cuối: ${lastError.message}`);
}

// ─── Demo retry() ───
console.log("\n=== retry() ===");

// Demo 1: Thành công ở lần thứ 3
let callCount = 0;
const unstableAPI = () => new Promise((resolve, reject) => {
    callCount++;
    if (callCount < 3) {
        reject(new Error("Server không phản hồi"));
    } else {
        resolve("Dữ liệu từ API");
    }
});

(async () => {
    console.log("--- Demo 1: Thành công ở lần thứ 3 ---");
    try {
        const data = await retry(unstableAPI, 3);
        console.log("  Kết quả:", data);
    } catch (err) {
        console.log("  Lỗi:", err.message);
    }

    // Demo 2: Thất bại hoàn toàn
    console.log("\n--- Demo 2: Thất bại hoàn toàn sau 3 lần ---");
    const alwaysFail = () => Promise.reject(new Error("Lỗi kết nối"));
    try {
        await retry(alwaysFail, 3);
    } catch (err) {
        console.log("  Lỗi cuối cùng:", err.message);
    }

    // Demo 3: Thành công ngay lần đầu
    console.log("\n--- Demo 3: Thành công ngay lần đầu ---");
    const alwaysOk = () => Promise.resolve(42);
    try {
        const result = await retry(alwaysOk, 3);
        console.log("  Kết quả:", result);
    } catch (err) {
        console.log("  Lỗi:", err.message);
    }
})();