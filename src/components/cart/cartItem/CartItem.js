import React, {useState} from "react"
import style from "./CartItem.module.css"
import {FaTrashAlt} from "react-icons/all";
import {connect} from "react-redux";
import {removeFromCart, adjustQty} from "../../../redux/shoppingReducer";

const CartItem = ({item, removeFromCart, adjustQty}) => {
    const [input, setInput] = useState(item.qty)
    const onChangeHandler = (e) => {
        setInput(e.target.value)
        adjustQty(item.id, e.target.value)
    }
    return (
        <div className={style.cartItem_wrapper}>
            <div className={style.cartItem_name}>
                {item.name}
            </div>
            <div className={style.cartItem_qty}>
            <input min="1" type="number" value={input} onChange={onChangeHandler}/>
            </div>
            <div className={style.cartItem_price}>
                {item.price} ₽
            </div>
            <div className={style.cartItem_deleteBtn}>
                <button onClick={() => removeFromCart(item.id)}><FaTrashAlt/></button>
            </div>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeFromCart: (id) => dispatch(removeFromCart(id)),
        adjustQty: (id, value) => dispatch(adjustQty(id, value))
    }
}

export default connect(null, mapDispatchToProps)(CartItem)
