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

function App() {
  return (
    <div className="main">
      <Router>
        <header>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Navigation</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Link to="/"> Home </Link>
                  <Link to="/login"> Login </Link>
                  <Link to="/signup"> SignUp </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <br></br>
          <br></br>
          <Sidebar />
          <hr></hr>
        </header>
        

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
