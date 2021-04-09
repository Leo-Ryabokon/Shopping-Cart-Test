import React, {useEffect, useState} from "react";
import style from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import {FaShoppingCart} from "react-icons/fa";
import {connect} from "react-redux";

const Navbar = ({cart}) => {

    const [cartCount, setCartCount] = useState(0)
    useEffect(() => {
        let count = 0
        cart.forEach((item) => {
            count += item.qty
        })
        setCartCount(count)
    }, [cart, cartCount])
    return (
        <nav className={style.nav_wrapper}>
            <div><img
                className={style.nav_logo}
                src='https://www.brandcrowd.com/gallery/brands/pictures/picture15447102465521.jpg' alt="logo"/></div>
            <div className={style.nav_items}><NavLink to="/Catalog" activeClassName={style.active}><div className={style.nav_items_catalog}>Каталог</div></NavLink>
            </div>
            <div className={style.nav_items}><NavLink to="/Cart"
                                                     activeClassName={style.active}><div className={style.nav_items_cart}><FaShoppingCart/>{cartCount}</div>
            </NavLink></div>
        </nav>
    )
}
const mapStateToProps = (state) => {
    return {
        cart: state.shop.cart
    }
}
export default connect(mapStateToProps)(Navbar)