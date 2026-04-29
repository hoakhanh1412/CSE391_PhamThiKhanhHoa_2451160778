PHẦN A - KIỂM TRA ĐỌC HIỂU
Câu A1 - HTTP & Browser
1. Khi bạn gõ https://shopee.vn vào trình duyệt và nhấn Enter thứ tự các bước xảy ra là:
- Request xuất phát từ laptop → đi qua router WiFi
- Qua nhà mạng VNPT → chạy xuyên cáp quang dưới đáy Thái Bình Dương
- Đến data center của trụ sở Shopee 
- Server xử lý request 
- Response chạy ngược lại: cáp quang → VNPT → router → laptop
- Chrome nhận file HTML, CSS, JS → render ra giao diện → ta thấy trang Shopee
 (tuan_1_html5\1_introduction_html_universe.md + Phần: 🎬 Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương)
2. Trong DevTools của Chrome, tab Network cho thấy:
requests/responses (tuan_1_html5\01_introduction_html_universe.md + phần 4.3)

Câu A2 - Semantic HTML
- Dùng <div> thay cho thẻ semantic
    + <div class="header"> → nên dùng <header>
    + <div class="main"> → nên dùng <main>
    + <div class="footer"> → nên dùng <footer>
- Menu không dùng <nav> <div class = "menu"> sai
- Tiêu đề sản phẩm không dùng heading 
- Ảnh không có alt google không biết là ảnh gì
Sửa lại lỗi 
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
        <img src="iphone.jpg" alt="iPhone 16 Pro">
    </article>
</main>

<footer>
    <p>© 2026 ShopTLU</p>
</footer>
