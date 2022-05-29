import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import "../CSS/ForgotPassword.css"

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password")
        }

        setLoading(false)
    }
    return (
        <>
            <div className="frgt-box">
                <h2>Password Reset</h2>
                {error && <div className="error">{error}</div>}
                {message && <div className="msg">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <br></br>
                    <div className="user-box" >
                        <input type="email" ref={emailRef} name="email" required />
                        <label>Email</label>
                    </div>
                    <button disabled={loading} className="custom-btn btn-3" type="submit">
                        <span>Reset</span>
                    </button>
                </form>
                <br></br><br></br>
                <div className="w-100 text-center mt-3">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
                <div className="w-100 text-center mt-2">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </>
    )
}