import React, { useState } from "react";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import { AnimatePresence } from "framer-motion";
import Footer from "./Footer.jsx";
import "./MenuPage.css";

const menuItems = [
  { id: 1, name: "Spaghetti Carbonara", price: "Rp50.000", image: "/src/assets/BG2.jpg" },
  { id: 2, name: "Ayam Bakar", price: "Rp45.000", image: "/src/assets/Image2.jpg" },
  { id: 3, name: "Nasi Goreng", price: "Rp40.000", image: "/src/assets/Image3.jpg" },
];

const minumanItems = [
  { id: 4, name: "Es Teh Manis", price: "Rp10.000", image: "/src/assets/Image3.jpg" },
  { id: 5, name: "Kopi Susu", price: "Rp20.000", image: "/src/assets/Image4.jpg" },
  { id: 6, name: "Jus Alpukat", price: "Rp25.000", image: "/src/assets/Image2.jpg" },
];

const MenuPage = ({ onOrder, onCheckout, onBack }) => {
  const [makananIndex, setMakananIndex] = useState(0);
  const [minumanIndex, setMinumanIndex] = useState(0);

  const handleSwipe = (type, direction) => {
    if (type === "makanan") {
      setMakananIndex((prev) => (prev + direction + menuItems.length) % menuItems.length);
    } else {
      setMinumanIndex((prev) => (prev + direction + minumanItems.length) % minumanItems.length);
    }
  };

  const bindMakanan = useDrag(({ swipe: [swipeX] }) => {
    if (swipeX === -1) handleSwipe("makanan", 1);
    if (swipeX === 1) handleSwipe("makanan", -1);
  });

  const bindMinuman = useDrag(({ swipe: [swipeX] }) => {
    if (swipeX === -1) handleSwipe("minuman", 1);
    if (swipeX === 1) handleSwipe("minuman", -1);
  });

  const handleOrder = async (item) => {
    const orderData = {
      item_name: item.name,
      price: Number(item.price.replace("Rp", "").replace(".", "")), // Mengubah harga menjadi angka
      quantity: 1,
    };

    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan pesanan");
      }

      const result = await response.json();
      console.log("Pesanan berhasil dikirim:", result);
      onOrder(orderData);
    } catch (error) {
      console.error("Error saat mengirim pesanan:", error);
    }
  };

  return (
    <div className="menu-container">
      <h2 className="menu-title">Makanan</h2>
      <button className="back-button" onClick={onBack}>Back</button>

      <div className="menu-list" {...bindMakanan()} style={{ touchAction: "none" }}>
        <AnimatePresence initial={false}>
          {menuItems.map((item, index) => (
            <animated.div key={item.id} className={`menu-item-card ${index === makananIndex ? "active" : ""}`}>
              <div className="menu-content">
                <img src={item.image} alt={item.name} className="menu-image" />
                <h2>{item.name}</h2>
                <p>{item.price}</p>
                {index === makananIndex && <button className="order-button" onClick={() => handleOrder(item)}>Order</button>}
              </div>
            </animated.div>
          ))}
        </AnimatePresence>
      </div>

      <h2 className="menu-title">Minuman</h2>
      <div className="menu-list" {...bindMinuman()} style={{ touchAction: "none" }}>
        <AnimatePresence initial={false}>
          {minumanItems.map((item, index) => (
            <animated.div key={item.id} className={`menu-item-card ${index === minumanIndex ? "active" : ""}`}>
              <div className="menu-content">
                <img src={item.image} alt={item.name} className="menu-image" />
                <h2>{item.name}</h2>
                <p>{item.price}</p>
                {index === minumanIndex && <button className="order-button" onClick={() => handleOrder(item)}>Order</button>}
              </div>
            </animated.div>
          ))}
        </AnimatePresence>
      </div>
      <button className="checkout-button" onClick={onCheckout}>Go to Checkout</button>
      <Footer/>
    </div>
  );
};

export default MenuPage;

