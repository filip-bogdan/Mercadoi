import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import "../CSS/Signup.css";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate("/homepage")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="login-box">
        <h2>Signup</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <br></br>
          <div className="user-box" >
            <input type="email" ref={emailRef} name="email" required />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input type="password" ref={passwordRef} name="password" required />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input type="password" ref={passwordConfirmRef} name="password" required />
            <label>Confirm password</label>
          </div>
          <button disabled={loading} className="custom-btn btn-3" type="submit">
            <span>Submit</span>
          </button>
        </form>
        <br></br><br></br>
        <div className="to-login">
          Already have an account? <Link to="/login">Login</Link>
        </div>

      </div>
    </>
  );
}

export default Signup;
