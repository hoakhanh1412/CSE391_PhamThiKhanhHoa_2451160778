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