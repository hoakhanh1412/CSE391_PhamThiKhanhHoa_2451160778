const products = [
    {id:1,name:"iPhone 16",price:25990000,category:"phone",image:"https://placehold.co/200",rating:4.8,inStock:true},
    {id:2,name:"Samsung S25",price:23990000,category:"phone",image:"https://placehold.co/200",rating:4.7,inStock:true},
    {id:3,name:"Xiaomi 16",price:14990000,category:"phone",image:"https://placehold.co/200",rating:4.5,inStock:false},

    {id:4,name:"MacBook Air M4",price:32990000,category:"laptop",image:"https://placehold.co/200",rating:4.9,inStock:true},
    {id:5,name:"Dell XPS",price:28990000,category:"laptop",image:"https://placehold.co/200",rating:4.6,inStock:true},
    {id:6,name:"HP Spectre",price:27990000,category:"laptop",image:"https://placehold.co/200",rating:4.4,inStock:true},

    {id:7,name:"iPad Air",price:15990000,category:"tablet",image:"https://placehold.co/200",rating:4.7,inStock:true},
    {id:8,name:"Galaxy Tab",price:13990000,category:"tablet",image:"https://placehold.co/200",rating:4.6,inStock:true},
    {id:9,name:"Xiaomi Pad",price:9990000,category:"tablet",image:"https://placehold.co/200",rating:4.3,inStock:false},

    {id:10,name:"AirPods Pro",price:5990000,category:"accessory",image:"https://placehold.co/200",rating:4.8,inStock:true},
    {id:11,name:"Sony WH1000XM5",price:7990000,category:"accessory",image:"https://placehold.co/200",rating:4.9,inStock:true},
    {id:12,name:"Logitech MX",price:2490000,category:"accessory",image:"https://placehold.co/200",rating:4.5,inStock:true}
];

let selectedCategory = "all";
let searchKeyword = "";
let currentSort = "";
let cartCount = 0;

const app = document.getElementById("app");

createLayout();
updateProducts();

function createLayout() {
    const container = document.createElement("div");
    container.className = "container";

    container.innerHTML = `
        <div class="top-bar">
            <input type="text" id="searchInput" placeholder="Search product...">

            <div class="category-buttons">
                <button data-category="all">All</button>
                <button data-category="phone">Phone</button>
                <button data-category="laptop">Laptop</button>
                <button data-category="tablet">Tablet</button>
                <button data-category="accessory">Accessory</button>
            </div>

            <select id="sortSelect">
                <option value="">Sort</option>
                <option value="priceAsc">Price ↑</option>
                <option value="priceDesc">Price ↓</option>
                <option value="name">Name A-Z</option>
                <option value="rating">Highest Rating</option>
            </select>

            <button id="darkBtn">🌙 Dark Mode</button>

            <div class="cart">
                🛒
                <span class="badge" id="cartBadge">0</span>
            </div>
        </div>

        <div class="products" id="productContainer"></div>
    `;

    app.appendChild(container);

    document
        .getElementById("searchInput")
        .addEventListener("input", (e) => {
            searchKeyword = e.target.value.toLowerCase();
            updateProducts();
        });

    document
        .querySelectorAll("[data-category]")
        .forEach(btn => {
            btn.addEventListener("click", () => {
                selectedCategory = btn.dataset.category;
                updateProducts();
            });
        });

    document
        .getElementById("sortSelect")
        .addEventListener("change", (e) => {
            currentSort = e.target.value;
            updateProducts();
        });

    document
        .getElementById("darkBtn")
        .addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });
}

function updateProducts() {

    let result = [...products];

    if(searchKeyword){
        result = result.filter(product =>
            product.name.toLowerCase().includes(searchKeyword)
        );
    }

    if(selectedCategory !== "all"){
        result = result.filter(product =>
            product.category === selectedCategory
        );
    }

    switch(currentSort){

        case "priceAsc":
            result.sort((a,b)=>a.price-b.price);
            break;

        case "priceDesc":
            result.sort((a,b)=>b.price-a.price);
            break;

        case "name":
            result.sort((a,b)=>a.name.localeCompare(b.name));
            break;

        case "rating":
            result.sort((a,b)=>b.rating-a.rating);
            break;
    }

    renderProducts(result);
}

function renderProducts(productList) {

    const container =
        document.getElementById("productContainer");

    container.innerHTML = "";

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <p>${product.price.toLocaleString()} đ</p>
            <p>⭐ ${product.rating}</p>
            <button class="add-cart">
                Add To Cart
            </button>
        `;

        card.addEventListener("click", () => {
            showModal(product);
        });

        card
            .querySelector(".add-cart")
            .addEventListener("click",(e)=>{

                e.stopPropagation();

                cartCount++;

                document.getElementById(
                    "cartBadge"
                ).textContent = cartCount;
            });

        container.appendChild(card);
    });
}

function showModal(product){

    const overlay =
        document.createElement("div");

    overlay.className = "modal-overlay";

    overlay.innerHTML = `
        <div class="modal">
            <img src="${product.image}">
            <h2>${product.name}</h2>
            <p>Price: ${product.price.toLocaleString()} đ</p>
            <p>Category: ${product.category}</p>
            <p>Rating: ${product.rating}</p>
            <p>
                ${product.inStock ? "In Stock" : "Out Of Stock"}
            </p>

            <button class="close-btn">
                Close
            </button>
        </div>
    `;

    overlay
        .querySelector(".close-btn")
        .addEventListener("click", () => {
            overlay.remove();
        });

    document.body.appendChild(overlay);
}