import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Offcanvas } from "react-bootstrap";
import { render } from "react-dom";
import { Router, Routes, Link } from "react-router-dom";
import { Badge } from "react-bootstrap";

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Sidebar
      </Button>

      <Offcanvas id="offcanvas-menu" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <h1>
            <Badge bg="secondary">Sidebar</Badge>
          </h1>
        </Offcanvas.Header>
        <Offcanvas.Body>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
