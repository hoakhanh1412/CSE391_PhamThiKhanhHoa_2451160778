# 📝 Bài 1.1 — Trả lời câu hỏi: Component render lần đầu

---

## Câu hỏi 1: Tại sao component chỉ render 1 lần?

Component `LifecycleDemo` chỉ render **1 lần duy nhất** vì nó **không có bất kỳ yếu tố nào kích hoạt re-render**.

React chỉ gọi lại function component khi có một trong các điều kiện sau thay đổi:

| Yếu tố | Có trong `LifecycleDemo`? |
|---|---|
| `state` (trạng thái nội bộ) | ❌ Không có `useState` |
| `props` (dữ liệu từ cha truyền vào) | ❌ Không có props |
| `context` thay đổi | ❌ Không dùng context |
| Component cha re-render | ❌ Không có component cha trong ví dụ |

> **Kết luận:** Vì không có gì thay đổi → React không có lý do gì để gọi lại `LifecycleDemo()` → chỉ render đúng **1 lần** khi lần đầu mount vào DOM.

---

## Câu hỏi 2: Khi nào nó sẽ render lại?

Component sẽ render lại (**re-render**) khi xảy ra một trong các tình huống sau:

### 🔁 1. State thay đổi
```jsx
function LifecycleDemo() {
    const [count, setCount] = useState(0); // Thêm state

    console.log("1️⃣ Component được gọi!");

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Tăng</button>
        </div>
    );
}
```
→ Mỗi lần nhấn nút, `setCount` cập nhật state → React gọi lại `LifecycleDemo()` → log xuất hiện thêm lần nữa.

---

### 📦 2. Props thay đổi
```jsx
// Component cha
function App() {
    const [name, setName] = useState("React");
    return <LifecycleDemo title={name} />;
}

// Component con nhận props
function LifecycleDemo({ title }) {
    console.log("1️⃣ Component được gọi!");
    return <h2>{title}</h2>;
}
```
→ Khi `name` ở component cha thay đổi → `LifecycleDemo` nhận props mới → re-render.

---

### 🔄 3. Component cha re-render
```jsx
function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>App re-render</button>
            <LifecycleDemo /> {/* Sẽ bị re-render theo cha dù không có props */}
        </div>
    );
}
```
→ Mặc định, khi component cha re-render, **tất cả component con đều re-render theo**, dù props không đổi.

> 💡 Để tránh điều này, dùng `React.memo()`:
> ```jsx
> export default React.memo(LifecycleDemo);
> ```

---
# 📝 Bài 1.2 — Biến "bình thường" vs useState

---

## 🔬 Kết quả thử nghiệm

### 1. Chạy `BadCounter` → nhấn nút → thấy gì?

- **Trên màn hình:** Số `0` **không thay đổi** dù nhấn bao nhiêu lần.
- **Trong Console:** In ra `Count: 1`, `Count: 2`, `Count: 3`... → Giá trị biến **có tăng thật**, nhưng UI hoàn toàn "mù" với điều đó.
- **Lý do:** Mỗi lần React gọi lại `BadCounter()`, `let count = 0` được **khởi tạo lại từ đầu**. Mà React lại không bao giờ gọi lại vì không có gì báo hiệu cần re-render.

### 2. Chạy `GoodCounter` → nhấn nút → thấy gì?

- **Trên màn hình:** Số tăng lên mỗi lần nhấn: `0 → 1 → 2 → 3`...
- **Trong Console:** Nếu thêm `console.log("render")` vào body function, sẽ thấy log xuất hiện **mỗi lần nhấn** → chứng minh component được gọi lại.
- **Lý do:** `setCount()` thông báo cho React rằng state đã thay đổi → React gọi lại `GoodCounter()` → UI cập nhật với giá trị mới.

### 3. Log "render" xuất hiện mấy lần?

| Hành động | `BadCounter` | `GoodCounter` |
|---|---|---|
| Lần đầu load | 1 lần | 1 lần |
| Nhấn nút lần 1 | 0 lần thêm | 1 lần thêm |
| Nhấn nút lần 2 | 0 lần thêm | 1 lần thêm |
| Nhấn nút N lần | **Vẫn 1 lần** (tổng cộng) | **1 + N lần** (tổng cộng) |

---

## 🧠 Tại sao biến thường không làm UI cập nhật?

Có **2 vấn đề** cùng lúc:

### Vấn đề 1 — React không "nhìn thấy" thay đổi

React không theo dõi các biến JavaScript thông thường. Chỉ có **state** (qua `useState`) và **props** mới được React quan sát. Khi bạn viết:

```js
count = count + 1;
```

Đây chỉ là phép gán biến bình thường trong bộ nhớ JavaScript — React hoàn toàn không hay biết, nên không có lý do gì để re-render.

### Vấn đề 2 — Biến bị reset mỗi lần render

Ngay cả nếu React *có* re-render, biến thường cũng bị "bay mất":

```jsx
function BadCounter() {
    let count = 0;  // ← Dòng này chạy LẠI mỗi lần render → luôn = 0!
    // ...
}
```

Mỗi lần React gọi `BadCounter()`, toàn bộ thân function chạy lại từ đầu. `let count = 0` khởi tạo lại → giá trị cũ mất hoàn toàn.

---

## ✅ useState giải quyết cả 2 vấn đề như thế nào?

```jsx
const [count, setCount] = useState(0);
```

| Vấn đề | Giải pháp của useState |
|---|---|
| React không biết cần re-render | `setCount()` gửi tín hiệu cho React → React xếp lịch re-render |
| Biến bị reset sau mỗi lần render | React **lưu giá trị state bên ngoài** component, trong một "kho" nội bộ (Fiber tree). Mỗi lần render, React trả lại đúng giá trị đã lưu |

Hãy tưởng tượng như sau:

```
Biến thường                 useState
─────────────────────────   ───────────────────────────────────
RAM của function call       Kho lưu trữ riêng của React
Xóa khi function kết thúc   Tồn tại xuyên suốt vòng đời component
React không quan sát        React quan sát và phản ứng
```

---

# 📝 Bài 1.3 — Luồng hoạt động (Flow) của React

---

## 🔬 Phân tích `FlowDemo` theo từng bước trong sơ đồ

### Lần chạy đầu tiên (Initial Render)

```
Bước 1 → React gọi FlowDemo()
           → Console: "🔄 Component render!"

Bước 2 → useState(1) trả về [1, setStep]
           → JSX render với step = 1

Bước 3 → Màn hình hiển thị:
           "Bước hiện tại: 1"
           "👋 Bước 1: Xin chào!"
```

---

### Khi người dùng nhấn "Bước tiếp theo →"

```
Bước 4 → onClick kích hoạt
           → handleClick chạy

Bước 5 → setStep(step + 1)  =  setStep(2)
           → React nhận tín hiệu: "state thay đổi!"

Bước 6 → React gọi lại FlowDemo()
           → Console: "🔄 Component render!" (lần 2)

Bước 7 → useState trả về [2, setStep]  ← giá trị MỚI từ kho
           → JSX mới với step = 2

Bước 8 → React so sánh JSX cũ vs JSX mới (Reconciliation)
           → Chỉ cập nhật đúng phần thay đổi:
             "Bước hiện tại: 1" → "Bước hiện tại: 2"
             <p>👋 Bước 1...</p>  →  <p>📖 Bước 2...</p>
           → Các nút bấm KHÔNG bị cập nhật (không đổi)

→ Quay về Bước 4, chờ tương tác tiếp theo
```

---

## 🗺️ Sơ đồ luồng với `FlowDemo` cụ thể

```
[App khởi động]
      ↓
FlowDemo() được gọi lần 1
step = 1  (giá trị khởi tạo)
      ↓
Màn hình: "Bước hiện tại: 1" + "👋 Bước 1: Xin chào!"
      ↓
[Người dùng nhấn "Bước tiếp theo →"]
      ↓
setStep(2)  →  React xếp lịch re-render
      ↓
FlowDemo() được gọi lần 2
step = 2  (lấy từ kho React)
      ↓
Màn hình: "Bước hiện tại: 2" + "📖 Bước 2: Đang học React"
      ↓
[Người dùng nhấn "Quay lại đầu"]
      ↓
setStep(1)  →  React xếp lịch re-render
      ↓
FlowDemo() được gọi lần 3
step = 1  (reset về 1)
      ↓
Màn hình trở về trạng thái ban đầu
```

---

## 🔑 3 điểm quan trọng cần nhớ

### 1. Console log đếm số lần render chính xác

```
Load trang:           🔄 Component render!   (lần 1)
Nhấn nút 1 lần:      🔄 Component render!   (lần 2)
Nhấn nút 2 lần:      🔄 Component render!   (lần 3)
Nhấn "Quay lại đầu": 🔄 Component render!   (lần 4)
```

> 💡 `console.log` ở đầu function là cách đơn giản nhất để kiểm tra component render bao nhiêu lần — kỹ thuật debug rất thực tế.

---

### 2. React chỉ cập nhật phần thay đổi — không vẽ lại toàn bộ

Khi `step` đổi từ `1` → `2`, React **không** xóa toàn bộ DOM rồi vẽ lại. Nó so sánh JSX cũ vs mới (gọi là **Reconciliation**) và chỉ chạm vào đúng node cần thay đổi:

```
DOM trước:                      DOM sau:
<p>Bước hiện tại: 1</p>   →   <p>Bước hiện tại: 2</p>  ← CẬP NHẬT
<button>Bước tiếp →</button>   <button>Bước tiếp →</button>  ← GIỮ NGUYÊN
<button>Quay lại</button>      <button>Quay lại</button>      ← GIỮ NGUYÊN
<p>👋 Bước 1...</p>       →   <p>📖 Bước 2...</p>       ← CẬP NHẬT
```

Đây là lý do React nhanh hơn so với việc cập nhật DOM thủ công.

---

### 3. `setStep(1)` khi `step` đang là `1` → React KHÔNG re-render

React so sánh giá trị cũ và mới bằng `Object.is()`. Nếu giống nhau, React bỏ qua — không tốn công re-render vô ích.

```jsx
// Đang ở bước 1, nhấn "Quay lại đầu"
setStep(1)  // step hiện tại = 1, giá trị mới = 1
            // → React nhận ra không đổi → KHÔNG re-render
```

---


