function StudentCard() {
    return (
        <div className="card">         {/* class → className */}
            <img src="avatar.png" alt="Avatar" />  {/* Đóng thẻ */}
            <h2>Hòa Khánh</h2>
            <p>Sinh viên năm 2</p>
            <label htmlFor="email">Email:</label>   {/* for → htmlFor */}
            <input type="email" id="email" />       {/* Đóng thẻ */}
        </div>
    );
}

export default StudentCard;