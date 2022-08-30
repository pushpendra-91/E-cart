let label = document.getElementById('label');
let shoppingcart = document.getElementById('shopping-cart');
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = ()=>{
    let carticon = document.getElementById("cartamount");
    carticon.innerHTML =  basket.map((x)=>x.item).reduce((x, y)=> x+y, 0);
}

calculation();

let generatecartItems = ()=>{
    if(basket.length != 0){
        return (shoppingcart.innerHTML  = basket.map((x)=>{
            return `
            <div class="cart-item">hello</div>`
        }).join(""));
    }
    else{
        shoppingcart.innerHTML = ``
        label.innerHTML=`<h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to Home</button>
        </a>`;

    }
}
generatecartItems();