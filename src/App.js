import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav, NavDropdown } from "react-bootstrap";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import Signup from "./Pages/Signup";

import { Button } from "bootstrap";
import Sidebar from "./Pages/Sidebar";
import { AuthProvider } from "./contexts/AuthContext";
import Profilepage from "./Pages/Profilepage";
import UpdateProfile from "./Pages/UpdateProfile";
import ForgotPassword from "./Pages/ForgotPassword";
import { AddProduct } from "./Pages/AddProduct";
import Cart from "./Pages/Cart";



const App = () => {
  return (
    <AuthProvider>
      <div className="main">
        <Router>
          <Routes>
            <Route path="/homepage" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profilepage />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<ErrorPage />} />
            
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App;
