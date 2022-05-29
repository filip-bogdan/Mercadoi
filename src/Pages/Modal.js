import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../firebase';
import firebase from 'firebase/compat';
import { useNavigate } from 'react-router-dom';
import '../CSS/Modal.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/AuthContext';

const Modal = ({ TotalPrice, hideModal, cartProduct }) => {

    toast.configure();
    const navigate = useNavigate();
    const [cell, setCell] = useState('');
    const [residentialAddress, setResidentialAddress] = useState('');
    const [cartPrice] = useState(TotalPrice);
    const { currentUser } = useAuth();

    const handleCloseModal = () => {
        hideModal();
    }

    const handleCashOnDelivery = async (e) => {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        //const userData= await firebase.firestore().collection('users').doc(uid).get();
        await firebase.firestore().collection('Buyer-Personal-Info').add({
            Email: currentUser.email,
            CellNo: cell,
            ResidentialAddress: residentialAddress,
            CartPrice: cartPrice
        })
        const cartData = await firebase.firestore().collection('Cart' + uid).get();
        for (var snap of cartData.docs) {
            var data = snap.data();
            data.ID = snap.id;
            await firebase.firestore().collection('Buyer-Cart' + uid).add(data);
            await firebase.firestore().collection('Cart' + uid).doc(snap.id).delete();
            await firebase.firestore().collection('Products').doc(snap.id).delete();
        }
        
        hideModal();
        navigate('/homepage');
        toast.success("Order successfully placed", {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        })

    }

    return (
        <div className='shade-area'>
            <div className='modal-container'>
                <br />
                <h2>Cashout Details</h2>
                <br />
                <form autoComplete="off" onSubmit={handleCashOnDelivery}>
                    <label>Cell No</label>
                    <input type="text" className='form-control' required
                        onChange={(e) => setCell(e.target.value)} value={cell} placeholder='eg 03123456789' />
                    <br />
                    <label>Delivery Address</label>
                    <input type="text" className='form-control' required
                        onChange={(e) => setResidentialAddress(e.target.value)}
                        value={residentialAddress}
                    />
                    <br />
                    <label>Price To Pay</label>
                    <input type="number" className='form-control' required
                        value={cartPrice} disabled />
                    <br />
                    <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
                </form>
                <div className='delete-icon' onClick={handleCloseModal}>x</div>
            </div>
        </div>

    )
}

export default Modal;