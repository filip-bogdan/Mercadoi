import React, { useContext } from 'react'
import IndividualProduct from './IndividualProduct'

const Products = ({ products, addToCart }) => {

    return products.map((individualProduct) => (
        <IndividualProduct key={individualProduct} individualProduct={individualProduct} addToCart={addToCart}/>
    ))
}

export default Products;