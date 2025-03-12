import React from "react";
import "./Footer.css";
import "./App.css";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-info">
          <span>📞 15000 25</span>
          <span>✉ guestsupport@contoh.com</span>
        </div>
      </div>
      <div className="footer-links">
        <a href="#" className="text-Footer">About Us</a> |
        <a href="#" className="text-Footer">Kebijakan Privasi</a> |
        <a href="#" className="text-Footer">Syarat dan Ketentuan</a>
      </div>
      <p className="copyright">© 2025 Nama Perusahaan. All Rights Reserved.</p>
      <div className="social-icons">
        <FaFacebook />
        <FaInstagram />
        <FaTwitter />
        <FaYoutube />
      </div>
    </footer>
  );
};

export default Footer;
