const nodemailer = require("nodemailer");
const GetOrderModel = require("../../models/OrderSchema");
require("dotenv").config();
let number = 1;
const AddOrder = async (req, res) => {
  const branch = req.params.branch;
  //   const transporter = nodemailer.createTransport({
  //     port: 465,
  //     service: "webmail", // Use lowercase "gmail" for the service
  //     secure: true,
  //     host: "mail.zameeransari.com.pk",
  //     tls: {
  //       rejectUnauthorized: false, // Allow less secure apps (not recommended)
  //     },
  //     auth: {
  //       user: process.env.EMAIL,
  //       pass: process.env.PASSWORD,
  //     },
  //   });
  //   await new Promise((resolve, reject) => {
  //     // verify connection configuration
  //     transporter.verify(function (error, success) {
  //       if (error) {
  //         console.log(error);
  //         reject(error);
  //       } else {
  //         console.log("Server is ready to take our messages");
  //         resolve(success);
  //       }
  //     });
  //   });
  const OrderModel = GetOrderModel(branch);
  let allproduct = await OrderModel.find();
  order_Date = new Date();
  const formattedOrderDate = order_Date.toLocaleString("en-PK", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
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
        change_cash,
      });
      //   const template = `<!DOCTYPE html>
      //   <html>
      //   <head>
      //     <meta charset="utf-8">
      //     <title>Your Email Title</title>
      //     <style>
      //       /* Inline CSS for better compatibility */
      //       .center {
      //         text-align: center;
      //       }
      //       .borders {
      //         border: 1px solid #000;
      //       }
      //       .width-100{
      //         width:100%
      //       }
      //       body{
      //         font-family: 'Poppins', sans-serif;
      //       }
      //       body,p,th,td,h2,h4{
      //         font-family: 'Poppins', sans-serif;
      //       }
      //     </style>
      //     <link rel="preconnect" href="https://fonts.googleapis.com" />
      // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      // <link
      //   href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
      //   rel="stylesheet"
      // />
      //   </head>
      //   <body style="margin: 0; padding: 0; text-align: center;
      //   font-family: 'Poppins', sans-serif;">
      //     <table width="100%" cellspacing="0" cellpadding="0">
      //       <tr>
      //         <td align="center">
      //           <table width="600" cellspacing="0" cellpadding="0" style="background-color: #efefef">
      //             <tr>
      //               <td align="center" bgcolor="#E7E7E7">
      //                 <div style="text-align: center">
      //                   <img width="100" height="100" src="https://res.cloudinary.com/dnwbw493d/image/upload/v1699033802/Zameer-Logo-New_e52irz.jpg" alt="">
      //                 </div>
      //                 <div style="border: 1px solid gray; border-radius: 8px">
      //                   <div style="text-align: left; width: 100%; background: #bc2423; color: #fff; padding: 3px 0; border-top-left-radius: 8px; border-top-right-radius: 8px;">
      //                     <h2 style="padding: 0 35px">Thank You for your order</h2>
      //                   </div>
      //                   <div style="padding: 10px 35px; text-align: left; background-color: #fff;">
      //                     <p style="color: black; font-size:18px;">Hi ${title} ${name},</p>
      //                     <p style="color: black; font-size:18px;">Just to let you know - we've received your order, and it is now being processed</p>
      //                     <h4 style="color: #bc2423;">[${orderNumber}] ${formattedOrderDate}</h4>
      //                     <table width="100%" cellspacing="0" cellpadding="10" border="1" style="width:100%; border: 1px solid gray; background-color: #fff;" class="borders width-100">
      //                       <tr>
      //                         <th width="50%" style="color: black; font-size:18px;">Product</th>
      //                         <th width="25%" style="color: black;font-size:18px;">Quantity</th>
      //                         <th width="25%" style="color: black;font-size:18px;">Price</th>
      //                       </tr>
      //                       ${ProductOrder.map(
      //                         (e, index) => `
      //                         <tr>
      //                           ${
      //                             e.variation
      //                               ? `<td style="color: black;font-size:18px;">${
      //                                   e.name
      //                                 } ${e.variation && "-"} ${
      //                                   e.variation && e.variation.name
      //                                 }</td>`
      //                               : `<td style="color: black;font-size:18px;">${e.name}</td>`
      //                           }
      //                           <td style="color: black;font-size:18px;">${
      //                             e.quantity
      //                           }</td>
      //                           <td style="color: black;font-size:18px;">${
      //                             e.variation
      //                               ? e.variation.price * e.quantity
      //                               : e.price * e.quantity
      //                           }</td>
      //                         </tr>`
      //                       ).join("")}
      //                     </table>
      //                     <table class="width-100" width="100%" cellspacing="0" cellpadding="10" border="1" style="width:100%; border: 1px solid gray; background-color: #fff;">

      //                     <tr>
      //                         <td style="color: black;font-size:18px;"><b>SubTotal:</b></td>
      //                         <td style="color: black;font-size:18px;"><b>Rs ${total_amount}</b></td>
      //                       </tr>
      //                       <tr>
      //                         <td style="color: black;font-size:18px;"><b>Shipping:</b></td>
      //                         <td style="color: black;font-size:18px;"><b>Rs ${delivery_charges} via FLat Rate</b></td>
      //                       </tr>
      //                       <tr>
      //                         <td style="color: black;font-size:18px;"><b>Payment Method:</b></td>
      //                         <td style="color: black;font-size:18px;"><b>${payment}</b></td>
      //                       </tr>
      //                       <tr>
      //                         <td style="color: black;font-size:18px;"><b>Total Tax:</b></td>
      //                         <td style="color: black;font-size:18px;"><b>Rs ${Math.round(
      //                           tax
      //                         )}</b></td>
      //                       </tr>
      //                       <tr>
      //                         <td style="color: black;font-size:18px;"><b>Delivery Charges:</b></td>
      //                         <td style="color: black;font-size:18px;"><b>Rs ${delivery_charges}</b></td>
      //                       </tr>
      //                       <tr>
      //                         <td style="color: black;font-size:18px;"><b>Total:</b></td>
      //                         <td style="color: black;font-size:18px;"><b>Rs ${Math.round(
      //                           total_amount + tax + delivery_charges
      //                         )}</b></td>
      //                       </tr>
      //                       ${
      //                         !delivery_instructions
      //                           ? ""
      //                           : `<tr><td style="color: black;font-size:18px;"><b>Note:</b></td>
      //                           <td style="color: black;font-size:18px;"><b>${delivery_instructions}</b></td></tr>`
      //                       }
      //                     </table>
      //                     <h4 style="color: #bc2423;">Customer Detail</h4>
      //                     <div style="width: 100%; border: 1px solid gray; padding: 10px;">
      //                       <p style="margin: 0; color: black;font-size:18px;">${name}</p>
      //                       <p style="margin: 0; color: black;font-size:18px;">${mobile_number}</p>
      //                       <p style="margin: 0; color: black;font-size:18px;">${alternate_number}</p>
      //                       <p style="margin: 0; color: black;font-size:18px; text-transform: capitalize;">${
      //                         address.location
      //                       } ${address.complete}</p>
      //                       <p style="margin: 0; color: blue;font-size:18px;" href="${email}">${email}</p>
      //                     </div>
      //                     <p style="padding: 10px 0; color: black; font-size:18px;">Thanks for Ordering <span style="color: blue;">zameeransari.com.pk</span></p>
      //                   </div>
      //                 </div>
      //                 <p style="text-align: center;font-size:18px;">Zameer Ansari - Designed And Managed By Zelle Solutions</p>
      //               </td>
      //             </tr>
      //           </table>
      //         </td>
      //       </tr>
      //     </table>
      //   </body>
      //   </html>
      //   `;
      //   const UserEmailOptions = {
      //     from: `${process.env.EMAIL_USERNAME} <${process.env.EMAIL}>`,
      //     bcc: [
      //       "shuja.zellesolutions@gmail.com",
      //       "osama.zellesolutions@gmail.com",
      //       "faraya.zellesolutions@gmail.com",
      //       "sawera.zellesolutions@gmail.com",
      //       "sajid.zellesolutions@gmail.com",
      //       "aman.zellesolutions@gmail.com",
      //       "arbaz.zellesolutions@gmail.com",
      //     ],
      //     to: `${newProduct.email}`,
      //     subject:
      //       "Your Bahadurabad - Zameer Ansari BBQ & Grill order has been received!",
      //     html: template,
      //   };

      //   await new Promise((resolve, reject) => {
      //     // send mail
      //     transporter.sendMail(UserEmailOptions, (err, info) => {
      //       if (err) {
      //         console.error(err);
      //         reject(err);
      //       } else {
      //         console.log(info);
      //         resolve(info);
      //       }
      //     });
      //   });
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
