import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import "../CSS/Profilepage.css";

export default function Profilepage() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            navigate("/login")
        } catch {
            setError("Failed to log out")
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
            <br></br><br></br><br></br><br></br>
            <div className="profile-box">
                <h2 className="text-center mb-4">Profile</h2>
                <strong>Email:</strong> {currentUser.email}
                <br></br><br></br>
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3 ">
                    Update Profile
                </Link>

            </div>
        </>
    )
}

