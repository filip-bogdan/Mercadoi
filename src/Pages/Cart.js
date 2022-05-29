import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import firebase from 'firebase/compat'
import CartProducts from './CartProducts'
import StripeCheckout from "react-stripe-checkout"
import Modal from './Modal'

const Cart = () => {

    const [error, setError] = useState('')
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate("/login")
        } catch {
            setError('Failed to logout')
        }

    }

    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                firebase.firestore().collection('Cart' + user.uid).onSnapshot(snapshot => {
                    const newCartProduct = snapshot.docs.map((doc) => ({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);
                })
            } else {
                console.log("not signed in")
            }
        })
    }, [])

    const price = cartProducts.map((cartProduct) => {
        return cartProduct.TotalProductPrice
    })
    const reducerOfPrice = (accumulator, currentValue) => accumulator + currentValue;

    const totalPrice = price.reduce(reducerOfPrice, 0);

    const triggerModal=()=>{
        setShowModal(true);
    }

    const hideModal=()=>{
        setShowModal(false);
    }

    return (
        <>
            <nav className="navbar">
                <h1>Mercadoi
                </h1>

                <input type={"checkbox"} id="toggler" />
                <label for="toggler"><i className="ri-menu-line"></i></label>
                <div className="menu">
                    <ul className="list">
                        <li><a id="text" href="/homepage">Home</a></li>
                        <li><a id="text" href="#">About</a></li>
                        <li><a id="text" href="#">Contact</a></li>
                        <li><a id="text" href="/profile">Profile</a></li>
                        <li><a id="text" href="/add-product">Add Product</a></li>
                        <li><a id="text" href="/cart">Cart</a></li>
                        <li></li>
                        <li></li>
                        <li><button id="text_logout" onClick={handleLogout}>Logout</button></li>


                    </ul>
                </div>
            </nav>
            {error && <div className="error">{error}</div>}

            {cartProducts.length > 0 && (
                <div id="wrap">
                    <div id="columns" class="columns_4">
                        <CartProducts cartProducts={cartProducts} />
                    </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div>No products to show</div>
            )}

                {showModal===true && (
                    <Modal TotalPrice={totalPrice} hideModal={hideModal} cartProducts={cartProducts}/>
                )}

            <div className="checkout">
                <h5>Cart Summary</h5>
                <br></br>
                <div>
                    Total Price to Pay: <span>{totalPrice} RON</span>
                </div>
                <button className="custom-btn2 btn-3" onClick={()=>triggerModal()}>Pay</button>
            </div>

        </>
    )
}

export default Cart