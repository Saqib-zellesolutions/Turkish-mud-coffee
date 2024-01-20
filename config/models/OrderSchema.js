const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    mobile_number: {
      type: String,
      require: true,
    },
    alternate_number: {
      type: String,
      require: true,
    },
    address: {
      type: Object,
      require: true,
    },
    nearest_landmark: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    delivery_instructions: {
      type: String,
      require: true,
    },
    delivery_charges: {
      type: Number,
      require: true,
    },
    payment: {
      type: String,
      require: true,
    },
    tax: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    order_number: {
      type: String,
      required: true,
      unique: true,
    },
    order_Date: {
      type: Date,
    },
    total_amount: {
      type: Number,
      require: true,
    },
    change_cash: {
      type: Number,
      require: true,
    },
    ProductOrder: [
      {
        name: {
          type: String,
          require: true,
        },
        description: {
          type: String,
          require: true,
        },
        sku: {
          type: String,
          require: true,
        },
        parent_id: {
          type: String,
          require: true,
        },
        images: [
          {
            type: String,
          },
        ],
        price: {
          type: String,
          require: true,
        },
        quantity: {
          type: Number,
          require: true,
        },
        instock: {
          type: Boolean,
        },
        variation: {
          type: Object,
        },
      },
    ],
  },
  { timestamps: true }
);
const GetOrderModel = (branch) => {
  return mongoose.model(`Order_${branch}`, OrderSchema);
};
// const OrderModel = mongoose.model("order", OrderSchema);
module.exports = OrderSchema;
