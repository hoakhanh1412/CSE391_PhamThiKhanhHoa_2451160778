function createCart(){
    let items = [];
    return{
        addItem(name,price){
            items.push({
                name,
                price
            })
        },

        removeItem(name){
            items= items.filter(
                item => items.name !==name
            );
        },
        getTotal(){
            return items.reduce(
                (sum, item) => sum + item.price,
                0
            );
        },
        printCart() {
            console.log ("===SHOPPING CART ====");
            if(items.length==0){
                console.log("Cart is empty");
                return;
            }
            items.forEach((item,index)=>{
                console.log(
                    `${index +1}. ${item.name} - ${item.price.toLocaleString()} VNĐ`

                );
            });
            console.log(
                "Total:",
                this.getTotal().toLocaleString(),
                "VNĐ"
            );
        }
    };
}

const cart = createCart();

cart.addItem("Iphone 15",25000000)
cart.addItem("Iphone 16 prm",30000000)
cart.addItem("Iphone 17 Pro",35000000)

console.log("===Before remove===");
cart.printCart();

console.log(
    "Current total:",
    cart.getTotal().toLocaleString(),
    "VNĐ"
);
cart.removeItem("Iphone 15");
console.log("===After remove===");
cart.printCart();