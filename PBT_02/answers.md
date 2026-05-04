# Phần A - Kiểm tra đọc hiểu 
## Câu A1 
1. `type="email"` → Ô nhập text, tự kiểm tra có @ → Dùng cho form đăng ký
2. `type="password"` → Ô nhập text, ký tự bị ẩn thành ●, không tự validate → Dùng cho form đăng nhập
3. `type="number"` → Ô nhập số kèm nút tăng/giảm, kiểm tra min/max → Dùng cho chọn số lượng sản phẩm
4. `type="tel"` → Ô nhập text, mobile hiện bàn phím số, không tự validate → Dùng cho form địa chỉ giao hàng
5. `type="date"` → Ô kèm icon lịch, click ra date picker, kiểm tra ngày hợp lệ → Dùng cho chọn ngày giao hàng
6. `type="range"` → Thanh trượt ngang (slider), tự giới hạn trong khoảng min–max → Dùng cho bộ lọc giá sản phẩm
7. `type="checkbox"` → Ô vuông nhỏ, click để tick/bỏ tick, dùng required để bắt buộc → Dùng cho đồng ý điều khoản
8. `type="radio"` → Ô tròn nhỏ, chỉ chọn 1 trong nhóm cùng name → Dùng cho chọn phương thức thanh toán
9. `type="file"` → Nút chọn tệp, giới hạn định dạng bằng accept → Dùng cho upload ảnh đánh giá sản phẩm
10. `type="search"` → Ô nhập text có icon 🔍 kèm nút xóa nhanh, không tự validate → Dùng cho thanh tìm kiếm sản phẩm
## Câu A2
- TH1: Form không submit vì `required` bắt buộc phải có giá trị. `value=""` = rỗng → vi phạm, hiện tooltip "Vui lòng điền vào trường này"
- TH2: Form không submit vì `type="email"` tự validate định dạng phải có `@` và domain. `"abc"` không có `@` → sai định dạng, hiện tooltip "Vui lòng nhập địa chỉ email"
- TH3: Form không submit vì `max="10"` giới hạn giá trị tối đa. `15 > 10` → vi phạm, hiện tooltip "Giá trị phải nhỏ hơn hoặc bằng 10"
- TH4: Form không submit vì `pattern` yêu cầu đúng 10 chữ số liên tiếp. `"abc123"` có chữ cái và chỉ 6 ký tự → không khớp regex, hiện tooltip "Vui lòng khớp định dạng yêu cầu"
- TH5: Form không submit vì `minlength="8"` yêu cầu độ dài tối thiểu 8 ký tự. `"123"` chỉ có 3 ký tự → vi phạm, hiện tooltip "Phải có từ 8 ký tự trở lên"

## Câu A3
1. Tại sao `<label for="email">` quan trọng cho screen reader?

- Screen reader là công cụ hỗ trợ người khiếm thị bằng cách đọc nội dung trên màn hình. Khi người dùng di chuyển (focus) vào một ô input, họ cần biết ô đó dùng để nhập thông tin gì.
- Nếu không có <label>, screen reader chỉ đọc những thông tin chung như “edit field” → không đủ ngữ cảnh, gây khó hiểu.
- Khi có `<label for="email">`, screen reader đọc "Email, edit field" → rõ ràng, người dùng hiểu ngay.

2. Khi nào dùng `<fieldset>` + `<legend>`?

- Dùng khi cần nhóm nhiều input có liên quan thành một khối có ý nghĩa chung.
- Đặc biệt quan trọng với radio và checkbox, vì các lựa chọn này thường cần một câu hỏi hoặc tiêu đề chung.
```html
    <fieldset>
    <legend>Chọn phương thức thanh toán</legend>

    <label>
        <input type="radio" name="payment" value="cod">
        Thanh toán khi nhận hàng
    </label>

    <label>
        <input type="radio" name="payment" value="card">
        Thẻ ngân hàng
    </label>

    <label>
        <input type="radio" name="payment" value="ewallet">
        Ví điện tử
    </label>
    </fieldset>
```
3. `aria-label` dùng khi nào? Tại sao không dùng khi đã có `<label>`?

- `aria-label` dùng khi không thể thêm `<label>` vào HTML, ví dụ nút icon không có chữ, ô tìm kiếm trên header không có label hiển thị.
- Không nên dùng `aria-label` khi đã có `<label>` vì 2 cái sẽ xung đột, `aria-label` sẽ ghi đè `<label>` khiến screen reader bỏ qua label thật.
- `<label>` vừa hỗ trợ screen reader, vừa hiển thị được trên trang, vừa cho phép click vào chữ để focus input → tốt hơn `aria-label` toàn diện hơn.

## Câu A4
1. `Loading = "Lazy"` giúp trì hoãn việc tải ảnh cho đến khi ảnh sắp xuất hiện trong vùng nhìn nó giúp cải thiện: giảm thời gian tải trang ban đầu, tiết kiệm băng thông, tăng hiệu năng. Không nên dùng khi: Ảnh nằm trên màn hình đầu tiên cần hiển thị ngay, ảnh quan trọng, có thể gây hiển thị chậm/ nháy ảnh nếu load muộn

2. Tại sao nên cung cấp nhiều `<source>` trong `<video>`

- Mỗi trình duyệt hỗ trợ các định dạng video khác nhau, không có format nào được hỗ trợ 100% trên mọi trình duyệt.
- Trình duyệt đọc từng `<source>` từ trên xuống, gặp format nào hỗ trợ được thì dùng luôn, bỏ qua các source còn lại.
- Nếu chỉ cung cấp 1 format, user dùng trình duyệt không hỗ trợ format đó sẽ không xem được video.
  3 format video web phổ biến:
- `video/mp4` — hỗ trợ rộng nhất, chạy được trên hầu hết trình duyệt và thiết bị.
- `video/webm` — nhẹ hơn mp4, chất lượng tốt, hỗ trợ tốt trên Chrome và Firefox.
- `video/ogg` — định dạng mở, hỗ trợ trên Firefox và Chrome, ít phổ biến hơn 2 loại trên.

3. Thuộc tính `alt` trên `<img>`

- Hiển thị văn bản thay thế khi ảnh không tải được.
- Screen reader đọc `alt` để mô tả ảnh cho người khiếm thị.
- Công cụ tìm kiếm dùng `alt` để hiểu nội dung ảnh → tốt cho SEO.
- Ảnh sản phẩm iPhone 16 → `alt="iPhone 16 màu đen titan, mặt trước và mặt sau"`
- Ảnh trang trí (decorative) → `alt=""` — để rỗng, screen reader sẽ bỏ qua, tránh đọc những thứ không có nghĩa.
- Ảnh biểu đồ doanh thu Q1/2026 → `alt="Biểu đồ cột doanh thu Q1/2026, tháng 3 đạt cao nhất với 4.2 tỷ đồng"`

## Câu A5
Cách 1 — `<img>`

- Dùng khi ảnh chỉ để minh họa, không cần chú thích hiển thị trên trang.
- Ảnh là một phần của nội dung xung quanh, không đứng độc lập.
  Ví dụ thực tế:
- Avatar người dùng trong header hoặc comment → chỉ cần hiển thị ảnh, không cần caption.

Cách 2 — `<figure>` + `<figcaption>`

- Dùng khi ảnh cần có chú thích hiển thị bên dưới để bổ sung thông tin.
- Ảnh và caption là một khối nội dung độc lập, có thể tách ra khỏi văn bản mà vẫn hiểu được.
  Ví dụ thực tế:
- Trang chi tiết sản phẩm → ảnh sản phẩm kèm tên, giá, màu sắc bên dưới.

# Phần C - Phân tích & Suy luận
## Câu C1
1. Lỗi 1: Dòng 2 — Input "Tên" không có `<label for="...">`, vi phạm accessibility

```html
<label for="name">Tên:</label> <input type="text" id="name" name="name" required />
```

2. Lỗi 2: Dòng 4 — Input email không có `<label>` và thiếu `name`, `id`, `required`

```html
<!-- Sửa -->
<label for="email">Email:</label>
<input type="email" id="email" name="email" placeholder="Email của bạn" required />
```

3. Lỗi 3: Dòng 6 — Input password không có `<label>` và thiếu `name`, `id`, `required`, `minlength`

```html
<!-- Sửa -->
<label for="password">Mật khẩu:</label>
<input type="password" id="password" name="password" placeholder="Mật khẩu" minlength="8" required />
```

4. Lỗi 4: Dòng 7 — Input confirm password không có `<label>` và thiếu `name`, `id`, `required`

```html
<!-- Sửa -->
<label for="confirm-password">Nhập lại mật khẩu:</label>
<input type="password" id="confirm-password" name="confirm-password" placeholder="Nhập lại mật khẩu" minlength="8" required />
```

5. Lỗi 5: Dòng 9 — Input phone dùng `type="text"` thay vì `type="tel"`, thiếu `label`, `name`, `id`, `pattern`

```html
<!-- Sửa -->
<label for="phone">Phone:</label>
<input type="tel" id="phone" name="phone" pattern="[0-9]{10}" value="0901234567" />
```

6. Lỗi 6: Dòng 11 — `<select>` thiếu `<label>`, `name`, `id` và thiếu option mặc định placeholder

```html
<!-- Sửa -->
<label for="city">Thành phố:</label>
<select id="city" name="city">
  <option value="">-- Chọn thành phố --</option>
  <option value="hanoi">Hà Nội</option>
  <option value="hcm">TP.HCM</option>
</select>
```

7. Lỗi 7: Dòng 16 — `<label>` không gắn với checkbox nào, thiếu `<input type="checkbox">`

```html
<!-- Sửa -->
<input type="checkbox" id="terms" name="terms" required />
<label for="terms">Tôi đồng ý điều khoản</label>
```

8. Lỗi 8: Dòng 20 — `<form>` thiếu `action` và `method`

```html
<!-- Sửa -->
<form action="#" method="POST"></form>
```

## Câu C2
1. Pattern regex cho CMND/CCCD và Số tài khoản

- CMND/CCCD đúng 12 chữ số: `pattern="[0-9]{12}"`
- Số tài khoản 10-15 chữ số: `pattern="[0-9]{10,15}"`

2. HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa?

- Chưa đủ, hoàn toàn không đủ cho ứng dụng ngân hàng.
- HTML5 validation chỉ chạy trên trình duyệt, user có thể tắt JavaScript, dùng DevTools sửa DOM, hoặc gửi request thẳng lên server bằng Post mà bỏ qua toàn bộ validation phía frontend.

3. 3 loại validation HTML5 KHÔNG THỂ làm được

- So sánh 2 trường với nhau — ví dụ kiểm tra confirm PIN có khớp PIN không, HTML5 không thể so sánh giá trị giữa 2 input, bắt buộc dùng JavaScript.
- Kiểm tra dữ liệu đã tồn tại trong database — ví dụ email đã được đăng ký chưa, số CCCD đã có tài khoản chưa, phải dùng JavaScript gọi API lên server để kiểm tra.
- Validate theo logic nghiệp vụ phức tạp — ví dụ kiểm tra số CCCD có hợp lệ theo thuật toán của Bộ Công an không, kiểm tra số tài khoản có thuộc ngân hàng nào không, HTML5 chỉ kiểm tra được định dạng bề ngoài.

4. 2 rủi ro bảo mật nếu chỉ validate Frontend, không validate Backend

- Kẻ tấn công bypass hoàn toàn validation — dùng Postman gửi request thẳng lên server với dữ liệu giả mạo, độc hại như SQL injection mà không qua bất kỳ kiểm tra nào vì frontend bị bỏ qua hoàn toàn.
- Dữ liệu rác và giả mạo tràn vào database — kẻ tấn công có thể tạo hàng nghìn tài khoản với CCCD giả, số tài khoản không tồn tại, hoặc inject mã độc vào các trường dữ liệu gây hỏng hệ thống, rò rỉ dữ liệu khách hàng khác.

## Video thực hành OBS 
link gg drive https://drive.google.com/file/d/1OP1Ap8bV7fJ5Uid396o2m8C5erejzDai/view?usp=sharing
