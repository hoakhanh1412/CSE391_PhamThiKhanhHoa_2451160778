# PHẦN A — KIỂM TRA ĐỌC HIỂU

---

## Câu A1 (5đ) — DOM Tree

### 1. Sơ đồ DOM Tree

```
document
└── html
    └── body
        └── div#app
            ├── header
            │   ├── h1
            │   │   └── [text: "Todo App"]
            │   └── nav
            │       ├── a.active [href="#"]
            │       │   └── [text: "All"]
            │       ├── a [href="#"]
            │       │   └── [text: "Active"]
            │       └── a [href="#"]
            │           └── [text: "Completed"]
            └── main
                ├── form#todoForm
                │   ├── input#todoInput [type="text"]
                │   └── button [type="submit"]
                │       └── [text: "Add"]
                └── ul#todoList
                    ├── li.todo-item
                    │   └── [text: "Learn HTML"]
                    └── li.todo-item.completed
                        └── [text: "Learn CSS"]
```

---

### 2. Các querySelector tương ứng

| Yêu cầu | querySelector |
|---|---|
| Chọn thẻ `<h1>` | `document.querySelector("h1")` |
| Chọn input trong form | `document.querySelector("#todoForm input")` |
| Chọn tất cả `.todo-item` | `document.querySelectorAll(".todo-item")` |
| Chọn link đang active | `document.querySelector("a.active")` |
| Chọn `<li>` đầu tiên trong `#todoList` | `document.querySelector("#todoList li:first-child")` |
| Chọn tất cả `<a>` bên trong `<nav>` | `document.querySelectorAll("nav a")` |

---

## Câu A2 (5đ) — innerHTML vs textContent

### Sự khác nhau

| | `innerHTML` | `textContent` |
|---|---|---|
| **Trả về / ghi** | Chuỗi HTML (bao gồm thẻ) | Chỉ văn bản thuần túy |
| **Parse HTML** | ✅ Có (trình duyệt render thẻ) | ❌ Không (thẻ được hiển thị nguyên văn) |
| **Hiệu năng** | Chậm hơn (phải parse HTML) | Nhanh hơn |
| **Bảo mật** | ⚠️ Có nguy cơ XSS | ✅ An toàn |

### Khi nào dùng mỗi cái

**Dùng `innerHTML`** khi cần render HTML động (ví dụ: tạo danh sách từ dữ liệu đã được kiểm soát hoàn toàn bởi lập trình viên, không phải từ người dùng nhập vào):

```javascript
// ✅ An toàn vì nội dung do lập trình viên viết, không từ user input
const todos = ["Học HTML", "Học CSS"];
document.querySelector("#todoList").innerHTML = todos
  .map(todo => `<li class="todo-item">${todo}</li>`)
  .join("");
```

**Dùng `textContent`** khi chỉ cần hiển thị văn bản, đặc biệt khi nội dung đến từ người dùng:

```javascript
// ✅ Hiển thị tên người dùng an toàn
const username = getUserInput(); // Có thể chứa HTML nguy hiểm
document.querySelector("#greeting").textContent = `Xin chào, ${username}!`;
// Kết quả hiển thị nguyên văn, không render HTML
```

---

### Câu hỏi bảo mật — Lỗ hổng XSS với `innerHTML`

**Tại sao `innerHTML` có thể gây XSS?**

Khi gán chuỗi từ người dùng vào `innerHTML`, trình duyệt sẽ **parse và thực thi** mọi đoạn HTML/JavaScript nhúng trong chuỗi đó. Kẻ tấn công có thể chèn thẻ `<script>` hoặc các attribute sự kiện như `onerror`, `onclick`... để chạy code độc hại.

**Ví dụ minh họa lỗi và cách sửa:**

```javascript
// ❌ NGUY HIỂM — Nếu user nhập: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;
// → Trình duyệt render thẻ <img>, src=x bị lỗi → kích hoạt onerror → chạy alert()


// ✅ CÁCH SỬA 1 — Dùng textContent (đơn giản và an toàn nhất)
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput;
// → Chuỗi được hiển thị nguyên văn, không có HTML nào được render


// ✅ CÁCH SỬA 2 — Escape HTML trước khi dùng innerHTML (nếu bắt buộc phải dùng innerHTML)
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;       // textContent tự escape
  return div.innerHTML;        // lấy lại dưới dạng HTML đã được escape
}

const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = escapeHTML(userInput);
// <img src=x onerror="..."> → sẽ thành &lt;img src=x onerror="..."&gt; → hiển thị an toàn
```

---

## Câu A3 (5đ) — Event Bubbling

### HTML tham chiếu

```html
<div id="outer">       <!-- Cấp 3 (ngoài cùng) -->
    <div id="inner">   <!-- Cấp 2 -->
        <button id="btn">Click me</button>  <!-- Cấp 1 (được click) -->
    </div>
</div>
```

---

### Trường hợp 1 — `stopPropagation()` đang bị comment (mặc định)

Khi click vào `#btn`:

1. Sự kiện được kích hoạt tại `#btn` trước tiên (target phase)
2. Sự kiện nổi bọt (bubble) lên `#inner`
3. Sự kiện tiếp tục nổi bọt lên `#outer`

**Output:**

```
BUTTON
INNER
OUTER
```

---

### Trường hợp 2 — Bỏ comment `e.stopPropagation()`

```javascript
document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    e.stopPropagation();  // ← Dừng bubble tại đây
});
```

`stopPropagation()` **chặn sự kiện không cho nổi bọt lên** các phần tử cha. Sự kiện dừng lại tại `#btn`, không lan lên `#inner` và `#outer`.

**Output:**

```
BUTTON
```

---

### Tóm tắt so sánh

| | Không có `stopPropagation()` | Có `stopPropagation()` |
|---|---|---|
| **Output** | `BUTTON` → `INNER` → `OUTER` | `BUTTON` |
| **Cơ chế** | Bubble lên toàn bộ cây DOM | Dừng tại phần tử gốc của sự kiện |
| **Listeners của cha** | Được gọi | Không được gọi |