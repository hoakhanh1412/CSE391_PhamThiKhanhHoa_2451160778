// =============================================
// BÀI B2 — Xử lý dữ liệu sinh viên
// =============================================

const students = [
    { name: "An",    math: 8,  physics: 7, cs: 9, gender: "M" },
    { name: "Bình",  math: 6,  physics: 9, cs: 7, gender: "F" },
    { name: "Chi",   math: 9,  physics: 6, cs: 8, gender: "F" },
    { name: "Dũng",  math: 5,  physics: 5, cs: 6, gender: "M" },
    { name: "Em",    math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3,  physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7,  physics: 7, cs: 7, gender: "F" },
    { name: "Huy",   math: 4,  physics: 6, cs: 3, gender: "M" },
];


// =============================================
// BƯỚC 1: Tính điểm trung bình và xếp loại
// =============================================

function tinhTB(sv) {
    return sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;
}

function xepLoai(tb) {
    if (tb >= 8.0) return "Giỏi";
    if (tb >= 6.5) return "Khá";
    if (tb >= 5.0) return "Trung bình";
    return "Yếu";
}

// Thêm tb và xepLoai vào từng sinh viên
for (var i = 0; i < students.length; i++) {
    students[i].tb      = tinhTB(students[i]);
    students[i].loai    = xepLoai(students[i].tb);
}


// =============================================
// BƯỚC 2: In bảng kết quả
// =============================================

console.log("| STT | Tên    | TB   | Xếp loại   |");
console.log("|-----|--------|------|------------|");

for (var i = 0; i < students.length; i++) {
    var sv  = students[i];
    var stt = String(i + 1).padEnd(3);
    var ten = sv.name.padEnd(6);
    var tb  = sv.tb.toFixed(1).padEnd(4);
    var loai = sv.loai.padEnd(10);
    console.log("| " + stt + " | " + ten + " | " + tb + " | " + loai + " |");
}


// =============================================
// BƯỚC 3: Đếm số SV mỗi xếp loại
// =============================================

var demLoai = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };

for (var i = 0; i < students.length; i++) {
    demLoai[students[i].loai]++;
}

console.log("\n--- Số SV mỗi xếp loại ---");
console.log("Giỏi      :", demLoai["Giỏi"]);
console.log("Khá       :", demLoai["Khá"]);
console.log("Trung bình:", demLoai["Trung bình"]);
console.log("Yếu       :", demLoai["Yếu"]);


// =============================================
// BƯỚC 4: Tìm SV cao nhất và thấp nhất
// =============================================

var caoNhat = students[0];
var thapNhat = students[0];

for (var i = 1; i < students.length; i++) {
    if (students[i].tb > caoNhat.tb)   caoNhat  = students[i];
    if (students[i].tb < thapNhat.tb)  thapNhat = students[i];
}

console.log("\n--- Điểm cao nhất / thấp nhất ---");
console.log("Cao nhất :", caoNhat.name,  "-", caoNhat.tb.toFixed(1));
console.log("Thấp nhất:", thapNhat.name, "-", thapNhat.tb.toFixed(1));


// =============================================
// BƯỚC 5: Điểm TB toàn lớp từng môn
// =============================================

var tongMath = 0, tongPhysics = 0, tongCs = 0;

for (var i = 0; i < students.length; i++) {
    tongMath    += students[i].math;
    tongPhysics += students[i].physics;
    tongCs      += students[i].cs;
}

var n = students.length;

console.log("\n--- Điểm TB toàn lớp từng môn ---");
console.log("Toán  :", (tongMath    / n).toFixed(2));
console.log("Lý    :", (tongPhysics / n).toFixed(2));
console.log("CNTT  :", (tongCs      / n).toFixed(2));


// =============================================
// BONUS: Điểm TB theo giới tính
// =============================================

var tongTB_M = 0, demM = 0;
var tongTB_F = 0, demF = 0;

for (var i = 0; i < students.length; i++) {
    if (students[i].gender === "M") {
        tongTB_M += students[i].tb;
        demM++;
    } else {
        tongTB_F += students[i].tb;
        demF++;
    }
}

console.log("\n--- Điểm TB theo giới tính ---");
console.log("Nam (M):", (tongTB_M / demM).toFixed(2));
console.log("Nữ  (F):", (tongTB_F / demF).toFixed(2));