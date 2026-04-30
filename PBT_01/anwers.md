# PHẦN A - KIỂM TRA ĐỌC HIỂU
## Câu A1 - HTTP & Browser
### 1. Khi bạn gõ https://shopee.vn vào trình duyệt và nhấn Enter thứ tự các bước xảy ra là:
- Request xuất phát từ laptop → đi qua router WiFi
- Qua nhà mạng VNPT → chạy xuyên cáp quang dưới đáy Thái Bình Dương
- Đến data center của trụ sở Shopee 
- Server xử lý request 
- Response chạy ngược lại: cáp quang → VNPT → router → laptop
- Chrome nhận file HTML, CSS, JS → render ra giao diện → ta thấy trang Shopee
 (tuan_1_html5\1_introduction_html_universe.md + Phần: 🎬 Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương)
### 2. Trong DevTools của Chrome, tab Network cho thấy:
requests/responses (tuan_1_html5\01_introduction_html_universe.md + phần 4.3)

## Câu A2 - Semantic HTML
- Dùng `<div>` thay cho thẻ semantic
    + `<div class="header">` nên dùng `<header>`
    + `<div class="main">` nên dùng `<main>`
    +`<div class="footer">` nên dùng `<footer>`
- Menu không dùng `<nav>` `<div class = "menu">` sai
- Tiêu đề sản phẩm không dùng heading 
- Ảnh không có alt google không biết là ảnh gì
- Sửa lại lỗi 
  ```html
  <header>
    <div class="logo">ShopTLU</div>
    <nav>
      <ul>
        <li><a href="/">Trang chủ</a></li>
        <li><a href="/products">Sản phẩm</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article class="product">
      <h1>iPhone 16 Pro</h1>
      <p class="price">25.990.000đ</p>
      <img src="iphone.jpg" alt="iPhone 16 Pro" />
    </article>
  </main>

  <footer>© 2026 ShopTLU</footer>
  ```
(tuan_1_html5\04_visible_part_html.md + Bản đồ sementic elements)

## Câu A3 
```
┌─────────────┐
│   Hộp 1     │  ← div: chiếm cả hàng
└─────────────┘
Text A Text B     ← span: nằm cùng hàng nhau
┌─────────────┐
│   Hộp 2     │  ← div: xuống hàng mới
└─────────────┘
Text C **Text D**  ← span + strong: cùng hàng, Text D in đậm
┌─────────────┐
│   Hộp 3     │  ← div: xuống hàng mới
└─────────────┘
```
Nguồn tham khảo: (tuan_1_html5/02_basic_structure_html.md + phần: Các thẻ cơ bản trong <body>)

## Câu A4
Sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>` là:

`<thead>`: tiêu đề cột,nằm ở đầu bảng

`<tbody>`: dữ liệu chính,nằm ở giữa bảng

`<tfoot>`: tổng kết,nằm ở phần cuối bản dù có xếp không đúng thứ tự 3 thẻ trên thì dữ liệu nó vẫn sẽ hiển thị theo thứ tự là `<thead>` -> `<tbody>` -> `<tfoot>`

(tham chiếu tuan_1_html5/05_tables_hyperlinks.md + phần: Table bảng dữ liệu)

Không nên dùng table cho việc làm layout là vì:
- Sai semantic
- Code phức tạp, khó bảo trì
- Layout bằng table phải lồng `<tr>`, `<td>` chằng chịt, rất khó đọc và 

(tuan_1_html5/05_tables_hyperlinks.md + phần: Table bảng dữ liệu)

# Phần B - Thực hành code 
## Câu B3

  Lỗi 1: Dòng 1 — `<!DOCTYPE>` thiếu khai báo html — Sửa thành `<!DOCTYPE html>`

  Lỗi 2: Dòng 2 — `<html>` thiếu thuộc tính lang — Sửa thành `<html lang="vi">`

  Lỗi 3: Dòng 4 — `<title>`Trang web không có thẻ đóng — Sửa thành `<title>Trang web</title>`

  Lỗi 4: Dòng 5 — `<meta charset="utf8">` sai giá trị charset — Sửa thành `<meta charset="UTF-8">`

  Lỗi 5: Dòng 8 — `<h1>Welcome to ShopTLU<h1>` thẻ đóng thiếu dấu / — Sửa thành `<h1>Welcome to ShopTLU</h1>`

  Lỗi 6: Dòng 11 — `<a href="home">Trang chủ<a>` thẻ đóng thiếu dấu / và href không dùng # — Sửa thành `<a href="#home">Trang chủ</a>`

  Lỗi 7: Dòng 19 — `<img src=iphone.jpg>` src không có dấu nháy và thiếu thuộc tính alt — Sửa thành `<img src="iphone.jpg" alt="iPhone 16 Pro">`

  Lỗi 8: Dòng 21 — `<p>Giá: <b>25.990.000đ</p></b>` thẻ đóng bị lồng sai thứ tự — Sửa thành `<p>Giá: <b>25.990.000đ</b></p>`

  Lỗi 9: Dòng 26 — Hàng đầu tiên của bảng dùng `<td>` thay vì `<th>`, và bảng thiếu `<thead>/<tbody>` — Sửa bằng cách thêm `<thead><tbody>` và đổi `<td>` thành `<th>` cho hàng tiêu đề

  Lỗi 10: Dòng 40 — Dùng `<main>` lần 2 cho sidebar — Một trang chỉ được có 1 thẻ `<main>`, sidebar phải dùng `<aside>` — Sửa thành `<aside>` nằm trong `<main>`

  Lỗi 11: Dòng 17 — `<h1>` nằm ngoài `<header>` và đứng trước `<header>` — Semantic sai, `<h1>` nên nằm trong `<header>`

  Lỗi 12: Dòng 45 — `<p>`Copyright 2026 không có thẻ đóng `</p>` — Sửa thành `<p>Copyright 2026</p>`

  Lỗi 13: Dòng 20 — `<h3>Sản phẩm hot</h3>` nhảy từ `<h1>` xuống thẳng `<h3>`, bỏ qua `<h2>` — Sai cấu trúc heading, sửa thành `<h2>`


## Câu B4:
Trong trang web thegioididong.com:

### 1. 3 thẻ semantic HTML5 mà trang đó sử dụng:
- thẻ header
- thẻ section
- thẻ footer
### 2. thẻ table hiển thị nội dung chi tiết của loại điện thoại
### 3. thẻ form 
Form có action là <action="/tim-kiem">. Khi submit, dữ liệu sẽ được gửi đến đường dẫn /tim-kiem
Không có method nên sẽ mặc định là GET
Input có 2 loại là text để nhập và button để click

# Phần C - Suy luận
## Câu C1
```html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>iPhone 16 Pro — ShopTLU</title>
  </head>
  <body>
    <header>
      <!-- header: phần đầu trang, chứa logo và nav -->
      <div class="logo">ShopTLU</div>
      <!-- div: nhóm logo -->
      <nav>
        <!-- nav: điều hướng chính của trang -->
        <ul>
          <!-- ul: danh sách menu không có thứ tự -->
          <li><a href="#home">Trang chủ</a></li>
          <li><a href="#products">Sản phẩm</a></li>
          <li><a href="#contact">Liên hệ</a></li>
        </ul>
      </nav>
    </header>

    <nav aria-label="breadcrumb">
      <!-- nav: điều hướng phụ, aria-label phân biệt với nav chính -->
      <ol>
        <!-- ol: có thứ tự rõ ràng (Trang chủ > Điện thoại > Sản phẩm) -->
        <li><a href="#">Trang chủ</a></li>
        <li><a href="#">Điện thoại</a></li>
        <li aria-current="page">iPhone 16 Pro</li>
        <!-- aria-current: báo đây là trang hiện tại -->
      </ol>
    </nav>

    <main>
      <!-- main: nội dung chính, mỗi trang chỉ có 1 thẻ main -->

      <section id="product-detail">
        <!-- section: khu vực thông tin sản phẩm có chủ đề rõ ràng -->

        <figure>
          <!-- figure: nhóm ảnh có liên quan đến nhau -->
          <img
            src="https://placehold.co/600x400"
            alt="iPhone 16 Pro - ảnh chính"
            loading="lazy"
          />
          <!-- loading = lazy là khi người dùng lướt đến mới load ảnh -->
          <img
            src="https://placehold.co/100x100"
            alt="iPhone 16 Pro - ảnh 2"
            loading="lazy"
          />
          <img
            src="https://placehold.co/100x100"
            alt="iPhone 16 Pro - ảnh 3"
            loading="lazy"
          />
          <img
            src="https://placehold.co/100x100"
            alt="iPhone 16 Pro - ảnh 4"
            loading="lazy"
          />
          <img
            src="https://placehold.co/100x100"
            alt="iPhone 16 Pro - ảnh 5"
            loading="lazy"
          />
          <figcaption>iPhone 16 Pro — 5 góc nhìn</figcaption>
          <!-- figcaption: mô tả cho figure -->
        </figure>

        <article>
          <!-- article: thông tin sản phẩm là nội dung độc lập, có thể đứng riêng -->
          <h1>iPhone 16 Pro</h1>
          <!-- h1: tiêu đề quan trọng nhất trang -->
          <p><strong>25.990.000đ</strong></p>
          <!-- strong: nhấn mạnh giá, có ngữ nghĩa "quan trọng" -->
          <div class="rating">
            <!-- div: nhóm đánh giá sao, không có thẻ semantic phù hợp hơn -->
            <span>★★★★★</span>
            <!-- span: inline text, không cần block element -->
            <span>(1.234 đánh giá)</span>
          </div>
          <p>
            Chip A18 Pro, Camera 48MP, màn hình 6.3 inch Super Retina XDR, pin
            cả ngày.
          </p>
        </article>
      </section>

      <section id="specs">
        <!-- section: khu vực thông số kỹ thuật riêng biệt -->
        <h2>Thông số kỹ thuật</h2>
        <table border="1">
          <!-- table: đúng mục đích hiển thị dữ liệu dạng bảng -->
          <thead>
            <!-- thead: phân biệt phần tiêu đề với dữ liệu -->
            <tr>
              <th>Thông số</th>
              <!-- th: tiêu đề cột, Google hiểu đây là nhãn -->
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            <!-- tbody: chứa dữ liệu chính của bảng -->
            <tr>
              <td>Chip</td>
              <td>Apple A18 Pro</td>
            </tr>
            <tr>
              <td>RAM</td>
              <td>8GB</td>
            </tr>
            <tr>
              <td>Bộ nhớ</td>
              <td>256GB</td>
            </tr>
            <tr>
              <td>Camera</td>
              <td>48MP + 12MP + 12MP</td>
            </tr>
            <tr>
              <td>Pin</td>
              <td>3274mAh</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="reviews">
        <!-- section: khu vực đánh giá riêng biệt -->
        <h2>Đánh giá từ khách hàng</h2>

        <article>
          <!-- article: mỗi bình luận là nội dung độc lập -->
          <h3>Nguyễn Văn A</h3>
          <p>Sản phẩm rất tốt, giao hàng nhanh!</p>
        </article>

        <article>
          <h3>Trần Thị B</h3>
          <p>Camera chụp đẹp, pin trâu, rất hài lòng.</p>
        </article>
      </section>

      <aside>
        <!-- aside: sản phẩm tương tự là nội dung phụ, bỏ đi không ảnh hưởng nội dung chính -->
        <h2>Sản phẩm tương tự</h2>
        <ul>
          <!-- ul: danh sách sản phẩm không có thứ tự -->
          <li>
            <a href="#">
              <img
                src="https://placehold.co/150x100"
                alt="iPhone 15 Pro"
                loading="lazy"
              />
              <p>iPhone 15 Pro</p>
              <p><strong>22.990.000đ</strong></p>
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="https://placehold.co/150x100"
                alt="Samsung Galaxy S25"
                loading="lazy"
              />
              <p>Samsung Galaxy S25</p>
              <p><strong>22.490.000đ</strong></p>
            </a>
          </li>
        </ul>
      </aside>
    </main>

    <footer>
      <!-- footer: chân trang -->
      <p>&copy; 2026 ShopTLU. All rights reserved.</p>
      <nav>
        <!-- nav: điều hướng footer -->
        <a href="#">Chính sách bảo mật</a>
        <a href="#">Liên hệ</a>
        <a href="#">FAQ</a>
      </nav>
    </footer>
  </body>
</html>
```
## Câu C2
  Quan điểm “dùng `<div>` cho mọi thứ” tưởng nhanh nhưng không tối ưu. Về SEO, các thẻ semantic như `<header>`, `<article>`, `<nav>` giúp Google hiểu cấu trúc trang, từ đó xếp hạng tốt hơn. Nếu chỉ dùng `<div>`, nội dung trở nên “vô nghĩa” với máy tìm kiếm.
  Về Accessibility, screen reader dựa vào semantic HTML để hỗ trợ người khiếm thị điều hướng nhanh (ví dụ nhảy tới `<nav>`). Dùng toàn `<div>` sẽ làm trải nghiệm kém hơn.
  Ví dụ: trong trang blog, dùng `<article>` cho mỗi bài viết giúp công cụ tìm kiếm và người dùng hiểu rõ nội dung chính, tốt hơn nhiều so với `<div class="post">`.
  Tuy vậy, `<div>` vẫn hữu ích cho layout (flexbox, grid) hoặc các khối không mang ý nghĩa nội dung.
  Kết luận: semantic HTML không thừa, mà giúp code rõ ràng, tốt cho SEO và người dùng.

# Phần D - Video Thực hành OBS
link gg drive phần video PBT_01 https://drive.google.com/file/d/1UHN0PrYhw1E9ukiSuGYsT1IOeUg5QkTi/view?usp=sharing