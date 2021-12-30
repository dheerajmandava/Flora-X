module.exports = function Cart(plantsInBasket){
        this.items = plantsInBasket.items || {}
        this.totalQuantity = plantsInBasket.totalQuantity || 0 
        this.totalPrice = plantsInBasket.totalPrice || 0
        total = 0 

        this.add = function(item, id){
                var inCart = this.items[id]
                if(!inCart){
                    inCart = this.items[id] = {item: item , price: 0,  quantity: 0}
                }
                inCart.quantity++
                inCart.price = inCart.item.price * inCart.quantity
                this.totalQuantity++
                this.totalPrice += inCart.item.price 
        }
        this.basketArray = function(){
                var ar = []
                for(let id in this.items){ 
                    ar.push(this.items[id])
                }
                return ar
        }
     
}