// =============================================
// BÀI B4 — FizzBuzz nâng cao
// =============================================


// =============================================
// VERSION 1: Classic FizzBuzz 1-100
// =============================================

console.log("=== VERSION 1: Classic FizzBuzz ===");

for (var i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log(i + " → FizzBuzz");
    } else if (i % 3 === 0) {
        console.log(i + " → Fizz");
    } else if (i % 5 === 0) {
        console.log(i + " → Buzz");
    } else {
        console.log(i);
    }
}


// =============================================
// VERSION 2: Custom FizzBuzz
// =============================================

function customFizzBuzz(n, rules) {
    console.log("\n=== VERSION 2: Custom FizzBuzz (1 đến " + n + ") ===");

    for (var i = 1; i <= n; i++) {
        var ketQua = "";

        // Duyệt qua từng rule, ghép chữ nếu chia hết
        for (var j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                ketQua += rules[j].word;
            }
        }

        // Nếu không khớp rule nào thì in số
        if (ketQua === "") {
            console.log(i);
        } else {
            console.log(i + " → " + ketQua);
        }
    }
}

// Test theo đề
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);

// Kiểm tra các số đặc biệt đề yêu cầu
console.log("\n=== Kiểm tra số đặc biệt ===");
var rules = [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
];

var soKiemTra = [21, 15, 35, 105];
for (var i = 0; i < soKiemTra.length; i++) {
    var so = soKiemTra[i];
    var ketQua = "";
    for (var j = 0; j < rules.length; j++) {
        if (so % rules[j].divisor === 0) {
            ketQua += rules[j].word;
        }
    }
    console.log(so + " → " + ketQua);
}