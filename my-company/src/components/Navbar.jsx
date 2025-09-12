import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between", // changed from margin/gap
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "#0b74de", // changed from background
    color: "white",
  };

  const brandStyle = { fontWeight: 800, fontSize: "18px" };
  const linkStyle = { color: "white", textDecoration: "none", fontWeight: 600 };

  return (
    <nav style={navStyle}>
      <div style={brandStyle}>My Company</div>
      <div style={{ display: "flex", gap: "12px" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/services" style={linkStyle}>Services</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;
