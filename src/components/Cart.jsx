import React from 'react'
import {AiFillDelete} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementAction , deleteAction, calculatePrice} from '../redux/reducers'
const CartItem = ({
                    imgsrc,
                    name,
                    price,
                    qty,
                    decrement,
                    increment,
                    deleteHandler,
                    id
                }) => {
                    return (
    <div className="cartItem">
        <img src={imgsrc} alt="Item"/>
        <article>
            <h3>{name}</h3>
            <p>${price}</p>
        </article>
        <div> 
            <button onClick={()=> decrement(id)}>-</button>
            <p>{qty}</p>
            <button onClick={()=> increment(id)}>+</button>
        </div>
        <AiFillDelete onClick={()=> deleteHandler(id)}/>
    </div>
    )
}

const Cart = () => {

  const {cartItems, subTotal, shipping, tax, total} = useSelector(state=>state.cart)
  const dispatch = useDispatch()

  const incrementHandler = (id)=>{
    dispatch(addToCart({id}))
    dispatch(calculatePrice())
  }

  const decrementHandler = (id)=>{
    dispatch(decrementAction(id))
    dispatch(calculatePrice())
  }

  const deleteHandler = (id)=>{
    dispatch(deleteAction(id))
    dispatch(calculatePrice())
  }

  return (
    <div className="cart">
        <main>

            {
                cartItems.length > 0 ? (
                    cartItems.map( i => (
                        <CartItem
                        key = {i.id}
                        imgsrc={i.imgsrc}
                        name={i.name}
                        price={i.price}
                        qty={i.quantity}
                        decrement={decrementHandler}
                        increment={incrementHandler}
                        deleteHandler={deleteHandler}
                        id={i.id}
                    />
                    ))
                ):(
                    <h1>no items yet</h1>
                )
            }

        </main>
        <aside>
            <h2>SubTotal: ${subTotal}</h2>
            <h2>Shipping: ${shipping}</h2>
            <h2>Tax: ${tax}</h2>
            <h2>Total: ${total}</h2>
        </aside>
    </div>
  )
}



export default Cart