// =============================================
// BÀI B1 — Máy tính đơn giản
// =============================================

function calculate(num1, operator, num2) {

    // Kiểm tra input có phải số không
    if (isNaN(num1) || isNaN(num2)) {
        return "Lỗi: Input không phải số";
    }

    // Chuyển về số phòng trường hợp truyền vào dạng string số "10"
    num1 = Number(num1);
    num2 = Number(num2);

    // Kiểm tra operator hợp lệ
    var validOperators = ["+", "-", "*", "/", "%", "**"];
    if (validOperators.indexOf(operator) === -1) {
        return "Lỗi: Operator '" + operator + "' không hợp lệ";
    }

    // Kiểm tra chia cho 0
    if ((operator === "/" || operator === "%") && num2 === 0) {
        return "Lỗi: Không thể chia cho 0";
    }

    // Tính toán
    if (operator === "+")  return num1 + num2;
    if (operator === "-")  return num1 - num2;
    if (operator === "*")  return num1 * num2;
    if (operator === "/")  return num1 / num2;
    if (operator === "%")  return num1 % num2;
    if (operator === "**") return Math.pow(num1, num2);
}

// Test
console.log(calculate(10, "+", 5));      // 15
console.log(calculate(10, "/", 0));      // Lỗi: Không thể chia cho 0
console.log(calculate(10, "^", 5));      // Lỗi: Operator '^' không hợp lệ
console.log(calculate("abc", "+", 5));   // Lỗi: Input không phải số
console.log(calculate(2, "**", 10));     // 1024