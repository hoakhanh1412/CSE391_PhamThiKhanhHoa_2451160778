# PHẦN A — KIỂM TRA ĐỌC HIỂU

---

# Câu A1 (5đ) — Viewport & Mobile-First

### 1. Thẻ `<meta viewport>` chuẩn

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Giải thích từng thuộc tính

1. `name="viewport"`

- Cho trình duyệt biết đây là phần thiết lập liên quan đến viewport.
- Viewport là vùng hiển thị nội dung website trên màn hình thiết bị.

---

2. `width=device-width`

- Đặt chiều rộng của trang web bằng đúng chiều rộng màn hình thiết bị.
- Ví dụ:
  - iPhone có màn hình rộng 390px → website cũng hiển thị theo 390px.
- Giúp website responsive đúng kích thước thật.

3. `initial-scale=1.0`

- Thiết lập mức zoom ban đầu khi mở trang.
- `1.0` nghĩa là:
  - Không phóng to
  - Không thu nhỏ
- Website hiển thị với tỉ lệ bình thường.

---

## 2. Nếu thiếu thẻ viewport thì chuyện gì xảy ra?

Nếu KHÔNG có thẻ viewport:

- iPhone và nhiều thiết bị mobile sẽ giả lập trang web như màn hình desktop khoảng 980px.
- Toàn bộ website bị thu nhỏ lại để vừa màn hình điện thoại.
- Kết quả:
  - Chữ rất nhỏ
  - Nút bấm khó nhấn
  - Layout responsive hoạt động sai
  - Người dùng phải zoom mới đọc được

### Ví dụ

Một website desktop rộng 1200px:

- Mobile sẽ cố hiển thị toàn bộ 1200px trên màn hình khoảng 390px.
- Mọi thứ bị co nhỏ.

---

### 3. Mobile-First và Desktop-First

 Mobile-First là gì?

- Viết CSS cho mobile trước.
- Sau đó dùng `min-width` để mở rộng cho tablet và desktop.

 Ví dụ Mobile-First (breakpoint 768px)

```css
/* Mobile trước */
.container {
    width: 100%;
    background: lightblue;
}

/* Tablet/Desktop */
@media (min-width: 768px) {
    .container {
        width: 750px;
        background: lightgreen;
    }
}
```

### Ý nghĩa

- Dưới 768px → giao diện mobile
- Từ 768px trở lên → giao diện tablet/desktop

 Desktop-First là gì?

- Viết CSS cho desktop trước.
- Sau đó dùng `max-width` để thu nhỏ cho mobile.

Ví dụ Desktop-First

```css
/* Desktop trước */
.container {
    width: 750px;
    background: lightgreen;
}

/* Mobile */
@media (max-width: 768px) {
    .container {
        width: 100%;
        background: lightblue;
    }
}
```

---

### So sánh Mobile-First và Desktop-First

| Mobile-First | Desktop-First |
|---|---|
| Viết cho mobile trước | Viết cho desktop trước |
| Dùng `min-width` | Dùng `max-width` |
| Mở rộng dần | Thu nhỏ dần |
| Tối ưu mobile tốt hơn | Dễ bị dư CSS |
| Được khuyên dùng hiện nay | Ít dùng hơn |

## Tại sao Mobile-First được khuyên dùng?

 Vì: 1. Người dùng mobile rất nhiều

Hiện nay phần lớn truy cập web đến từ điện thoại.

2. Tối ưu hiệu năng

- Mobile thường yếu hơn desktop.
- Mobile-First giúp:
  - CSS gọn hơn
  - Tải nhanh hơn
  - Dễ tối ưu hơn

3. Responsive tự nhiên hơn

- Thiết kế từ màn hình nhỏ trước
- Sau đó mở rộng dần
- Layout dễ quản lý hơn

4. Chuẩn của Bootstrap và nhiều framework

Bootstrap sử dụng Mobile-First.

# Câu A2 (5đ) — Breakpoints

## Các breakpoints phổ biến theo Bootstrap

| Breakpoint | Kích thước | Thiết bị đại diện | Ví dụ lưới sản phẩm |
|---|---|---|---|
| Extra Small (xs) | `<576px` | Điện thoại nhỏ | 1 cột |
| Small (sm) | `≥576px` | Điện thoại lớn | 2 cột |
| Medium (md) | `≥768px` | Tablet | 2–3 cột |
| Large (lg) | `≥992px` | Laptop | 3–4 cột |
| Extra Large (xl) | `≥1200px` | Desktop lớn | 4 cột |
| Extra Extra Large (xxl) | `≥1400px` | Màn hình rất lớn | 5–6 cột |

---

## Ví dụ responsive grid sản phẩm

### Mobile

```css
grid-template-columns: 1fr;
```

- Hiển thị 1 sản phẩm mỗi hàng.

---

### Tablet

```css
grid-template-columns: repeat(2, 1fr);
```

- Hiển thị 2 cột.

---

### Desktop

```css
grid-template-columns: repeat(4, 1fr);
```

- Hiển thị 4 cột.

# Câu A3 (5đ) — Media Queries

### CSS đề bài

```css
.container { width: 100%; padding: 10px; }

@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```

### Phân tích

CSS hoạt động theo nguyên tắc:

- Điều kiện nào đúng thì áp dụng.
- Media query phía dưới sẽ ghi đè phía trên nếu cùng thuộc tính.

### Bảng kết quả

| Chiều rộng màn hình | `.container` width | Giải thích |
|---|---|---|
| 375px | `100%` | Nhỏ hơn 576px nên dùng mặc định |
| 600px | `540px` | Thỏa `min-width:576px` |
| 800px | `720px` | Thỏa `min-width:768px` |
| 1000px | `960px` | Thỏa `min-width:992px` |
| 1400px | `1140px` | Thỏa `min-width:1200px` |

### Giải thích từng trường hợp

 375px

- Không media query nào hoạt động.
- Width = `100%`.

 600px

- 600 ≥ 576
- Áp dụng:

```css
width: 540px;
```

 800px

- 800 ≥ 768
- Width trở thành:

```css
width: 720px;
```

 1000px

- 1000 ≥ 992
- Width:

```css
width: 960px;
```

 1400px

- 1400 ≥ 1200
- Width:

```css
width: 1140px;
```

# Câu A4 (5đ) — SCSS Basics

## 1. Variables

### Khái niệm

Variables giúp lưu giá trị để tái sử dụng.

### Ví dụ SCSS

```scss
$primary-color: #0d6efd;
$text-color: #333;

button {
    background: $primary-color;
    color: $text-color;
}
```

### Lợi ích

- Dễ đổi màu toàn website.
- Code gọn hơn.
- Dễ bảo trì.

## 2. Nesting

### Khái niệm

Cho phép viết CSS lồng nhau giống cấu trúc HTML.

### Ví dụ SCSS

```scss
.navbar {
    background: black;

    ul {
        list-style: none;
    }

    li {
        display: inline-block;
    }

    a {
        color: white;
    }
}
```

### CSS sau khi compile

```css
.navbar {
    background: black;
}

.navbar ul {
    list-style: none;
}

.navbar li {
    display: inline-block;
}

.navbar a {
    color: white;
}
```

---

### Lợi ích

- Code dễ đọc.
- Thể hiện cấu trúc rõ ràng.
- Giảm lặp selector.

## 3. Mixins

### Khái niệm

Mixin giúp tái sử dụng nhiều đoạn CSS.

---

### Ví dụ

```scss
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    @include flex-center;
    height: 200px;
}
```

### CSS sau compile

```css
.box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
}
```

### Lợi ích

- Tái sử dụng code.
- Giảm lặp CSS.
- Dễ quản lý responsive hoặc animation.

## 4. `@extend` / Inheritance

### Khái niệm

Cho phép kế thừa style từ class khác.

### Ví dụ

```scss
.button {
    padding: 10px 20px;
    border-radius: 5px;
}

.success-button {
    @extend .button;
    background: green;
}
```

### CSS sau compile

```css
.button,
.success-button {
    padding: 10px 20px;
    border-radius: 5px;
}

.success-button {
    background: green;
}
```

### Lợi ích

- Tránh lặp code.
- Dễ xây dựng hệ thống component.

### Tại sao trình duyệt KHÔNG đọc được file `.scss`?

Vì:

- `.scss` không phải ngôn ngữ mà trình duyệt hiểu trực tiếp.
- Trình duyệt chỉ đọc được:
  - CSS
  - HTML
  - JavaScript

SCSS chỉ là ngôn ngữ mở rộng của CSS.

### Cần bước gì để chuyển SCSS → CSS?

Cần dùng:

### SCSS Compiler

Ví dụ:

- Sass CLI
- VS Code Live Sass Compiler
- Webpack
- Vite

### Ví dụ compile bằng Sass

```bash
sass style.scss style.css
```

### Quy trình hoạt động

```text
SCSS file
    ↓
Sass Compiler
    ↓
CSS file
    ↓
Browser đọc CSS
```

### Kết luận

SCSS giúp:

- Viết CSS nhanh hơn
- Dễ quản lý dự án lớn
- Tái sử dụng code tốt hơn
- Hỗ trợ responsive hiệu quả

Nhưng bắt buộc phải compile sang CSS trước khi trình duyệt sử dụng được.

# SCSS Compile Command

```bash
sass scss/style.scss responsive.css
