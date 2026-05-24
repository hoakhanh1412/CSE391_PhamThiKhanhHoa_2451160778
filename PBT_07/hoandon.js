// =============================================
// CÂU C2 — Tính hóa đơn nhà hàng
// =============================================

var danhSachMon = [
    { ten: "Pho bo",   gia: 65000, soLuong: 2 },
    { ten: "Tra da",   gia:  5000, soLuong: 3 },
    { ten: "Bun cha",  gia: 55000, soLuong: 1 },
    { ten: "Com suon", gia: 70000, soLuong: 2 },
];

var coTip = true; // true/false tùy chọn


// =============================================
// CÁC HÀM XỬ LÝ
// =============================================

// Định dạng số tiền: 200000 → "200.000d"
function formatTien(so) {
    return so.toLocaleString('vi-VN') + "d";
}

// Căn phải chuỗi số tiền trong ô hóa đơn
function padTrai(str, do_rong) {
    while (str.length < do_rong) str = " " + str;
    return str;
}

// Căn phải chuỗi chữ
function padPhai(str, do_rong) {
    while (str.length < do_rong) str = str + " ";
    return str;
}

// Tính tổng tiền từng món
function tinhTongCong(danhSach) {
    var tong = 0;
    for (var i = 0; i < danhSach.length; i++) {
        tong += danhSach[i].gia * danhSach[i].soLuong;
    }
    return tong;
}

// Tính % giảm giá theo tổng tiền
function tinhPhanTramGiam(tong) {
    if (tong > 1000000) return 15;
    if (tong > 500000)  return 10;
    return 0;
}

// Kiểm tra hôm nay có phải thứ 4 không (Wednesday = 3)
function laHuTu() {
    var ngayHomNay = new Date().getDay(); // 0=CN, 1=T2, ..., 3=T4
    return ngayHomNay === 3;
}


// =============================================
// TÍNH TOÁN HÓA ĐƠN
// =============================================

var tongCong      = tinhTongCong(danhSachMon);
var phanTramGiam  = tinhPhanTramGiam(tongCong);
var giamThu4      = laHuTu() ? 5 : 0;
var tongGiam      = phanTramGiam + giamThu4;
var soTienGiam    = Math.round(tongCong * tongGiam / 100);
var tongSauGiam   = tongCong - soTienGiam;
var soTienVAT     = Math.round(tongSauGiam * 8 / 100);
var soTienTip     = coTip ? Math.round(tongSauGiam * 5 / 100) : 0;
var thanhToan     = tongSauGiam + soTienVAT + soTienTip;


// =============================================
// IN HÓA ĐƠN
// =============================================

var RONG = 42; // độ rộng hóa đơn

function dongKe(ky, so_lan) {
    var s = "";
    for (var i = 0; i < so_lan; i++) s += ky;
    return s;
}

function dongHoaDon(noi_dung) {
    // Tự động căn cho vừa 40 ký tự giữa 2 dấu ||
    var spaces = RONG - 2 - noi_dung.length;
    var padding = "";
    for (var i = 0; i < spaces; i++) padding += " ";
    console.log("║" + noi_dung + padding + "║");
}

// In hóa đơn
console.log("╔" + dongKe("═", RONG - 2) + "╗");
dongHoaDon("        HOA DON NHA HANG          ");
console.log("╠" + dongKe("═", RONG - 2) + "╣");

// Danh sách món
for (var i = 0; i < danhSachMon.length; i++) {
    var mon       = danhSachMon[i];
    var thanTien  = mon.gia * mon.soLuong;
    var stt       = (i + 1) + ". ";
    var ten       = padPhai(mon.ten, 10);
    var sl        = "x" + mon.soLuong;
    var donGia    = "@" + padPhai((mon.gia / 1000) + "k", 5);
    var tt        = "= " + (thanTien / 1000) + "k";
    dongHoaDon(" " + stt + ten + " " + sl + "  " + donGia + " " + tt);
}

console.log("╠" + dongKe("═", RONG - 2) + "╣");

// Tổng hợp
var labelGiam = "Giam gia (" + tongGiam + "%)";
if (giamThu4 > 0) labelGiam += " (co T4)";

dongHoaDon(" Tong cong:          " + padTrai(formatTien(tongCong), 12));
dongHoaDon(" " + padPhai(labelGiam + ":", 21) + padTrai(formatTien(soTienGiam), 12));
dongHoaDon(" VAT (8%):           " + padTrai(formatTien(soTienVAT), 12));

if (coTip) {
    dongHoaDon(" Tip (5%):           " + padTrai(formatTien(soTienTip), 12));
} else {
    dongHoaDon(" Tip:                     Khong co");
}

console.log("╠" + dongKe("═", RONG - 2) + "╣");
dongHoaDon(" THANH TOAN:         " + padTrai(formatTien(thanhToan), 12));
console.log("╚" + dongKe("═", RONG - 2) + "╝");