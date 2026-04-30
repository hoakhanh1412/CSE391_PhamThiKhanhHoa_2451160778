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
