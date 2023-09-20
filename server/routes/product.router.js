const express = require("express");
const Product = require("../models/Product");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({ list: product });
  } catch (error) {
    res.status(500).json({
      message: "на сервере произошла ошибка попробуйте позже",
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
    });
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(500).json({
      message: "на сервере произошла ошибка попробуйте позже",
    });
  }
});

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    console.log(productId);
    const product = await Product.findById(productId);
    res.status(200).json({ list: product });
  } catch (error) {
    res.status(500).json({
      message: "на сервере произошла ошибка попробуйте позже",
    });
  }
});
router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const removeProduct = await Product.findById(productId);
    await removeProduct.remove();
    return res.send(null);
  } catch (error) {
    res.status(500).json({
      message: "на сервере произошла ошибка попробуйте позже",
    });
  }
});

module.exports = router;
