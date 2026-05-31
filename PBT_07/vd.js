function calculate(a,op,b){
    switch (op){
        case "+":
            return a+b;
        case "-":
            return a-b;
        case "*":
            return a*b;
        case "/":
            return a/b;
        
            default:
                return "Invalid operator";
    }
}

console.log((calculate(10,"+",5)));
console.log((calculate(10,"-",5)));
console.log((calculate(10,"*",5)));
console.log((calculate(10,"/",5)));