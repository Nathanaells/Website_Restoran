import React, { useEffect, useState } from "react";
import "./OpeningAnimation.css";

const OpeningAnimation = ({ onFinish }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    console.log("OpeningAnimation dimulai...");

    setTimeout(() => {
      console.log("Animasi selesai, mengurangi width...");
      setIsAnimating(false);

      setTimeout(() => {
        console.log("Memanggil onFinish() setelah animasi selesai...");
        if (onFinish) {
          onFinish();
        }
      }, 2000); // Sesuai durasi animasi CSS
    }, 100);
  }, [onFinish]);

  return (
    <div className={`red-screen ${isAnimating ? "" : "hide"}`}>
    </div>
  );
};

export default OpeningAnimation;
