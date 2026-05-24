// =============================================
// CÂU A1 — var / let / const
// Chạy file này để kiểm tra dự đoán
// =============================================

// Đoạn 1 — var hoisting
// Dự đoán: undefined
console.log("Đoạn 1:", x);
var x = 5;

// Đoạn 2 — let temporal dead zone
// Dự đoán: ReferenceError
try {
    console.log("Đoạn 2:", y);
    let y = 10;
} catch (e) {
    console.log("Đoạn 2 lỗi:", e.message);
}

// Đoạn 3 — const không gán lại được
// Dự đoán: TypeError
try {
    const z = 15;
    z = 20;
    console.log("Đoạn 3:", z);
} catch (e) {
    console.log("Đoạn 3 lỗi:", e.message);
}

// Đoạn 4 — const array vẫn thay đổi nội dung được
// Dự đoán: [1, 2, 3, 4]
const arr = [1, 2, 3];
arr.push(4);
console.log("Đoạn 4:", arr);

// Đoạn 5 — let có block scope
// Dự đoán: "Trong block: 2" rồi "Ngoài block: 1"
let a = 1;
{
    let a = 2;
    console.log("Đoạn 5 - Trong block:", a);
}
console.log("Đoạn 5 - Ngoài block:", a);