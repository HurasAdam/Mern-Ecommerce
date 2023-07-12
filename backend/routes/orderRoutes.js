const route = require("express").Router();
const Order = require("../models/Order");
const User = require("../models/User");
const router = require("./userRoutes");

//Create an order

router.post("/", async (req, res) => {
  const { userId, cart, country, adress } = req.body;

  try {
    const user = await User.find({ userId });

    const order = await Order.create({
      owner: user._id,
      prodcuts: cart,
      country,
      adress,
    });
    order.count = cart.count;
    order.total = cart.total;
    await order.save();
    user.cart = { total: 0, count: 0 };
    user.orders.push(order);
    user.markModified("orders");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e.message);
  }
});
