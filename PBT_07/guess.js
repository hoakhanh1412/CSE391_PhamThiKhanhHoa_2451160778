// =============================================
// BÀI B3 — Mini Game: Đoán số
// =============================================

// 1. Máy random 1 số từ 1-100
var secretNumber = Math.floor(Math.random() * 100) + 1;
var MAX_LUOT     = 7;
var soLanDoan    = 0;
var daDoan       = []; // lưu các số đã đoán để kiểm tra trùng

alert("Chào mừng đến với Mini Game Đoán Số!\nMáy đã chọn 1 số từ 1 đến 100.\nBạn có tối đa " + MAX_LUOT + " lần đoán. Chúc may mắn!");

// Vòng lặp chính của game
while (soLanDoan < MAX_LUOT) {

    // Nhắc còn bao nhiêu lượt
    var conLai = MAX_LUOT - soLanDoan;
    var input  = prompt("Còn " + conLai + " lượt | Nhập số từ 1 đến 100:");

    // Người dùng bấm Cancel → thoát game
    if (input === null) {
        alert("Bạn đã thoát game. Đáp án là: " + secretNumber);
        break;
    }

    // Validate: phải là số
    var soNhap = Number(input);
    if (input.trim() === "" || isNaN(soNhap)) {
        alert("⚠️ Vui lòng nhập một số hợp lệ!");
        continue; // không tính lượt, hỏi lại
    }

    // Validate: phải trong khoảng 1-100
    if (soNhap < 1 || soNhap > 100 || !Number.isInteger(soNhap)) {
        alert("⚠️ Số phải là số nguyên từ 1 đến 100!");
        continue; // không tính lượt, hỏi lại
    }

    // Kiểm tra đã đoán số này chưa
    var daTrung = false;
    for (var i = 0; i < daDoan.length; i++) {
        if (daDoan[i] === soNhap) {
            daTrung = true;
            break;
        }
    }
    if (daTrung) {
        alert("⚠️ Bạn đã đoán số " + soNhap + " rồi! Hãy thử số khác.");
        continue; // không tính lượt, hỏi lại
    }

    // Lưu số vừa đoán và tăng số lần đoán
    daDoan.push(soNhap);
    soLanDoan++;

    // So sánh và trả lời
    if (soNhap === secretNumber) {
        alert("🎉 Đúng rồi! Bạn đoán đúng sau " + soLanDoan + " lần!\nĐáp án là: " + secretNumber);
        break;
    } else if (soNhap < secretNumber) {
        alert("👆 Cao hơn! (Lần " + soLanDoan + "/" + MAX_LUOT + ")");
    } else {
        alert("👇 Thấp hơn! (Lần " + soLanDoan + "/" + MAX_LUOT + ")");
    }

    // Hết lượt → thua
    if (soLanDoan === MAX_LUOT) {
        alert("💀 Hết lượt! Bạn đã thua.\nĐáp án là: " + secretNumber);
    }
}