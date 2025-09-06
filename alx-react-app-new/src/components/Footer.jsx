import React from "react";

function Footer() {
  return (
    <footer style={{
      padding: "12px 20px",
      backgroundColor: "#f2f2f2",
      textAlign: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <small>© {new Date().getFullYear()} My Company. All rights reserved.</small>
    </footer>
  );
}

export default Footer;
