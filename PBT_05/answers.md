# PHẦN A — KIỂM TRA ĐỌC HIỂU

---

# Câu A1 (5đ) — Viewport & Mobile-First

## 1. Thẻ `<meta viewport>` chuẩn

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Giải thích từng thuộc tính

### `name="viewport"`

- Cho trình duyệt biết đây là phần thiết lập liên quan đến viewport.
- Viewport là vùng hiển thị nội dung website trên màn hình thiết bị.

---

### `width=device-width`

- Đặt chiều rộng của trang web bằng đúng chiều rộng màn hình thiết bị.
- Ví dụ:
  - iPhone có màn hình rộng 390px → website cũng hiển thị theo 390px.
- Giúp website responsive đúng kích thước thật.

---

### `initial-scale=1.0`

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

# 3. Mobile-First và Desktop-First

---

## Mobile-First là gì?

- Viết CSS cho mobile trước.
- Sau đó dùng `min-width` để mở rộng cho tablet và desktop.

### Ví dụ Mobile-First (breakpoint 768px)

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

---

## Desktop-First là gì?

- Viết CSS cho desktop trước.
- Sau đó dùng `max-width` để thu nhỏ cho mobile.

### Ví dụ Desktop-First

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

# So sánh Mobile-First và Desktop-First

| Mobile-First | Desktop-First |
|---|---|
| Viết cho mobile trước | Viết cho desktop trước |
| Dùng `min-width` | Dùng `max-width` |
| Mở rộng dần | Thu nhỏ dần |
| Tối ưu mobile tốt hơn | Dễ bị dư CSS |
| Được khuyên dùng hiện nay | Ít dùng hơn |

---

# Tại sao Mobile-First được khuyên dùng?

## Vì:

### 1. Người dùng mobile rất nhiều

Hiện nay phần lớn truy cập web đến từ điện thoại.

---

### 2. Tối ưu hiệu năng

- Mobile thường yếu hơn desktop.
- Mobile-First giúp:
  - CSS gọn hơn
  - Tải nhanh hơn
  - Dễ tối ưu hơn

---

### 3. Responsive tự nhiên hơn

- Thiết kế từ màn hình nhỏ trước
- Sau đó mở rộng dần
- Layout dễ quản lý hơn

---

### 4. Chuẩn của Bootstrap và nhiều framework

Bootstrap sử dụng Mobile-First.

---