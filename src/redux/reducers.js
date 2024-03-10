import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    subTotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,

}

const cartReducer = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart: (state,action)=>{
            const item = action.payload
            const isItemExists = state.cartItems.find((i)=> i.id === item.id)

            if(isItemExists){
                state.cartItems.forEach(i => {
                    if(i.id===item.id){
                        i.quantity++
                    }
                })
            }else{
                state.cartItems.push(item)
            }
            console.log("sttegas : ",state.cartItems)
        },
        decrementAction: (state,action)=>{
            
            const item = state.cartItems.find((i)=> i.id === action.payload)
            if(item.quantity>1){
                state.cartItems.forEach((i)=>{
                    if(i.id===item.id){
                        i.quantity--
                    }
                })
            }

        },
        deleteAction: (state,action)=>{
            state.cartItems = state.cartItems.filter(i=> i.id!==action.payload)
        },
        calculatePrice: (state)=>{
            let sum = 0
            state.cartItems.forEach(i => (sum += i.price * i.quantity))
            state.subTotal = sum
            state.shipping = state.subTotal < 1000 ? 0 : 200
            state.tax = Number((state.subTotal*0.15).toFixed())
            state.total = state.subTotal + state.tax + state.shipping
        }

    }
});

export const {addToCart , decrementAction , deleteAction, calculatePrice} = cartReducer.actions

export default cartReducer.reducer  