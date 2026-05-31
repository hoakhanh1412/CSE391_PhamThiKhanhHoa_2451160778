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

# PHẦN C — DEBUG & PHÂN TÍCH

## Câu C1 (8đ) — Debug DOM Code

### Lỗi 1: Sai event của nút Decrement

**Code lỗi:**

```javascript
document.querySelector("#decrementBtn").addEventListener("onclick", function() {
```

**Nguyên nhân:**

`addEventListener()` chỉ nhận tên sự kiện là `"click"`, không phải `"onclick"`.

**Sửa:**

```javascript
document.querySelector("#decrementBtn").addEventListener("click", function() {
```

---

### Lỗi 2: Gán giá trị cho biến const

**Code lỗi:**

```javascript
countDisplay = count;
```

**Nguyên nhân:**

`countDisplay` được khai báo bằng `const`, không thể gán lại.

**Sửa:**

```javascript
countDisplay.textContent = count;
```

---

### Lỗi 3: Không cập nhật giao diện sau khi Reset

**Code lỗi:**

```javascript
countDisplay = count;
```

**Nguyên nhân:**

Không hiển thị giá trị mới lên DOM.

**Sửa:**

```javascript
countDisplay.textContent = count;
```

---

### Lỗi 4: Xóa history sai cách

**Code lỗi:**

```javascript
historyList.innerHTML = null;
```

**Nguyên nhân:**

`innerHTML` nên là chuỗi rỗng.

**Sửa:**

```javascript
historyList.innerHTML = "";
```

---

### Lỗi 5: remove() không được gọi

**Code lỗi:**

```javascript
item.remove;
```

**Nguyên nhân:**

Thiếu dấu ngoặc `()`.

**Sửa:**

```javascript
item.remove();
```

---

### Lỗi 6: count từ localStorage là String

**Code lỗi:**

```javascript
count = localStorage.getItem("count");
```

**Nguyên nhân:**

`localStorage` luôn trả về chuỗi.

Ví dụ:

```javascript
count = "5";
count++;
```

Kết quả không như mong muốn.

**Sửa:**

```javascript
count = Number(localStorage.getItem("count")) || 0;
```

---

### Lỗi 7: Không khôi phục History từ localStorage

**Code lỗi:**

Chỉ load count nhưng không load history.

```javascript
window.addEventListener("load", () => {
    count = localStorage.getItem("count");
    countDisplay.textContent = count;
});
```

**Sửa:**

```javascript
window.addEventListener("load", () => {
    count = Number(localStorage.getItem("count")) || 0;

    countDisplay.textContent = count;

    historyList.innerHTML =
        localStorage.getItem("history") || "";
});
```

---

### Lỗi 8: Event của các History Item bị mất sau khi reload

**Nguyên nhân:**

Khi lưu bằng:

```javascript
historyList.innerHTML
```

rồi load lại:

```javascript
historyList.innerHTML = ...
```

thì các event click trên từng `<li>` không còn tồn tại.

**Cách khắc phục:**

Dùng Event Delegation:

```javascript
historyList.addEventListener("click", (e) => {

    if(e.target.tagName === "LI"){

        deleteHistory(e.target);

    }

});
```

---

### Lỗi 9: Có thể decrement xuống số âm vô hạn

**Code hiện tại:**

```javascript
count--;
```

**Vấn đề:**

Counter có thể trở thành:

```text
-1
-2
-3
...
```

Nếu yêu cầu không cho số âm:

```javascript
if(count > 0){
    count--;
}
```

---

### Code sau khi sửa

```javascript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn")
.addEventListener("click", () => {

    count++;

    countDisplay.textContent = count;

    const li = document.createElement("li");

    li.textContent =
        "Count changed to " + count;

    historyList.append(li);

});

document.querySelector("#decrementBtn")
.addEventListener("click", () => {

    count--;

    countDisplay.textContent = count;

});

document.querySelector("#resetBtn")
.addEventListener("click", () => {

    count = 0;

    countDisplay.textContent = count;

    historyList.innerHTML = "";

});

historyList.addEventListener("click",(e)=>{

    if(e.target.tagName === "LI"){

        deleteHistory(e.target);

    }

});

function deleteHistory(element){

    element.remove();

}

document.querySelector("#clearHistory")
.addEventListener("click",()=>{

    historyList.innerHTML = "";

});

window.addEventListener("beforeunload",()=>{

    localStorage.setItem("count",count);

    localStorage.setItem(
        "history",
        historyList.innerHTML
    );

});

window.addEventListener("load",()=>{

    count =
        Number(
            localStorage.getItem("count")
        ) || 0;

    countDisplay.textContent = count;

    historyList.innerHTML =
        localStorage.getItem("history")
        || "";

});
```

---

# Câu C2 (7đ) — Performance

## 1. Tại sao bind event lên 1000 elements là Bad Practice?

Ví dụ:

```javascript
document
.querySelectorAll(".item")
.forEach(item => {

    item.addEventListener(
        "click",
        handleClick
    );

});
```

Nếu có 1000 phần tử:

* Tạo 1000 Event Listener
* Tốn bộ nhớ
* Khó bảo trì
* Hiệu năng giảm

---

### Event Delegation

Thay vì gắn event cho từng phần tử:

```javascript
parent.addEventListener(
    "click",
    (e)=>{

        if(
            e.target.classList.contains(
                "item"
            )
        ){

            console.log(
                e.target.textContent
            );

        }

    }
);
```

Chỉ cần:

* 1 Event Listener
* Tiết kiệm RAM
* Tự hoạt động với phần tử thêm mới

---

### Ưu điểm

| Cách                  | Số Event |
| --------------------- | -------- |
| 1000 phần tử riêng lẻ | 1000     |
| Event Delegation      | 1        |

Event Delegation tận dụng cơ chế Event Bubbling của DOM nên hiệu quả hơn rất nhiều.

---

## 2. Refactor bằng DocumentFragment

### Code gốc

```javascript
for (let i = 0; i < 1000; i++) {

    const div =
        document.createElement("div");

    div.textContent = `Item ${i}`;

    document.body.appendChild(div);

}
```

Mỗi lần:

```javascript
appendChild()
```

trình duyệt phải:

* cập nhật DOM
* tính toán layout
* reflow
* repaint

1000 lần liên tiếp.

---

### Code tối ưu

```javascript
const fragment =
    document.createDocumentFragment();

for(let i = 0; i < 1000; i++){

    const div =
        document.createElement("div");

    div.textContent =
        `Item ${i}`;

    fragment.appendChild(div);

}

document.body.appendChild(fragment);
```

---

### Tại sao nhanh hơn?

`DocumentFragment` là vùng nhớ tạm thời ngoài DOM.

Các phần tử được thêm vào fragment:

```javascript
fragment.appendChild(...)
```

không gây reflow.

Sau khi hoàn thành:

```javascript
document.body.appendChild(fragment);
```

trình duyệt chỉ cập nhật DOM **1 lần duy nhất**.

---

### So sánh

| Cách                  | Reflow   |
| --------------------- | -------- |
| appendChild trực tiếp | 1000 lần |
| DocumentFragment      | 1 lần    |

Kết quả:

* Nhanh hơn
* Ít repaint hơn
* Tiết kiệm tài nguyên trình duyệt
* Hiệu quả hơn khi render số lượng lớn phần tử

# Phần D video OBS 
link gg drive PBT_09 thực hành https://drive.google.com/file/d/1dlT39QpinMl_AOc6Jsum1lLWONsAbBpy/view?usp=sharing
