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

1. `h1`

`<h1>ShopTLU</h1>`

ShopTLU

2. `.price`

`<p class="price">25.990.000đ</p>`
`<p class="price">45.990.000đ</p>`

25.990.000đ

45.990.000đ

3. `#app header`

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
    <h2>MacBook Pro</h2>
```

MacBook Pro

6. `article > p`

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

```html 
<header class="top-bar dark">
     <h1>ShopTLU</h1>
```

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

# Phần B: Thực hành 

## Bài B1 - Style trang Profile

- 5 loại selector có trong file `style.css`

1. Element selector: `body`, `header`, `table`, `footer`
2. Class selector: `.active`
3. ID selector: `#about_me`
4. Descendant selector: `nav a`, `figure img`, `tbody tr`
5. Pseudo-class selector:  `nav a:hover`, `tr:nth-child(even)`, `tr:hover`

## Bài B2 

1. Phần 1 — content-box vs border-box

- Hộp 1 (content-box): chiều rộng thực tế = 350px (đo từ DevTools)
- Hộp 2 (border-box): chiều rộng thực tế = 300px (đo từ DevTools)

Giải thích sự khác biệt:

- Hộp 1 dùng content-box (mặc định): width: 300px chỉ tính phần content. Padding và border được cộng thêm ra ngoài → chiều rộng thực tế = 300 + 20×2 + 5×2 = 350px.
- Hộp 2 dùng border-box: width: 300px là tổng kích thước bao gồm cả padding và border. Chúng co vào trong → chiều rộng thực tế luôn đúng 300px.

2. Phần 2 — Layout 3 cột

Trường hợp KHÔNG dùng border-box (content-box):

- Cột trái: 250 + 15×2 = 280px
- Cột giữa: 500 + 20×2 = 540px
- Cột phải: 250 + 15×2 = 280px
- Tổng = 280 + 540 + 280 = 1100px → vượt quá container 1000px → layout vỡ

Trường hợp CÓ dùng border-box:

- Cột trái: đúng 250px
- Cột giữa: đúng 500px
- Cột phải: đúng 250px
- Tổng = 250 + 500 + 250 = 1000px → vừa khít container → layout đúng

## Bài B3 — Specificity Battle

1. Liệt kê 10 rules + specificity score

- `p { color: gray; }` - Specificity: (0, 0, 1)
- `html p { color: sienna; }` - Specificity: (0, 0, 2)
- `.text { color: blue; }` - Specificity: (0, 1, 0)
- `p.text { color: green; }` - Specificity: (0, 1, 1)
- `.text.highlight { color: orange; }` - Specificity: (0, 2, 0)
- `p.text.highlight { color: purple; }` - Specificity: (0, 2, 1)
- `#demo { color: crimson; }` - Specificity: (1, 0, 0)
- `p#demo { color: deeppink; }` - Specificity: (1, 0, 1)
- `#demo.text { color: darkorange; }` - Specificity: (1, 1, 0)
- `p#demo.text.highlight { color: red; }` - Specificity: (1, 2, 1) ← THẮNG!

2. Element cuối cùng hiển thị màu gì? Tại sao?

Màu: `red` — do Rule 10 có selector `p#demo.text.highlight` với specificity cao nhất.

Tính theo hệ 3 cột (ID, Class, Tag):

- `p` → tag → cột Tag +1 → (0, 0, 1)
- `#demo` → ID → cột ID +1 → (1, 0, 0)
- `.text` → class → cột Class +1 → (0, 1, 0)
- `.highlight` → class → cột Class +1 → (0, 1, 0)
- Tổng: (1, 2, 1)

So sánh với tất cả rules còn lại từ cột trái sang phải — Rule 10 có cột ID = 1,
trong khi Rules 1–6 có cột ID = 0 nên thua ngay. Rules 7–9 tuy cùng cột ID = 1
nhưng cột Class thấp hơn (tối đa 1, trong khi Rule 10 có 2) → Rule 10 thắng tất cả.

3. Thay đổi thứ tự rules trong CSS — Kết quả có đổi không?

- Không đổi.
- Khi các rules có specificity khác nhau, thứ tự viết trong file CSS không ảnh hưởng. Rule có specificity cao hơn luôn thắng dù viết trước hay sau.
- Thứ tự chỉ quan trọng khi 2 rules có specificity bằng nhau — lúc đó rule viết sau thắng (cascade). Ví dụ nếu có 2 rule cùng specificity 121, rule nào đứng sau trong file CSS sẽ được áp dụng.

# Phần C: Debug & Suy luận

## Câu C1 — Debug CSS Layout

1. Chiều rộng thực tế (content-box)

- Sidebar: 300 + 20×2 + 1×2 = 342px
- Content: 660 + 30×2 + 1×2 = 722px
- Tổng: 342 + 722 = 1064px

2. Tại sao layout bị vỡ?

Container chỉ rộng 960px nhưng tổng 2 cột là 1064px — vượt quá 104px. Vì đang dùng content-box (mặc định), padding và border được cộng thêm ra ngoài width, làm 2 cột phình to hơn dự tính. Không đủ chỗ → content bị đẩy xuống dòng mới.

3. Hai cách sửa

### Cách 1: Dùng border-box

Thêm `box-sizing: border-box` vào cả sidebar và content. Padding và border sẽ co vào trong, width giữ đúng như đặt → tổng = 300 + 660 = 960px, vừa khít container.

```css
.sidebar {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  float: left;
}

.content {
  box-sizing: border-box;
  width: 660px;
  padding: 30px;
  border: 1px solid #ccc;
  float: left;
}
```

### Cách 2: Tự trừ padding + border khỏi width (không dùng border-box)

Tính ngược lại width cần khai báo để chiều rộng thực tế vừa khít 960px.

- Sidebar muốn chiều rộng thực tế = 300px → width khai báo = 300 - 20×2 - 1×2 = 258px
- Content muốn chiều rộng thực tế = 660px → width khai báo = 660 - 30×2 - 1×2 = 598px
- Kiểm tra: (258 + 40 + 2) + (598 + 60 + 2) = 300 + 660 = 960px ✓

```css
.sidebar {
  width: 258px;
  padding: 20px;
  border: 1px solid #ccc;
  float: left;
}

.content {
  width: 598px;
  padding: 30px;
  border: 1px solid #ccc;
  float: left;
}
```

## Câu C2 — Cascade Puzzle

1. "Sản phẩm A" — h2.title.highlight trong #featured.card

### font-size = 20px

_Các rules liên quan:_

- `body` → font-size: 16px — specificity: (0, 0, 1)
- `.container` → font-size: 14px — specificity: (0, 1, 0)
- `.card .title` → font-size: 20px — specificity: (0, 2, 0) ← THẮNG

_.card .title có specificity cao nhất trong các rules về font-size → font-size = 20px_

### color = green

_Các rules liên quan:_

- `.card` → color: blue — specificity: (0, 1, 0)
- `#featured .title` → color: red — specificity: (1, 1, 0)
- `.highlight` → color: green !important ← THẮNG

_!important phá vỡ mọi quy tắc specificity, kể cả ID selector → color = green_

2. "Mô tả sản phẩm" — p trong #featured.card

### color = blue

_Các rules liên quan:_

- `body` → color: #333 — specificity: (0, 0, 1)
- `.card` → color: blue — specificity: (0, 1, 0)
- `.card p` → color: inherit — specificity: (0, 1, 1) ← THẮNG về specificity

_.card p có specificity cao nhất → áp dụng color: inherit._

3. "Sản phẩm B" — h2.title trong .card thứ 2 (không có id)

### font-size = 20px

_Chỉ có 1 rule liên quan đến font-size:_

- `.card .title` → font-size: 20px — specificity: (0, 2, 0) ← áp dụng

_→ font-size = 20px_

### color = blue

_Các rules liên quan:_

- `.card` → color: blue — specificity: (0, 1, 0) ← THẮNG
- `#featured .title` → color: red — specificity: (1, 1, 0), nhưng rule này chỉ target #featured, h2 này không có id featured nên không áp dụng

_Chỉ còn .card với color: blue → color = blue_

4. "Mô tả sản phẩm B" — p.highlight trong .card thứ 2

### color = green

_Các rules liên quan:_

- `.card` → color: blue — specificity: (0, 1, 0)
- `.card p` → color: inherit — specificity: (0, 1, 1)
- `.highlight` → color: green !important ← THẮNG

_!important thắng tất cả → color = green_
