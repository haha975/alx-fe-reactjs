import React from "react";

function Footer() {
  return (
    <footer style={{ padding: "12px 20px", background: "#f2f2f2", textAlign: "center" }}>
      <small>© {new Date().getFullYear()} My Company. All rights reserved.</small>
    </footer>
  );
}

export default Footer;
