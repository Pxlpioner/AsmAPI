const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Order Schema
const order = new Schema({
  orderOwner: { type: ObjectId, required: true, ref: 'user' },
  listProduct: [
    {
      productId: { type: ObjectId, ref: 'prodcut' },
      quantity: { type: Number, min: 1 }
    }
  ],
  total: { type: Number, min: 0}
}, { timestamps: true }); 

module.exports = mongoose.models.order || mongoose.model("order", order);