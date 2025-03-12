import React, { useEffect, useState } from "react";

import "./HomePage.css";

const HomePage = ({ onMenuClick }) => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowFooter(true), 2000); // Footer muncul setelah 2 detik
  }, []);

  return (
    <>
    <div className="home-container">
      <h1 className="title">Merci</h1>
      <p className="subtitle">"Your destination in seeking satisfaction."</p>
      <img src="/src/assets/LogoClean.png" alt="Logo" className="logo" />
      <button className="menu-button" onClick={onMenuClick}>Menu</button>
      <p className="description">
        Experience the finest flavors with a touch of elegance.
      </p>
    </div>

   
  </>);
};

export default HomePage;
