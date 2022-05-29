import React from "react";

const IndividualProduct = ({ individualProduct,  addToCart}) => {

    const handleAddToCart=()=>{
        addToCart(individualProduct)
    }

    return (
        <figure>
            <img src={individualProduct.ProductImg} alt="product-img"/>
            <figcaption>{individualProduct.ProductName}</figcaption>
            <spam className="price">{individualProduct.ProductPrice} RON</spam>
            <p className="seller">from: {individualProduct.ProductSellerEmail}</p>
            <p className="tel">tel: {individualProduct.ProductSellerPhone}</p>
            <button className="button" onClick={handleAddToCart}>Buy Now</button>
        </figure >
    )
}

export default IndividualProduct;