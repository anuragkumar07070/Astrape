const Cart = require('../models/Cart');
const Item = require('../models/Item');

// GET /api/cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.item');
    if (!cart) return res.json({ items: [], total: 0 });

    const total = cart.items.reduce((sum, i) => sum + i.quantity * i.item.price, 0);
    res.json({ items: cart.items, total });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/cart
const addToCart = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    const existingIndex = cart.items.findIndex(ci => ci.item.toString() === itemId);
    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({ item: itemId, quantity });
    }

    await cart.save();
    await cart.populate('items.item');

    const total = cart.items.reduce((sum, i) => sum + i.quantity * i.item.price, 0);
    res.json({ items: cart.items, total });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/cart/:itemId
const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const cartItem = cart.items.find(ci => ci.item.toString() === itemId);
    if (!cartItem) return res.status(404).json({ message: 'Item not found in cart' });

    if (quantity <= 0) {
      cart.items = cart.items.filter(ci => ci.item.toString() !== itemId);
    } else {
      cartItem.quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.item');
    const total = cart.items.reduce((sum, i) => sum + i.quantity * i.item.price, 0);

    res.json({ items: cart.items, total });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/cart/:itemId
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(ci => ci.item.toString() !== itemId);
    await cart.save();
    await cart.populate('items.item');
    const total = cart.items.reduce((sum, i) => sum + i.quantity * i.item.price, 0);

    res.json({ items: cart.items, total });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart };
