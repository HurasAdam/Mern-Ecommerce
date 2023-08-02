const express = require("express");
const app = express();
const http = require("http");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);
const cors = require("cors");

const { Server } = require("socket.io");

const User = require("./models/User");
const { default: mongoose } = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const imageRoutes = require("./routes/imagesRoutes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/images", imageRoutes);
app.use("/orders", orderRoutes);

app.post("/create-payment", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.status(200).json(paymentIntent);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  const server = app.listen(process.env.PORT, () => {
    console.log(`DB Connected : Server running on port${process.env.PORT}`);
    const io = new Server(server, {
      cors: "http://localhost:3001",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    });

    io.on("connection", (socket) => {
      console.log(`connected - socketID:${socket.id}`);
      socket.emit("random", "abc321");
    });

    app.set("socketio", io);
  });
});
