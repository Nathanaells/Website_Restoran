import React, { useEffect, useState } from "react";
import "./Checkout.css";
import Footer from "./Footer.jsx";

const CheckoutPage = ({ cartItems, onBack }) => {
  const [showPlate, setShowPlate] = useState(false);
  const [showCutlery, setShowCutlery] = useState(false);
  const [hideAnimation, setHideAnimation] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setTimeout(() => setShowPlate(true), 300);
    setTimeout(() => setShowCutlery(true), 1200);
    setTimeout(() => setHideAnimation(true), 3000);
    setTimeout(() => setShowContent(true), 4000);
    setTimeout(() => setShowFooter(true), 4000);

    fetchOrders(); // Ambil data order saat halaman dimuat
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  const fetchOrders = () => {
    fetch("http://localhost:5000/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  };


  

  // Mengelompokkan item yang sama dan menghitung jumlahnya
  const groupedCart = cartItems.reduce((acc, item) => {
    let existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.count += 1;
    } else {
      acc.push({ ...item, count: 1 });
    }
    return acc;
  }, []);

  // Menghitung total harga berdasarkan jumlah item
  const totalPrice = groupedCart.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <>


      <div className="checkout-container">
        {/* Kontainer animasi */}
        <div className="animation-container">
          <img
            src="/src/assets/Piring.png"
            alt="Plate"
            className={`plate ${showPlate ? "show" : ""} ${hideAnimation ? "hide" : ""}`}
          />
          <img
            src="/src/assets/Sendok.png"
            alt="Spoon"
            className={`spoon ${showCutlery ? "move" : ""} ${hideAnimation ? "hide" : ""}`}
          />
          <img
            src="/src/assets/Garpu.png"
            alt="Fork"
            className={`fork ${showCutlery ? "move" : ""} ${hideAnimation ? "hide" : ""}`}
          />
        </div>

        {showContent && (
          <div className="checkout-content fade-in">
            {/* Header Checkout */}
            <div className="top-container">
              <button className="back-button" onClick={onBack}>Back</button>
              <h2 className="checkout-title">Checkout</h2>
            </div>

            {/* List Pesanan */}
            <div className="middle-container">
              <ul className="cart-list">
                {groupedCart.map((item, index) => (
                  <li key={index} className="cart-item">
                    {item.name} ({item.count}x) - Rp{(item.price * item.count).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>

            {/* Total Harga */}
            <h3 className="total-price">Total: Rp{totalPrice.toLocaleString()}</h3>
            {/* Tombol Hapus Semua Order */}
          </div>
        )}

      </div>

      <div className={`footer-container ${showFooter ? "footer-visible" : "footer-hidden"}`}>
        <Footer />
      </div>
    </>
  );
};

export default CheckoutPage;
