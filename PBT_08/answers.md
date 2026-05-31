# ĐÁP ÁN — PHẦN A: KIỂM TRA ĐỌC HIỂU

---

## Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

### Ba cách viết hàm `tinhThueBaoHiem`

```javascript
// ─── 1. Function Declaration ───────────────────────────────────────────────
function tinhThueBaoHiem(luong) {
    const thue = luong > 11_000_000 ? luong * 0.10 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
}

// ─── 2. Function Expression ────────────────────────────────────────────────
const tinhThueBaoHiem2 = function(luong) {
    const thue = luong > 11_000_000 ? luong * 0.10 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};

// ─── 3. Arrow Function ─────────────────────────────────────────────────────
const tinhThueBaoHiem3 = (luong) => {
    const thue = luong > 11_000_000 ? luong * 0.10 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};
```

**Kiểm tra nhanh:**
```javascript
console.log(tinhThueBaoHiem(15_000_000));
// → { thue: 1500000, thuc_nhan: 13500000 }

console.log(tinhThueBaoHiem(10_000_000));
// → { thue: 0, thuc_nhan: 10000000 }
```

---

### Hoisting — Ba cách có khác nhau không?

> **Có, khác nhau rõ rệt.**

| Cách viết | Hoisting | Gọi trước khai báo? |
|---|---|---|
| Function Declaration | ✅ Hoisted hoàn toàn (cả tên lẫn body) | ✅ Được |
| Function Expression | ⚠️ Chỉ hoisted tên biến (`var`) hoặc không hoisted (`let/const`) | ❌ Không được |
| Arrow Function | ⚠️ Như Function Expression | ❌ Không được |

**Ví dụ minh hoạ:**

```javascript
// ✅ Function Declaration: GỌI TRƯỚC khai báo → hoạt động bình thường
console.log(khaiBao(5)); // → { thue: 0, thuc_nhan: 5000000 }

function khaiBao(luong) {
    const thue = luong > 11_000_000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
}
```

```javascript
// ❌ Function Expression với const: GỌI TRƯỚC → ReferenceError (Temporal Dead Zone)
console.log(bieuThuc(5)); // 💥 ReferenceError: Cannot access 'bieuThuc' before initialization

const bieuThuc = function(luong) {
    const thue = luong > 11_000_000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};
```

```javascript
// ❌ Arrow Function với const: tương tự Function Expression → ReferenceError
console.log(arrow(5)); // 💥 ReferenceError: Cannot access 'arrow' before initialization

const arrow = (luong) => {
    const thue = luong > 11_000_000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};
```

**Tóm lại:** Chỉ **Function Declaration** mới được hoisting hoàn toàn. Function Expression và Arrow Function bị ràng buộc bởi **Temporal Dead Zone** (TDZ) khi dùng `const`/`let` → không thể gọi trước khai báo.

---

## Câu A2 (5đ) — Scope & Closure

### Đoạn 1 — Dự đoán output

```javascript
const c = counter();
console.log(c.increment());  // → 1
console.log(c.increment());  // → 2
console.log(c.increment());  // → 3
console.log(c.decrement());  // → 2
console.log(c.getCount());   // → 2
```

**Giải thích:** Biến `count` được khai báo bên trong `counter()` và bị "đóng lại" (closure) bởi ba phương thức `increment`, `decrement`, `getCount`. Chúng cùng tham chiếu đến **một biến `count` duy nhất** trong bộ nhớ. Mỗi lần gọi `increment()` thì `count` tăng lên và trả về giá trị mới, `decrement()` thì giảm xuống. `counter()` trả về object, nhưng `count` không bị xóa vì ba hàm kia vẫn đang giữ tham chiếu đến nó.

---

### Đoạn 2 — Dự đoán output (sau 200ms)

```
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

> **Lưu ý thứ tự:** Ba dòng `var` chạy trước (timeout 100ms), ba dòng `let` chạy sau (timeout 200ms).

---

### Giải thích chi tiết `var` vs `let` trong vòng lặp `setTimeout`

**Trường hợp `var`:**

```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}
```

- `var` có **function scope** (hoặc global scope), không có block scope.
- Vòng lặp chạy xong, `i` đã tăng thành **3** và thoát điều kiện.
- Cả ba callback của `setTimeout` đều trỏ về **cùng một biến `i`** duy nhất trong bộ nhớ.
- Khi 100ms trôi qua, callback chạy → đọc `i` → lúc này `i = 3` → in ra `3` ba lần.

**Minh hoạ bộ nhớ:**
```
[bộ nhớ global/function]
  i = 0 → 1 → 2 → 3  (biến duy nhất)
  callback1 → tham chiếu đến i
  callback2 → tham chiếu đến i
  callback3 → tham chiếu đến i
→ Khi chạy: cả 3 đọc i = 3
```

---

**Trường hợp `let`:**

```javascript
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
```

- `let` có **block scope** — mỗi lần lặp tạo ra một **binding `j` riêng biệt**.
- Mỗi callback "đóng lại" (closure) trên **bản sao `j` của chính vòng lặp đó**.
- Khi 200ms trôi qua, callback 0 đọc `j = 0`, callback 1 đọc `j = 1`, callback 2 đọc `j = 2`.

**Minh hoạ bộ nhớ:**
```
[vòng lặp 1] j_0 = 0 → callback1 closure giữ j_0
[vòng lặp 2] j_1 = 1 → callback2 closure giữ j_1
[vòng lặp 3] j_2 = 2 → callback3 closure giữ j_2
→ Khi chạy: mỗi callback đọc j riêng → 0, 1, 2
```

**Cách fix `var` nếu muốn kết quả 0, 1, 2:**
```javascript
// Cách 1: Dùng let thay var
// Cách 2: Dùng IIFE để tạo scope mới
for (var i = 0; i < 3; i++) {
    ((capturedI) => {
        setTimeout(() => console.log("var:", capturedI), 100);
    })(i);
}
// → var: 0, var: 1, var: 2
```

---

## Câu A3 (5đ) — Array Methods

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn → [2, 4, 6, 8, 10]
const chan = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3 → [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
const nhan3 = nums.map(n => n * 3);

// 3. Tính tổng tất cả → 55
const tong = nums.reduce((acc, n) => acc + n, 0);

// 4. Tìm số đầu tiên > 7 → 8
const dauTien = nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không → false
const coSoLon = nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0 → true
const tatCaDuong = nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const moTa = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8. Đảo ngược mảng (không mutate gốc) → [10, 9, 8, ..., 1]
const daonguoc = [...nums].reverse();
```

**Giải thích câu 8:** `.reverse()` mutate mảng gốc, nên phải tạo bản sao trước bằng spread `[...nums]` rồi mới gọi `.reverse()` trên bản sao đó.

---

## Câu A4 (5đ) — Object Destructuring & Spread

### Dự đoán output từng dòng

```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

// ─── Destructuring ──────────────────────────────────────────────────────────
const { name, price, specs: { ram, color } } = product;

console.log(name, price, ram, color);
// → "iPhone 16" 25990000 8 "Titan"

console.log(specs);
// 💥 ReferenceError: specs is not defined
```

> **Giải thích `specs` bị lỗi:** Cú pháp `specs: { ram, color }` có nghĩa là **"lấy `ram` và `color` từ bên trong `specs`"**, nhưng **không tạo ra biến `specs`**. Đây là nested destructuring — `specs` chỉ là "alias trung gian" chứ không phải tên biến được khai báo.

---

```javascript
// ─── Spread ─────────────────────────────────────────────────────────────────
const updated = { ...product, price: 23990000, sale: true };

console.log(updated.price);
// → 23990000
// (property sau trong object literal ghi đè property trước → giá mới thắng)

console.log(updated.sale);
// → true

console.log(product.price);
// → 25990000  ✅ Gốc KHÔNG đổi
// (spread tạo object mới, không ảnh hưởng đến product gốc)
```

---

```javascript
// ─── Spread Gotcha (Shallow Copy) ───────────────────────────────────────────
const copy = { ...product };
copy.specs.ram = 16;

console.log(product.specs.ram);
// → 16  ⚠️ (KHÔNG phải 8!)
```

**Tại sao lại là `16` chứ không phải `8`?**

Spread `{ ...product }` chỉ thực hiện **shallow copy (sao chép nông)** — tức là chỉ copy một lớp ngoài cùng của object.

- Các property kiểu primitive (`name`, `price`) → được copy **giá trị** → hoàn toàn độc lập.
- Property kiểu object (`specs`) → chỉ copy **tham chiếu (reference)** → `copy.specs` và `product.specs` **cùng trỏ đến một object trong bộ nhớ**.

```
[bộ nhớ Heap]
  specsObject = { ram: 8, storage: 256, color: "Titan" }
                         ↑                    ↑
  product.specs ─────────┘    copy.specs ─────┘
                        (cùng một địa chỉ)

→ copy.specs.ram = 16 → sửa trực tiếp specsObject
→ product.specs.ram cũng thành 16
```

**Cách fix — Deep Clone:**
```javascript
// Cách 1: structuredClone (ES2022, khuyến nghị)
const deepCopy = structuredClone(product);

// Cách 2: JSON round-trip (không hỗ trợ Date, Function, undefined)
const deepCopy2 = JSON.parse(JSON.stringify(product));

// Cách 3: Spread thủ công từng cấp
const deepCopy3 = { ...product, specs: { ...product.specs } };
```

---

*Hết Phần A*

# PHẦN C — SUY LUẬN (20 điểm)

---

## Câu C1 (10đ) — Refactor Code

### Phân tích vấn đề của code cũ

| Vấn đề | Chi tiết |
|--------|----------|
| Dùng `var` | Không có block scope, dễ gây bug |
| Lồng `if` không cần thiết | Hai `if` riêng biệt có thể gộp thành một |
| Tự xây bubble sort | O(n²) — thay bằng `.sort()` có sẵn |
| Tự build object thủ công | Gán từng field một, verbose và dễ sai |
| Tổng cộng ~20 dòng | Có thể viết lại trong ≤ 10 dòng |

---

### Code sau khi refactor

```javascript
const processOrders = (orders) =>
    orders
        .filter(({ status, total }) => status === "completed" && total > 100000)
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9,
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
```

> **Đếm dòng:** 9 dòng — đạt yêu cầu ≤ 10 dòng ✅

---

### Giải thích từng bước

#### 1. `filter()` — Lọc đơn hàng hợp lệ

```javascript
.filter(({ status, total }) => status === "completed" && total > 100000)
```

- **Destructuring tham số** `{ status, total }` trực tiếp trong arrow function — không cần viết `orders[i].status`
- **Gộp 2 điều kiện** `if` lồng nhau thành một biểu thức `&&`

#### 2. `map()` — Biến đổi cấu trúc object

```javascript
.map(({ id, customer, total }) => ({
    id,
    customer,
    total,
    discount: total * 0.1,
    finalTotal: total * 0.9,  // tương đương total - total * 0.1
}))
```

- **Object destructuring** lấy đúng những field cần thiết
- **Shorthand property** `id,` thay vì `id: id,`
- `finalTotal: total * 0.9` tính thẳng, tránh khai báo biến trung gian `discount`

#### 3. `sort()` — Sắp xếp giảm dần

```javascript
.sort((a, b) => b.finalTotal - a.finalTotal)
```

- `b - a` → **giảm dần** (descending)
- `a - b` → tăng dần (ascending)
- Thay toàn bộ bubble sort O(n²) bằng built-in sort (thường là TimSort O(n log n))

---

### So sánh trước & sau

```
TRƯỚC                          SAU
──────────────────────────     ──────────────────────────
~20 dòng                       9 dòng
var (function scope)           const / destructuring
2 vòng for lồng nhau           .filter().map().sort()
Bubble sort O(n²)              Built-in sort O(n log n)
Gán field thủ công             Shorthand + spread
```

---

## Câu C2 (10đ) — Thiết kế API: `miniArray`

### Implementation

```javascript
const miniArray = {
    // Duyệt từng phần tử, áp dụng fn, thu thập kết quả vào mảng mới
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr)); // fn(value, index, array) — giống chuẩn
        }
        return result;
    },

    // Duyệt từng phần tử, chỉ giữ lại nếu fn trả về true
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    // Tích lũy giá trị qua từng phần tử, bắt đầu từ initialValue
    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;
        for (let i = 0; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr); // fn(acc, value, index, array)
        }
        return accumulator;
    },
};
```

---

### Giải thích cơ chế hoạt động

#### `map(arr, fn)`

```
arr = [1, 2, 3],  fn = x => x * 2

Vòng i=0: fn(1) → 2   → result = [2]
Vòng i=1: fn(2) → 4   → result = [2, 4]
Vòng i=2: fn(3) → 6   → result = [2, 4, 6]

Trả về: [2, 4, 6]  ✅
```

**Nguyên tắc:** Tạo mảng mới, **không thay đổi** mảng gốc (pure function).

---

#### `filter(arr, fn)`

```
arr = [1, 2, 3, 4],  fn = x => x > 2

Vòng i=0: fn(1) → false  → bỏ qua
Vòng i=1: fn(2) → false  → bỏ qua
Vòng i=2: fn(3) → true   → result = [3]
Vòng i=3: fn(4) → true   → result = [3, 4]

Trả về: [3, 4]  ✅
```

**Nguyên tắc:** Chỉ `.push()` khi `fn` trả về **truthy** — không xóa, chỉ chọn.

---

#### `reduce(arr, fn, initialValue)`

```
arr = [1, 2, 3, 4],  fn = (a, b) => a + b,  initialValue = 0

accumulator = 0
Vòng i=0: fn(0, 1) → 1    → accumulator = 1
Vòng i=1: fn(1, 2) → 3    → accumulator = 3
Vòng i=2: fn(3, 3) → 6    → accumulator = 6
Vòng i=3: fn(6, 4) → 10   → accumulator = 10

Trả về: 10  ✅
```

**Nguyên tắc:** `accumulator` là "bộ nhớ tích lũy" — mỗi vòng nhận giá trị cũ, trả về giá trị mới.

---

### Kiểm tra test cases

```javascript
console.log(miniArray.map([1, 2, 3], x => x * 2));
// → [2, 4, 6]  ✅

console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));
// → [3, 4]  ✅

console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10  ✅
```

---

### Bonus — Tại sao truyền `(value, index, array)` vào `fn`?

Đây là chuẩn của `Array.prototype` gốc. Cho phép dùng các callback nâng cao:

```javascript
// Dùng index trong map
miniArray.map(["a", "b", "c"], (val, i) => `${i}: ${val}`);
// → ["0: a", "1: b", "2: c"]

// Dùng array trong filter (lọc bỏ phần tử trùng)
miniArray.filter([1, 2, 2, 3], (val, i, arr) => arr.indexOf(val) === i);
// → [1, 2, 3]
```

---

### So sánh `miniArray` vs Built-in

| Tiêu chí | `miniArray` | Built-in |
|----------|-------------|----------|
| Cơ chế | `for` loop thủ công | Engine-level (native code) |
| Hiệu suất | Chậm hơn ~2-5x | Tối ưu JIT |
| Mục đích | Học thuật / hiểu cơ chế | Production |
| API surface | Giống chuẩn (value, index, array) | Đầy đủ + `thisArg` |
| Immutability | ✅ Không mutate mảng gốc | ✅ |

# Phần D video thực hành OBS
link gg drive https://drive.google.com/file/d/1vrFTNlMeJIw8_nmX1mznlOCa8dToWcg3/view?usp=sharing