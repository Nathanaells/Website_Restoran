require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");



const app = express();
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// API untuk menambahkan pesanan
app.post("/orders", (req, res) => {
  const { item_name, price, quantity } = req.body;
  const query = "INSERT INTO orders (item_name, price, quantity) VALUES (?, ?, ?)";
  db.query(query, [item_name, price, quantity], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ message: "Database error" });
    } else {
      res.status(201).json({ message: "Order saved successfully", id: result.insertId });
    }
  });
});

// API untuk mengambil semua pesanan
app.get("/orders", (req, res) => {
  const query = "SELECT * FROM orders";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ message: "Database error" });
    } else {
      res.status(200).json(results);
    }
  });
});



app.delete("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  console.log("Menghapus order dengan ID:", orderId); // Debugging

  if (!orderId) {
    return res.status(400).json({ error: "Invalid order ID" });
  }

  const sql = "DELETE FROM orders WHERE id = ?";
  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error("Error deleting order:", err);
      return res.status(500).json({ error: "Server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
