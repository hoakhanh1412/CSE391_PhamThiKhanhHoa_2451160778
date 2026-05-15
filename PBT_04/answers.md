# Phần A: Kiểm tra đọc hiểu

## Câu A1 — 5 Loại Positioning

| Position   | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí                        | Cuộn theo trang?                        | Use case                                  |
| ---------- | ------------------------- | ---------------------------------------- | --------------------------------------- | ----------------------------------------- |
| `static`   | Có                        | Không dùng top/left/bottom/right         | Có                                      | Mặc định, không cần can thiệp             |
| `relative` | Có                        | Vị trí gốc của chính nó                  | Có                                      | Dịch chuyển nhẹ, làm mốc cho absolute con |
| `absolute` | Không                     | Thẻ cha gần nhất có position khác static | Có (cuộn cùng cha)                      | Badge trên icon, dropdown, tooltip        |
| `fixed`    | Không                     | Cửa sổ trình duyệt                       | Không — luôn dính tại chỗ               | Chat button, modal overlay                |
| `sticky`   | Có → Không (khi dính)     | Cửa sổ trình duyệt (sau khi đạt ngưỡng)  | Có → Không (dính khi scroll đến ngưỡng) | Sticky header, sidebar                    |

- `position: absolute` sẽ tự leo lên cây HTML để tìm thẻ cha gần nhất có `position` khác `static`. Nếu tìm thấy thì dùng thẻ đó làm gốc tính tọa độ. Nếu leo hết lên mà không thấy thì tính từ body.
- Nearest positioned ancestor" là thẻ cha gần nhất có khai báo `position` khác `static`.

## Câu A2 — Flexbox vs Grid

1. Trường hợp 1

```css
.container {
  display: flex;
}
.item {
  flex: 1;
}
/* 4 items */
```

```
┌─────────────────────────────────────────────────────┐
│  CONTAINER (100% width)                             │
│ ┌──────────┬──────────┬──────────┬──────────┐       │
│ │  Item 1  │  Item 2  │  Item 3  │  Item 4  │       │
│ │  (25%)   │  (25%)   │  (25%)   │  (25%)   │       │
│ └──────────┴──────────┴──────────┴──────────┘       │
└─────────────────────────────────────────────────────┘
```

Giải thích:

- `display: flex` → các item xếp thành 1 hàng ngang (mặc định `flex-direction: row`)
- `flex: 1` = `flex-grow: 1; flex-shrink: 1; flex-basis: 0%`
- Cả 4 item cùng `flex: 1` → chia đều container theo chiều ngang

2. Trường hợp 2

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 45%;
  margin: 2.5%;
}
/* 6 items */
```

```
┌─────────────────────────────────────────────────────┐
│  CONTAINER                                          │
│  ┌───────────────┐  ┌───────────────┐               │
│  │    Item 1     │  │    Item 2     │               │
│  │  (45% + 5%m)  │  │  (45% + 5%m)  │               │
│  └───────────────┘  └───────────────┘               │
│  ┌───────────────┐  ┌───────────────┐               │
│  │    Item 3     │  │    Item 4     │               │
│  └───────────────┘  └───────────────┘               │
│  ┌───────────────┐  ┌───────────────┐               │
│  │    Item 5     │  │    Item 6     │               │
│  └───────────────┘  └───────────────┘               │
└─────────────────────────────────────────────────────┘
```

Giải thích:

- Mỗi item chiếm: `width 45% + margin-left 2.5% + margin-right 2.5%` = 50% tổng chiều ngang
- `flex-wrap: wrap` → khi không đủ chỗ, item xuống hàng
- 100% ÷ 50% = 2 item mỗi hàng
- 6 items ÷ 2 = 3 hàng

3. Trường hợp 3

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* 3 items */
```

```
┌─────────────────────────────────────────────────────┐
│  CONTAINER                                          │
│                                                     │
│  ┌────────┐          ┌────────┐          ┌────────┐ │
│  │ Item 1 │          │ Item 2 │          │ Item 3 │ │
│  └────────┘          └────────┘          └────────┘ │
│    (trái)             (giữa)               (phải)   │
│                                                     │
└─────────────────────────────────────────────────────┘
     ↑                    ↑                    ↑
  sát trái          căn giữa ngang          sát phải
  (cả 3 đều căn giữa dọc nhờ align-items: center)
```

Giải thích:

- `justify-content: space-between` → item đầu sát trái, item cuối sát phải, item giữa chính giữa, khoảng cách đều nhau giữa các items
- `align-items: center` → tất cả items căn giữa theo chiều dọc

4. Trường hợp 4

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 20px;
}
/* 3 items */
```

```
┌─────────────────────────────────────────────────────┐
│  CONTAINER (ví dụ 1000px)                           │
│                                                     │
│ ┌──────────┐ ┌──────────────────────┐ ┌──────────┐  │
│ │          │ │                      │ │          │  │
│ │  Item 1  │ │       Item 2         │ │  Item 3  │  │
│ │  200px   │ │   1fr (linh động)    │ │  200px   │  │
│ │          │ │                      │ │          │  │
│ └──────────┘ └──────────────────────┘ └──────────┘  │
│   ← 200px →  ←────── ~560px ────────→  ← 200px →    │
│              (gap 20px giữa mỗi cột)                │
└─────────────────────────────────────────────────────┘
```

Giải thích:

- Cột 1: cố định 200px
- Cột 2: `1fr` = chiếm toàn bộ phần còn lại sau khi trừ 200px + 200px + 2 khoảng gap
- Cột 3: cố định 200px
- Tính width cột giữa (giả sử container = 1000px):`1fr = 1000px - 200px - 200px - (20px × 2) = 560px`

5. Trường hợp 5

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
/* 7 items */
```

```
┌─────────────────────────────────────────────────────┐
│  CONTAINER                                          │
│                                                     │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │
│ │   Item 1    │ │   Item 2    │ │   Item 3    │     │
│ └─────────────┘ └─────────────┘ └─────────────┘     │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │
│ │   Item 4    │ │   Item 5    │ │   Item 6    │     │
│ └─────────────┘ └─────────────┘ └─────────────┘     │
│ ┌─────────────┐                                     │
│ │   Item 7    │   (trống)          (trống)          │
│ └─────────────┘                                     │
│   ← 1fr →       ← 1fr →           ← 1fr →           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

Giải thích:

- `repeat(3, 1fr)` → 3 cột đều nhau
- 7 items ÷ 3 cột = 2 hàng đầy + 1 hàng thiếu
- Hàng 1: Item 1, 2, 3
- Hàng 2: Item 4, 5, 6
- Hàng 3: Item 7 — chỉ có 1 item, nằm ở cột đầu tiên (trái)
- Item 7 không tự kéo rộng ra để lấp đầy — nó giữ nguyên kích thước `1fr` của cột

## Câu C1 — Flexbox vs Grid

### 1. Navigation bar ngang (logo + menu + buttons)

**Dùng:** Flexbox

**Giải thích:**  
Navbar là layout 1 chiều ngang.  
Flexbox phù hợp để:
- căn trái/phải
- căn giữa theo chiều dọc
- tạo khoảng cách đều giữa các items

Ví dụ:
```css
display: flex;
justify-content: space-between;
align-items: center;
```

---

### 2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)

**Dùng:** Grid

**Giải thích:**  
Đây là layout dạng lưới gồm hàng và cột.  
CSS Grid giúp:
- chia cột đều nhau
- tự động xuống hàng
- quản lý layout 2 chiều dễ dàng

Ví dụ:
```css
display: grid;
grid-template-columns: repeat(3, 1fr);
```

---

### 3. Layout blog: main content + sidebar

**Dùng:** Grid

**Giải thích:**  
Layout blog gồm nhiều vùng:
- sidebar
- main content

Grid phù hợp cho layout tổng thể theo vùng và cột.

Ví dụ:
```css
grid-template-columns: 250px 1fr;
```

---

### 4. Footer với 4 cột thông tin

**Dùng:** Grid

**Giải thích:**  
Footer có nhiều cột đều nhau nên Grid giúp chia bố cục rõ ràng và dễ quản lý hơn.

Ví dụ:
```css
display: grid;
grid-template-columns: repeat(4, 1fr);
```

---

### 5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)

**Dùng:** Flexbox

**Giải thích:**  
Card là layout theo chiều dọc:
- ảnh
- text
- button

Flexbox hỗ trợ sắp xếp theo cột và dùng:
```css
margin-top: auto;
```

để đẩy nút xuống đáy card.

---

 Tóm tắt

| Tình huống | Nên dùng |
|---|---|
| Navbar ngang | Flexbox |
| Lưới ảnh Instagram | Grid |
| Blog + Sidebar | Grid |
| Footer 4 cột | Grid |
| Card sản phẩm | Flexbox |

## Câu C2 — Debug Flexbox

---

### Lỗi 1 — Cards không đều chiều cao, nút "Mua" bị nhảy

 Nguyên nhân

Các card có lượng text khác nhau nên chiều cao mỗi card khác nhau.  
Nút `.btn` không được đẩy xuống đáy card nên vị trí bị lệch.

---

 Code lỗi

```css
.card-container {
    display: flex;
    flex-wrap: wrap;
}

.card {
    width: 30%;
    margin: 1.5%;
}

.card img {
    width: 100%;
}

.card h3 {
    font-size: 18px;
}

.card .btn {
    padding: 10px;
}
```

---

 Code sửa

```css
.card-container {
    display: flex;
    flex-wrap: wrap;
}

.card {
    width: 30%;
    margin: 1.5%;

    display: flex;
    flex-direction: column;
}

.card img {
    width: 100%;
}

.card h3 {
    font-size: 18px;
}

.card .btn {
    padding: 10px;

    margin-top: auto;
}
```

---

## Giải thích sửa

- `display: flex`
- `flex-direction: column`

giúp card sắp xếp theo chiều dọc.

`margin-top: auto;`
sẽ đẩy nút xuống đáy card → tất cả nút nằm cùng hàng.

---


### Lỗi 2 — Item không nằm giữa màn hình

 Nguyên nhân

Container `.hero` chỉ có:
```css
display: flex;
```

nhưng chưa dùng:
- `justify-content`
- `align-items`

nên item mặc định nằm góc trái trên.

---

 Code lỗi

```css
.hero {
    height: 100vh;
    display: flex;
}

.hero-content {
    text-align: center;
}
```

---

 Code sửa

```css
.hero {
    height: 100vh;

    display: flex;

    justify-content: center;
    align-items: center;
}

.hero-content {
    text-align: center;
}
```

---

## Giải thích sửa

- `justify-content: center`
→ căn giữa theo chiều ngang

- `align-items: center`
→ căn giữa theo chiều dọc

Kết quả: nội dung nằm chính giữa màn hình.

---

---

### Lỗi 3 — Sidebar bị co lại

 Nguyên nhân

Trong Flexbox, các item mặc định có thể bị co (`flex-shrink: 1`).

Khi content quá dài, sidebar bị ép nhỏ lại.

---

 Code lỗi

```css
.layout {
    display: flex;
}

.sidebar {
    width: 250px;
}

.content {
    flex: 1;
}
```

---

 Code sửa

```css
.layout {
    display: flex;
}

.sidebar {
    width: 250px;

    flex-shrink: 0;
}

.content {
    flex: 1;
}
```

---

## Giải thích sửa

`flex-shrink: 0;`

ngăn sidebar bị co nhỏ khi content dài.

Sidebar sẽ luôn giữ đúng chiều rộng 250px.

---
