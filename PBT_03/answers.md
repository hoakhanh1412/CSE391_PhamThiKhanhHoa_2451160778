# Phần A - Kiểm tra đọc hiểu
## Câu A1 - 3 Cách nhúng CSS

Cách 1: Inline CSS (trong thẻ):

- VÍ DỤ: `<h1 style="color: red; font-size: 24px;">Hello</h1>`
- Ưu điểm: Nhanh, đơn giản, phù hợp chỉnh sửa 1 phần tử riêng lẻ, không cần tạo file CSS riêng
- Nhược điểm: Code khó bảo trì khi website lớn, phải viết lặp lại nhiều lần, không tái sử dụng được
- Khi nào nên dùng: Test nhanh giao diện, chỉnh sửa tạm thời
Cách 2: Internal CSS (trong `<style>`):

- VÍ DỤ: 
```html
<head>
    <style>
        h1 { color: red; font-size: 24px; }
    </style>
</head>
```
- Ưu điểm: dễ quản lý hơn inline, không cần file CSS riêng, có thể áp dụng cho nhiều phần tử
- Nhược điểm: chỉ dùng được cho 1 trang HTML, không tái sử dụng cho nhiều trang
- Khi nào nên dùng: website nhỏ, trang đơn, bài thực hành

Cách 3: External CSS (file riêng)
- VÍ DỤ:
```html 
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```
- Ưu điểm: quản lý dễ dành, tái sử dụng cho nhiều trang, code gọn gàng, dễ bảo trì
- Nhược điểm: cần tạo thêm file CSS, nếu file CSS lỗi hoặc không tải được thì giao diện mất style
- Khi nào nên dùng: website lớn, dự án thực tế

Câu hỏi thêm:

    Thứ tự ưu tiên: Inline CSS > Internal CSS > External CSS

    Giải thích: CSS hoạt động theo nguyên tắc Cascade(xếp tầng): độ ưu tiên selector, vị trí khai báo, loại CSS sử dụng
    
    Inline CSS được viết trực tiếp trên element nên có độ ưu tiên cao hơn internal và external CSS

## Câu A2 - CSS Selectors - Dự đoán kết quả

1. h1
`<h1>ShopTLU</h1>`
ShopTLU

2. .price
`<p class="price">25.990.000đ</p>`
`<p class="price">45.990.000đ</p>`
25.990.000đ
45.990.000đ

3. #app header
`<header class="top-bar dark">...</header>`
ShopTLU

Home

Products

About

4. `nav a:first-child`
`<a href="/" class="active">Home</a>`
Home

5. `.product.featured h2`
```html
<article class="product featured">
    <h2>MacBook Pro</h2>```
MacBook Pro

6. article > p
```html
<p class="price">25.990.000đ</p>
<p>Mô tả sản phẩm...</p>
<p class="price">45.990.000đ</p>
<p>Mô tả sản phẩm...</p>
```
25.990.000đ

Mô tả sản phẩm...

45.990.000đ

Mô tả sản phẩm...

7. `a[href="/"]`
`<a href="/" class="active">Home</a>`
Home

8. `.top-bar.dark h1`
`<header class="top-bar dark">
     <h1>ShopTLU</h1>`
ShopTLU

## Câu A3

### Trường hợp 1 - content-box (mặc định)
```css
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```
content: width = 400px

padding: trái 20px, phải 20px

border: trái 5px, phải 5px

-> chiều rộng hiển thị = 400 + 20 + 20 + 5 + 5 = 450px

margin: trái 10px, phải 10px

-> không gian chiếm trên trang: 450 + 20 = 470px

### Trường hợp 2 = border-box
```css
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```
width tổng: content+padding+border: 400px

padding: 20+20 = 40px

border: 5+5 = 10px

-> content thực tế = 400 - 40 - 10 = 350px

margin: 10+10 = 20px

-> không gian chiếm trên trang: 400 + 20 = 420px

### Trường hợp 3 - Margin collapse
```css
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
```
-> khoảng cách giữa 2 box: 40px

vì CSS dùng MAargin Collapse khi 2 block nằm dọc nhau margin chạm nhau thì brower chỉ lấy margin lớn hơn
## Câu A4
## Câu A4 — Specificity (Độ ưu tiên)

1. Tính specificity score (a, b, c) cho mỗi rule

- `p` → tag = 1 → (0, 0, 1)
- `.price` → class = 1 → (0, 1, 0)
- `#main-price` → ID = 1 → (1, 0, 0)
- `p.price` → tag(1) + class(1) → (0, 1, 1)

2. Element sẽ có màu gì? Giải thích

- Element sẽ có màu đỏ do Specificity của `#main-price` là cao nhất nên thắng tất cả

3. Nếu thêm `<p class="price" id="main-price" style="color: orange;">`, element có màu gì?

- Element sẽ có màu cam do Specificity của `#style="color: orange` là (1,0,0,0) nên thắng tất cả

4. Nếu Rule A thêm `!important`, element có màu gì? Tại sao?

- Element sẽ có màu đen do `!important` có specificity vô cực — phá vỡ toàn bộ quy tắc thông thường

# Phần B: Thực hành Code