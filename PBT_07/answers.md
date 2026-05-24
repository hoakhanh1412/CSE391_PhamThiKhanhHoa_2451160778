# PHẦN A — KIỂM TRA ĐỌC HIỂU

---

## Câu A1 — var / let / const

### Dự đoán output

**Đoạn 1:**
```javascript
console.log(x); // undefined
var x = 5;
```
Dự đoán: `undefined`

**Đoạn 2:**
```javascript
console.log(y); // ReferenceError
let y = 10;
```
Dự đoán: `ReferenceError: Cannot access 'y' before initialization`

**Đoạn 3:**
```javascript
const z = 15;
z = 20; // TypeError
console.log(z);
```
Dự đoán: `TypeError: Assignment to constant variable`

**Đoạn 4:**
```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]
```
Dự đoán: `[1, 2, 3, 4]`

**Đoạn 5:**
```javascript
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a); // 2
}
console.log("Ngoài block:", a); // 1
```
Dự đoán: `Trong block: 2` rồi `Ngoài block: 1`

### Giải thích các kết quả bất ngờ

- **Đoạn 1 — `var` bị hoisting:** Khai báo `var x` được đưa lên đầu scope nhưng chưa có giá trị, nên in ra `undefined` thay vì lỗi.
- **Đoạn 2 — `let` không hoisting như `var`:** `let` có "temporal dead zone", truy cập trước khi khai báo sẽ báo lỗi ngay.
- **Đoạn 3 — `const` không cho gán lại:** `const` cố định tham chiếu, không thể gán giá trị mới.
- **Đoạn 4 — `const` với mảng vẫn thay đổi được nội dung:** `const` chỉ cố định tham chiếu (địa chỉ bộ nhớ), không cố định nội dung bên trong mảng/object.
- **Đoạn 5 — `let` có block scope:** Biến `a = 2` chỉ tồn tại trong cặp `{}`, không ảnh hưởng biến `a = 1` bên ngoài.

---

## Câu A2 — Data Types & Coercion

### Dự đoán kết quả

```javascript
console.log(typeof null);        // "object"
console.log(typeof undefined);   // "undefined"
console.log(typeof NaN);         // "number"
console.log("5" + 3);            // "53"
console.log("5" - 3);            // 2
console.log("5" * "3");          // 15
console.log(true + true);        // 2
console.log([] + []);            // ""
console.log([] + {});            // "[object Object]"
console.log({} + []);            // "[object Object]"
```

### Giải thích tại sao `"5" + 3` và `"5" - 3` khác nhau

- `"5" + 3` → kết quả `"53"`: Toán tử `+` có thể dùng để **nối chuỗi**. Khi một trong hai bên là string, JS chuyển bên còn lại thành string rồi nối lại.
- `"5" - 3` → kết quả `2`: Toán tử `-` **chỉ dùng cho số**, không nối chuỗi được. JS tự động chuyển `"5"` thành số `5` rồi tính `5 - 3 = 2`.

---

## Câu A3 — So sánh == vs ===

### Dự đoán kết quả

```javascript
console.log(5 == "5");           // true
console.log(5 === "5");          // false
console.log(null == undefined);  // true
console.log(null === undefined); // false
console.log(NaN == NaN);         // false
console.log(0 == false);         // true
console.log(0 === false);        // false
console.log("" == false);        // true
```

### Quy tắc: nên dùng `===`

Nên dùng `===` vì:
- `==` tự động ép kiểu (coercion) trước khi so sánh → dễ gây ra kết quả không mong muốn như `"5" == 5` là `true`.
- `===` so sánh cả **giá trị lẫn kiểu dữ liệu**, kết quả rõ ràng và dễ đoán hơn.
- Chỉ dùng `==` khi cố tình muốn kiểm tra `null == undefined`.

---

## Câu A4 — Truthy & Falsy

### Tất cả giá trị Falsy trong JavaScript

```
false
0
-0
0n        (BigInt zero)
""        (chuỗi rỗng)
null
undefined
NaN
```

### Dự đoán kết quả

```javascript
if ("0") console.log("A");   // In ra "A"   → "0" là chuỗi không rỗng → truthy
if ("") console.log("B");    // Không in    → chuỗi rỗng → falsy
if ([]) console.log("C");    // In ra "C"   → mảng rỗng vẫn là object → truthy
if ({}) console.log("D");    // In ra "D"   → object rỗng → truthy
if (null) console.log("E");  // Không in    → null → falsy
if (0) console.log("F");     // Không in    → 0 → falsy
if (-1) console.log("G");    // In ra "G"   → số khác 0 → truthy
if (" ") console.log("H");   // In ra "H"   → chuỗi có space không phải rỗng → truthy
```

---

## Câu A5 — Template Literals

### Cách 1

```javascript
// Cũ
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";

// Template literal
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

### Cách 2

```javascript
// Cũ
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;

// Template literal
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

### Cách 3

```javascript
// Cũ
var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<span>Giá: " + price + "đ</span>" +
    "</div>";

// Template literal
var html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```