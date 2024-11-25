var express = require("express");
var router = express.Router();

const orderModel = require("../models/productModel");

/* Get All record */
// localhost:3000/toppping/getAllTopping
router.get("/getAllTopping", async (req, res) => {
  try {
    const mList = await orderModel.find();
    if (mList == null) {
      return res
        .status(200)
        .json({ status: true, message: `There's no Topping init` });
    }
    res.status(200).json(mList);
  } catch (e) { res.status(400).json({ status: false, message: `${e.message}` }); }
});
/* Find record by Id */
// localhost:3000/topping/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = orderModel.findById(id);
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ status: false, message: `${e.message}` }); }
});
/* Find record by price in range gte min - lte max */
// localhost:3000/topping/toppingPriceInRange?min=&max=
router.get("/toppingInRange", async (req, res) => {
  try {
    const { min, max } = req.query;
    const mlist = orderModel.find({ toppingPrice: { $gte: min, $lte: max } });

    res.status(200).json(mlist);
  } catch (e) {
    res.status(400).json({ status: false, message: `${e.message}` }); }
});

/* Insert record  */
// localhost:3000/toppping/add
router.post("/add", async (req, res) => {
  try {
    const { toppingName, toppingPrice } = req.body;
    const newItem = { toppingName, toppingPrice };

    await orderModel.create(newItem);
    res.status(200).json(newItem);
  } catch (e) {
    res.status(400).json({ status: false, message: `${e.message}` }); }
});

/* Update record */
// localhost:3000/topping/update/:id?name=&price=
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.query;
    const updateorderModel = await orderModel.findById(id);

    if (updateorderModel == null) {
      return res
        .status(404)
        .json({ status: false, message: `There's no record with id: ${id}` });
    }

    updateorderModel.name = name ? name : updateorderModel.name;
    updateorderModel.price = price ? price : updateorderModel.price;
    await updateorderModel.save();
    res.status(200).json({ status: true, message: `Update Successful` });
  } catch (e) {
    res.status(400).json({ status: false, message: `${e.message}` }); }
});

/* Delete record */
// localhost:3000/delte/:id
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await orderModel.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: `Delete Successful` });
  } catch (e) {
    res.status(400).json({ status: false, message: `${e.message}` }); }
});

module.exports = router;
