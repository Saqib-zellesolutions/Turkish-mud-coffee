const GetOrderModel = require("../../models/OrderSchema");
require("dotenv").config();
let number = 1;
const AddOrder = async (req, res,io) => {
  const branch = req.params.branch;
  const OrderModel = GetOrderModel(branch);
  let allproduct = await OrderModel.find();
  order_Date = new Date();
  const {
    title,
    name,
    mobile_number,
    alternate_number,
    address,
    nearest_landmark,
    email,
    delivery_instructions,
    payment,
    ProductOrder,
    status,
    tax,
    delivery_charges,
    total_amount,
    change_cash,
  } = req.body;
  if (
    !title ||
    !name ||
    !mobile_number ||
    !address ||
    !email ||
    !payment ||
    !delivery_charges ||
    !total_amount ||
    !ProductOrder.length
  ) {
    return res.json({ message: "Required infos are missing" });
  } else {
    try {
      const orderNumber = `ORD-${allproduct.length + number}`;
      const newProduct = await OrderModel.create({
        title,
        name,
        mobile_number,
        alternate_number,
        address,
        nearest_landmark,
        email,
        delivery_instructions,
        payment,
        status,
        order_Date,
        tax,
        delivery_charges,
        total_amount,
        order_number: orderNumber,
        ProductOrder: ProductOrder,
        // ProductOrder: ProductOrder,
        change_cash,
      });
      io.emit("newOrder", newProduct);
      res.json({
        message: "Order Confirm",
        mail: "Email sent successfully",
        data: newProduct,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  // }
};
module.exports = AddOrder;
