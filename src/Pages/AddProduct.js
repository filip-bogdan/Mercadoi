import React, { useState } from 'react';
import { storage, db } from '../firebase';
import "../CSS/AddProduct.css";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AddProduct = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState();
    const [productSellerPhone,setProductSellerPhone] = useState('');
    const [productImg, setProductImg] = useState(null);
    const [productSellerEmail, setProductSellerEmail] = useState('');
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg']; // image types

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('')
        }
        else {
            setProductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }

    // add product
    const addProduct = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message)
            , () => {
                storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                    db.collection('Products').add({
                        ProductName: productName,
                        ProductSellerEmail: productSellerEmail,
                        ProductSellerPhone: productSellerPhone,
                        ProductPrice: Number(productPrice),
                        ProductImg: url
                    }).then(() => {
                        setProductName('');
                        setProductPrice(0);
                        setProductSellerPhone(0);
                        setProductImg('');
                        setProductSellerEmail('');
                        setError('');
                        document.getElementById('file').value = '';
                    }).catch(err => setError(err.message))
                })
            })
    }

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
            <div className='product-box'>
                <h2>Add Product</h2>
                {error && <div className='error'>{error}</div>}
                <form autoComplete="off" onSubmit={addProduct}>
                    <br></br>
                    <div className="user-box">
                        <input type="text" required
                            onChange={(e) => setProductName(e.target.value)} value={productName} />
                        <label>Product Name</label>
                    </div>
                    <div className="user-box">
                        <input type="email" required
                            onChange={(e) => setProductSellerEmail(e.target.value)} value={productSellerEmail} />
                        <label>Product Seller Email</label>
                    </div>
                    <div className="user-box">
                        <input type="text" required
                            onChange={(e) => setProductSellerPhone(e.target.value)} value={productSellerPhone} />
                        <label>Product Seller Phone</label>
                    </div>

                    <div className="user-box">
                        <input type="number" required
                            onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                        <label>Product Price</label>
                    </div>

                    <label className="white-text">Product Image</label>
                    <div className="user-box">
                        <input type="file" id="file" required
                            onChange={productImgHandler} />
                    </div>

                    <button type="submit" className="custom-btn btn-3">
                        <span>Add</span>
                    </button>
                </form>

            </div>
        </>
    )

}