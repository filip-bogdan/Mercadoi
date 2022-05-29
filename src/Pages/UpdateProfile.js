import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import "../CSS/UpdateProfile.css";

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                navigate("/homepage")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <>
            <div className="profile-box">
                <h2 className="text-center mb-4">Update Profile</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <br></br>
                    <div id="email">
                        <div className="user-box" >
                            <input type="email" ref={emailRef} name="email" required defaultValue={currentUser.email} />
                            <label>Email</label>
                        </div>
                    </div>
                    <div id="password">
                        <div className="user-box">
                            <input type="password" ref={passwordRef} name="password" placeholder="Leave blank to keep the same" />
                            <label>Password</label>
                        </div>
                    </div>
                    <div id="password-confirm">
                        <div className="user-box">
                            <input type="password"
                                ref={passwordConfirmRef}
                                placeholder="Leave blank to keep the same" />
                            <label>Confirm password</label>
                        </div>
                    </div>
                    <br></br>
                    <button disabled={loading} className="custom-btn btn-3" type="submit">
                        <span>Update</span>
                    </button>
                </form>
                <br></br>
                <div className="w-100 text-center mt-2">
                    <Link to="/homepage">Cancel</Link>
                </div>
            </div>

        </>
    )
}