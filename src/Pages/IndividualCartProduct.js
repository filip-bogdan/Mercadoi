import React from 'react'
import firebase from 'firebase/compat'
import { auth } from '../firebase'

const IndividualCartProduct = ({ cartProduct }) => {

    const handleCartProductDelete=()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                firebase.firestore().collection('Cart'+user.uid).doc(cartProduct.ID).delete().then(()=>{
                    console.log("delete");
                })
            }
        })
    }

    return (
        <figure>
            <img src={cartProduct.ProductImg} alt="product-img" />
            <figcaption>{cartProduct.ProductName}</figcaption>
            <spam className="price">{cartProduct.ProductPrice} RON</spam>
            <p className="seller">from: {cartProduct.ProductSellerEmail}</p>
            <p className="tel">tel: {cartProduct.ProductSellerPhone}</p>
            <button className="button" onClick={handleCartProductDelete}>Delete</button>
        </figure >
    )
}

export default IndividualCartProduct;
