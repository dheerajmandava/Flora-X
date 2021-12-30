let cart = document.getElementsByClassName('addtocart');

let  plants=[
    {    
        name : "plant1",
        price : 100,
        bcount : 0    
    },
    {
        name : "plant2",
        price : 200,
        bcount : 0
    },
    {
        name : "plant3",
        price : 300,
        bcount : 0
    }
];


for(let i = 0; i< cart.length; i++){
   cart[i].addEventListener('click',()=>{
    cartNumbers(plants[i])
    totalCost(plants[i])
   })
}

function cartNumbers(plant){
    let plantNum = localStorage.getItem('cartNumbers')
    plantNum = parseInt(plantNum)
    if(plantNum){
        localStorage.setItem('cartNumbers',plantNum + 1);
        document.querySelector('.plantc li span').textContent = plantNum + 1;
    }
    else{
        localStorage.setItem('cartNumbers',1)
        document.querySelector('.plantc li span').textContent = 1;
    }
    setPlants(plant)
    
}
function setPlants(plant){
    let basketItems = localStorage.getItem('plantsinBasket')
    basketItems = JSON.parse(basketItems)
    if(basketItems != null){
        if(basketItems[plant.name] == undefined){
            basketItems={
                ...basketItems,
                [plant.name] : plant
            }
        }
        basketItems[plant.name].bcount += 1;
    }
    else{
        plant.bcount = 1
        basketItems = {
        [plant.name]: plant
        }
    }
   
    localStorage.setItem('plantsinBasket',JSON.stringify(basketItems))
  
}

function refreshLoader(){
    let plantNum = localStorage.getItem('cartNumbers')

    if(plantNum){
        document.getElementsByClassName('.plantc li span').textContent = plantNum
    }
}

function totalCost(plant){
    let basketCost = localStorage.getItem('totalCost')
    if(basketCost != null){
    basketCost = parseInt(basketCost)
    localStorage.setItem('totalCost',basketCost + plant.price)
    }
    else{
    localStorage.setItem('totalCost',plant.price)
    }
}

function displayBasket(){
    let basketCost = localStorage.getItem('totalCost')
    let basketItems = localStorage.getItem('plantsinBasket')
    basketItems = JSON.parse(basketItems)
    let plantContainer = document.querySelector('.products')
    if(basketItems && plantContainer){
        plantContainer.innerHTML = ''
        Object.values(basketItems).map(plant => {
            plantContainer.innerHTML += `
            <div class="product">
            <span>${plant.name}</span>
            <div class="price">${plant.price}</div>
            <div class="quantity">
            <span>${plant.bcount}</span>
            </div>
            <div class="total">${plant.bcount * plant.price}/-</div>
            </div>
            `
        })
        plantContainer.innerHTML +=`
        <div class="totalBasket">
        <h4 class="b1">Basket Total : </h4>
        <h4 class="b2">${basketCost}/-</h4>
        </div>
        
        `
    }
}
refreshLoader()
displayBasket()
