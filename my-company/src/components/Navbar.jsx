import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "12px 20px",
    background: "#0b74de",
    color: "white",
  };
  const brandStyle = { fontWeight: 800, fontSize: "18px" };
  const linkStyle = { color: "white", textDecoration: "none", fontWeight: 600 };

  return (
    <nav style={navStyle}>
      <div style={brandStyle}>My Company</div>
      <div style={{ marginLeft: 20, display: "flex", gap: 12 }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/services" style={linkStyle}>Services</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;
