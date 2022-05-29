import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import "../CSS/Main.css";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Products from "./Products";
import firebase from "firebase/compat";
import { auth, fs } from "../firebase";
import CartProducts from "./CartProducts";


function Main() {
  const [error, setError] = useState('')
  const { logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      navigate("/login")
    } catch {
      setError('Failed to logout')
    }

  }

  function GetUserId(){
    const [uid,setUid]=useState(null);
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
          setUid(user.uid);
        }
      })
    },[])
    return uid;
  }

  const uid = GetUserId();

  const [products, setProducts] = useState();
  const getProducts = async () => {
    const products = await firebase.firestore().collection('Products').get();
    const productsArray = [];
    for (var snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data
      })
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  
  let Product;

  const addToCart = (product)=>{
    if(uid !== null){
      Product=product;
      Product['TotalProductPrice']=Product.ProductPrice;
      firebase.firestore().collection('Cart' + uid).doc(product.ID).set(Product).then(()=>{
        console.log('Added');
      });
    }
    else{
      navigate('/login');
    }
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
      <br></br>
      <br></br>
      <br></br>
      {products?.length > 0 && (
        <div id="wrap">
          <div id="columns" class="columns_3">
            <Products products={products} addToCart={addToCart}/>
          </div>
        </div>
      )}
      {products?.length < 1 &&(
        <div id="wrap">Please wait...</div>
      )}
    </>
  );
}

export default Main;
