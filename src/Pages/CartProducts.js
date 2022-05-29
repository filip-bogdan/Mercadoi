import React from 'react'
import  IndividualCartProduct  from './IndividualCartProduct'

const CartProducts = ({cartProducts}) => {
  return cartProducts.map((cartProduct)=>(
      <IndividualCartProduct key={cartProduct.ID} cartProduct={cartProduct}/>
  ))
}

export default CartProducts;
