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
            let {id, item} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return `
            <div class="cart-item">
                <img width = "100" height = "120" src=${search.img} alt=""/>
                <div class ="details">
                    <div class="tiile-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$ ${search.price}</p>
                        </h4>
                        <i class="bi bi-x-lg" onclick="removeitem(${id})"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id = ${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    <h3>$ ${item * search.price}</h3>
                </div>
            </div>`
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

let increment = (id) =>{
    let selectedItem = id;

    let search = basket.find((x)=> x.id === selectedItem.id);
    if(search === undefined)
    {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else{
        search.item += 1;
    }
    //console.log(basket);
    generatecartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) =>{
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);
    if (search.item === undefined)
        return;
    if(search.item === 0)
        return;
    else{
        search.item -= 1;
    }
    //console.log(basket);
    update(selectedItem.id);
    
    basket = basket.filter((x)=> x.item !== 0);
    generatecartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

//update function 
let update = (id) =>{
    let search = basket.find((x)=> x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalamount();
};

let removeitem = (id)=>{
    let selectedItem = id
    //console.log(selectedItem.id);
    basket = basket.filter((x)=>x.id !== selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
    generatecartItems();
    totalamount();
}

let totalamount = ()=>{
    if(basket.length !== 0)
    {
        let amount = basket.map((x)=>{
            let {item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y)=>x+y, 0);
        //console.log(amount);
        label.innerHTML = `<h2>Total Bill : $ ${amount} </h2>
        <button class = "checkout">Checkout</button>
        <button class = "removeall">Clear Cart</button>`;
        
    }
    else
        return 
}

totalamount();