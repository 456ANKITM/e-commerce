import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/order.js";
import ApiError from "../utils/ApiError.js";
import createSignature from "../utils/esewaUtils.js";

const addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    itemPrice,
    shippingCharge,
    totalPrice,
    shippingAddress,
    paymentMethod,
  } = req.body;
  const order = await Order.create({
    user: req.user.id,
    orderItems: orderItems.map((item) => ({
      ...item,
      product: item._id,
      _id: undefined,
    })),
    itemPrice,
    shippingCharge,
    totalPrice,
    shippingAddress,
    paymentMethod,
  });
  res.send({
    message: `order placed with id ${order._id}`,
    orderId: order._id,
  });
});

const getOrderById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const order = await Order.findById(id).populate("user", "name email");
  if (!order) throw new ApiError("Order not Found!");
  res.send(order);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "name");
  res.send(orders);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.send(orders);
});

const updateDeliveryStatus = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (!order) throw new ApiError(404, "order not Found");
  if (order.paymentMethod == "cod") {
    order.isPaid = true;
    order.paidAt = new Date();
  }
  order.isDelivered = true;
  order.isPaid = true;
  order.isDeliveredAt = new Date();
  await order.save();
  res.send({ message: "Order delivered!", order });
});

const getEsewaFormData = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);
  if (!order) throw new ApiError(404, "Order Not Found");

  // const signature = createSignature(
  //   `total_amount=${order.totalPrice},transaction_uuid=${order._id},product_code=EPAYTEST`
  // );

  const signature = createSignature({
    total_amount: order.totalPrice,
    transaction_uuid: order._id,
    product_code: "EPAYTEST",
  });

  const formData = {
    amount: order.totalPrice,
    failure_url: "http://localhost:5173/order/" + order._id,
    product_delivery_charge: order.shippingCharge,
    product_service_charge: "0",
    product_code: "EPAYTEST",
    signature: signature,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    success_url: "https://localhost:3000/api/orders/confirm-payment",
    tax_amount: 0,
    total_amount: order.totalPrice,
    transaction_uuid: order._id,
  };
  res.send(formData);
});

const confirmPayment = asyncHandler(async (req, res) => {
  const { data } = req.query;
  const decodedData = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
  if (decodedData.status === "COMPLETE") {
    const order = await Order.findById(decodedData.transaction_uuid);
    order.isPaid = true;
    order.paidAt = new Date();
    order.transactionCode = decodedData.transaction_code;
    await order.save();
    return res.redirect(`http://localhost:5173/order/${order._id}`);
  } else {
    res.send({ message: "Error making payment ", info: decodedData });
  }
});

export {
  addOrder,
  getOrders,
  getMyOrders,
  updateDeliveryStatus,
  getOrderById,
  getEsewaFormData,
  confirmPayment,
};
