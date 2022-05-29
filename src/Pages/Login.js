import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "../CSS/Login.css";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('')
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/homepage")
    } catch {
      setError("Failed to log in")
    }
    setLoading(false);
  }

  return (
    <>
      <div className="login-box">
        <h2>Login</h2>
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
          <button disabled={loading} className="custom-btn btn-3" type="submit">
            <span>Login</span>
          </button>
        </form>
        <br></br><br></br>
        <div className="to-frgt">
           <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div className="to-signup">
          Need an account? <Link to="/signup">Signup</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
