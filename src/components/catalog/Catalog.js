import React, {useEffect} from "react";
import Product from "./product/Product";
import style from './Catalog.module.css'
import {connect} from "react-redux";
import {fetchData} from "../../redux/shoppingReducer";

const Catalog = ({products, fetchData}) => {

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className={style.catalog_wrapper}>
            {products.map(product => (<Product key={product.id} product={product} />))}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchData())
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.shop.products
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog)