import React, { useState, useEffect } from "react";
import HomePage from "./HomePage.jsx";
import MenuPage from "./MenuPage.jsx";
import CheckoutPage from "./Checkout.jsx";
import OpeningAnimation from "./OpeningAnimation.jsx";
import Background from "./Background.jsx";
import "./App.css";
import Footer from "./Footer.jsx";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [cartItems, setCartItems] = useState([]);
  const [isAnimating, setIsAnimating] = useState(true); // Animasi dimulai saat aplikasi pertama kali dibuka

  // Jalankan animasi pertama kali saat aplikasi dibuka
  useEffect(() => {
    console.log("App pertama kali dibuka, mulai animasi...");
    setTimeout(() => {
      console.log("Animasi awal selesai");
      setIsAnimating(false);
    }, 1000);
  }, []);

  const handleNavigation = (page) => {
    console.log(`Navigasi ke ${page}, memulai animasi...`);
    setIsAnimating(true); // Aktifkan animasi sebelum pindah halaman
    setTimeout(() => {
      setCurrentPage(page);
      setIsAnimating(false);
      console.log(`Navigasi selesai, halaman saat ini: ${page}`);
    }, 1500); // Setelah animasi selesai, pindah ke halaman baru
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <div className="app-container">
      <Background />
      
      {isAnimating && <OpeningAnimation onFinish={() => setIsAnimating(false)} />}
      
      {!isAnimating && (
        <>
          {currentPage === "home" && <HomePage onMenuClick={() => handleNavigation("menu")} />}
          {currentPage === "menu" && (
            <MenuPage
              onOrder={addToCart}
              onCheckout={() => handleNavigation("checkout")}
              onBack={() => handleNavigation("home")}
            />
          )}
          {currentPage === "checkout" && (
            <CheckoutPage
              cartItems={cartItems}
              onBack={() => handleNavigation("menu")}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
