import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import CartItem from "./cartItem/CartItem";
import style from './Cart.module.css'

const Cart = ({cart}) => {

    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        let price = 0
        cart.forEach(item => price += item.qty * item.price)
        setTotalPrice(price)
    }, [cart, totalPrice, setTotalPrice])

    return (
        <div className={style.cart}>
            {cart.length === 0 ? <div className={style.cart_message}>Корзина пуста</div> :
                <div className={style.cart_wrapper_items}>
                    <div className={style.cart_items_table}>
                        <span>Название</span><span>Кол-во</span><span>Стоимость</span></div>
                    {cart.map(item => <CartItem item={item} key={item.id}/>)}
                    <div className={style.cart_summary}>
                        <div>Итого: {totalPrice} ₽</div>
                    </div>

                </div>}

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        cart: state.shop.cart
    }
}
export default connect(mapStateToProps)(Cart)