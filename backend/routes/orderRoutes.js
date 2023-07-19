const router = require("express").Router();
const Order = require("../models/Order");
const User = require("../models/User");

//Creating an order

router.post("/", async (req, res) => {
  const { userId, cart, country, adress } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    if (!userId) {
      throw new Error("Missing userId in request body");
    }
    if (!user) {
      throw new Error("User not found!");
    }
    const order = await Order.create({
      owner: user._id,
      products: cart,
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

//geting all orders

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("owner", ["email", "name"]);
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

// Shipping order
router.patch("/:id/mark-shipped", async (req, res) => {
  const { ownerId } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findById(ownerId);
    await Order.findByIdAndUpdate(id, {status:"shipped"});
    const orders = await Order.find().populate('owner', ['email', 'name']);
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

module.exports = router;
