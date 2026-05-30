## 📝 Bài 0.1 — Chạy React đầu tiên (5 phút)
# React Basics - Câu hỏi lý thuyết

## Câu 1. File `.jsx` khác gì file `.js`?

### File `.js`

Là file JavaScript thông thường.

Ví dụ:

```javascript
function sayHello() {
    console.log("Hello");
}
```

File `.js` chỉ chứa cú pháp JavaScript chuẩn.

---

### File `.jsx`

Là file JavaScript có thể chứa JSX (JavaScript XML).

Ví dụ:

```jsx
function App() {
    return (
        <h1>Hello React</h1>
    );
}
```

Trong ví dụ trên:

```jsx
<h1>Hello React</h1>
```

không phải JavaScript thuần mà là JSX.

---

### So sánh

| `.js`                       | `.jsx`                                         |
| --------------------------- | ---------------------------------------------- |
| JavaScript thuần            | JavaScript + JSX                               |
| Không cần biên dịch JSX     | JSX sẽ được Babel/Vite chuyển thành JavaScript |
| Dùng cho logic thông thường | Thường dùng cho React Components               |

---

### Lưu ý

Thực tế React hiện nay cho phép viết JSX trong file `.js`.

Ví dụ:

```javascript
function App() {
    return <h1>Hello</h1>;
}
```

vẫn hoạt động nếu dự án được cấu hình Babel hoặc Vite.

Tuy nhiên:

* `.jsx` giúp dễ nhận biết đây là React Component.
* `.js` thường dùng cho utility functions, API calls, helpers,...

---

## Câu 2. Tại sao phải `export default App`?

Ví dụ:

```jsx
function App() {
    return <h1>Hello React</h1>;
}

export default App;
```

Từ khóa:

```javascript
export default
```

cho phép file khác import component này.

Ví dụ:

```jsx
import App from "./App";
```

React cần import component để render giao diện.

Ví dụ trong:

```jsx
main.jsx
```

```jsx
import App from "./App";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <App />
);
```

Nếu không export thì file khác không thể sử dụng component App.

---

### Ý nghĩa của Default Export

Một file chỉ có thể có:

```javascript
export default
```

duy nhất một lần.

Ví dụ:

```jsx
export default App;
```

Khi import:

```jsx
import App from "./App";
```

có thể đổi tên:

```jsx
import MyComponent from "./App";
```

vẫn hoạt động.

---

## Câu 3. Thử xóa `export default` → chuyện gì xảy ra?

Giả sử:

```jsx
function App() {
    return <h1>Hello React</h1>;
}
```

và không có:

```jsx
export default App;
```

---

Trong file khác:

```jsx
import App from "./App";
```

React sẽ không tìm thấy component được export.

---

### Kết quả

Dự án báo lỗi.

Ví dụ:

```text
Attempted import error:
'./App' does not contain a default export.
```

hoặc:

```text
The requested module './App.jsx' does not provide an export named 'default'
```

---

### Cách khắc phục

Thêm lại:

```jsx
export default App;
```

hoặc dùng Named Export:

```jsx
export function App() {
    return <h1>Hello React</h1>;
}
```

và import:

```jsx
import { App } from "./App";
```

---

## Kết luận

### 1. File `.jsx` khác gì file `.js`?

* `.js`: JavaScript thông thường.
* `.jsx`: JavaScript có thể chứa JSX để tạo giao diện React.

### 2. Tại sao phải `export default App`?

* Để component App có thể được import và sử dụng ở file khác.

### 3. Xóa `export default` sẽ thế nào?

* File khác không thể import App theo dạng mặc định.
* React báo lỗi import.
* Ứng dụng không chạy được cho đến khi export lại đúng cách.

### Bài tập: Viết lại HTML thành JSX

**Bài 1:** Viết component `UserProfile`

```jsx
function UserProfile() {
    return (
        <div className="profile">
            <h1>Hồ sơ cá nhân</h1>

            <img
                src="photo.jpg"
                alt="Ảnh đại diện"
            />

            <table>
                <tbody>
                    <tr>
                        <td>Họ tên:</td>
                        <td>Minh</td>
                    </tr>

                    <tr>
                        <td>Email:</td>
                        <td>minh@example.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default UserProfile;
```

**Bài 2:** Viết component `ProductInfo`
```jsx
function ProductInfo() {
    return (
        <div className="product">
            <h2>iPhone 15</h2>

            <p className="price">
                25.000.000đ
            </p>

            <ul>
                <li>Màn hình: 6.1 inch</li>
                <li>Camera: 48MP</li>
                <li>Pin: 3349 mAh</li>
            </ul>

            <button>Mua ngay</button>
        </div>
    );
}

export default ProductInfo;
```