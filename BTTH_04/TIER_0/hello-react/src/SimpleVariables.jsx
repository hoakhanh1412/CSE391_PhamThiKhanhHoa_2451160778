function SimpleVariables() {
    // Các biến JavaScript
    const ten = "Phạm Thị Khánh Hòa";
    const tuoi = 20;
    const laSinhVien = true;
    const monHoc = ["HTML", "CSS", "JS", "React"];

    return (
        <div style={{ padding: "20px" }}>
            <h1>Xin chào {ten}!</h1>
            <p>Tuổi: {tuoi}</p>
            <p>Năm sau: {tuoi + 1}</p>
            <p>Sinh viên: {laSinhVien ? "Có" : "Không"}</p>

            <h2>Môn học yêu thích:</h2>
            <p>{monHoc.join(", ")}</p>
        </div>
    );
}

export default SimpleVariables;