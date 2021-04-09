import React, {useState} from "react";
import style from './Product.module.css'
import {addToCart} from "../../../redux/shoppingReducer";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";


const Product = ({product, addToCart}) => {

    const [inCart, setInCart] = useState(false)
    const addItemToCart = () => {
        addToCart(product.id)
        setInCart(true)
    }
    return (
        <div className={style.product_wrapper}>
            <div className={style.product_img}><img src={product.image} alt="product-img"/></div>
            <div className={style.product_description}>
                <div className={style.product_name}>{product.name}</div>
                <div className={style.product_price}>{product.price} ₽</div>
                {!inCart
                    ? <button  onClick={() => addItemToCart(product.id)}>В корзину</button>
                    : <button className={style.product_btn} onClick={() => setInCart(true)}><NavLink to="/Cart" activeClassName={style.active}>Оформить заказ</NavLink></button>}
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id) => dispatch(addToCart(id)),
    }
}

export default connect(null, mapDispatchToProps)(Product)