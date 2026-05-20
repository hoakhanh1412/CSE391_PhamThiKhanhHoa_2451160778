# PHẦN A — ĐỌC HIỂU (20 điểm)

---

# Câu A1 (10đ) — Grid System

## HTML

```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
```

---

# Phân tích Layout

| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|---|---|---|---|
| Số cột | 1 cột | 2 cột | 4 cột |
| Box layout | Mỗi box chiếm 100% chiều ngang | Mỗi box chiếm 50% chiều ngang | Mỗi box chiếm 25% chiều ngang |

---

# Wireframe Layout

## 1. Mobile (<768px)

```text
[ Box 1 ]
[ Box 2 ]
[ Box 3 ]
[ Box 4 ]
```

- `col-12`
- Mỗi box chiếm toàn bộ hàng

---

## 2. Tablet (768px - 991px)

```text
[ Box 1 ] [ Box 2 ]
[ Box 3 ] [ Box 4 ]
```

- `col-md-6`
- Bootstrap grid có 12 cột
- 6/12 = 50%

---

## 3. Desktop (≥992px)

```text
[ Box 1 ][ Box 2 ][ Box 3 ][ Box 4 ]
```

- `col-lg-3`
- 3/12 = 25%
- 4 box trên cùng 1 hàng

---

# Câu hỏi thêm

## `col-md-6` nghĩa là gì?

```html
class="col-md-6"
```

### Ý nghĩa
- `md` = breakpoint medium (`>=768px`)
- `6` = chiếm 6/12 cột của Bootstrap Grid

→ Khi màn hình từ 768px trở lên:
- Element chiếm 50% chiều ngang.

---

## Tại sao không cần viết `col-sm-12`?

Vì:

```html
col-12
```

đã áp dụng cho tất cả kích thước mặc định, bao gồm:
- mobile
- small devices

Bootstrap sử dụng Mobile-First:
- CSS nhỏ áp dụng trước
- Breakpoint lớn sẽ override sau

Nên:

```html
col-12
```

đã tương đương:

```html
col-sm-12
```

trong trường hợp này.

---

# Câu A2 (10đ) — Utilities & Components

---

# 1. Giải thích `d-none d-md-block`

```html
<div class="d-none d-md-block">
```

## Ý nghĩa

### `d-none`
- `display: none`
- Ẩn element ở mọi kích thước màn hình

### `d-md-block`
- Khi màn hình >=768px
- Element sẽ:

```css
display: block;
```

---

## Kết quả

| Kích thước | Hiển thị |
|---|---|
| Mobile (<768px) | ❌ Ẩn |
| Tablet/Desktop (>=768px) | ✅ Hiện |

---

# 2. 5 Spacing Utilities

## `mt-3`

```html
<div class="mt-3">
```

- `m` = margin
- `t` = top

→ Thêm margin phía trên.

---

## `mb-4`

```html
<div class="mb-4">
```

→ Thêm margin phía dưới.

---

## `px-4`

```html
<div class="px-4">
```

- `p` = padding
- `x` = left + right

→ Thêm padding trái và phải.

---

## `py-2`

```html
<div class="py-2">
```

→ Thêm padding trên và dưới.

---

## `ms-auto`

```html
<div class="ms-auto">
```

→ `margin-left: auto`

→ Đẩy element sang phải trong flexbox.

---

# 3. Khác nhau giữa `.container`, `.container-fluid`, `.container-md`

| Class | Ý nghĩa |
|---|---|
| `.container` | Có max-width theo từng breakpoint |
| `.container-fluid` | Chiếm 100% chiều ngang mọi màn hình |
| `.container-md` | Full width ở mobile, có max-width từ md trở lên |

---

# Ví dụ

## `.container`

```html
<div class="container">
```

- Có khoảng trắng hai bên
- Không full màn hình

---

## `.container-fluid`

```html
<div class="container-fluid">
```

- Luôn full width

---

## `.container-md`

```html
<div class="container-md">
```

- Mobile: full width
- >=768px: giới hạn chiều rộng giống container