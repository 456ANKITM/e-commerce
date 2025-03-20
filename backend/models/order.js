import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        name: String,
        qty: Number,
        price: Number,
        image: {
          type: String,
          default: "/images/sample.jpg",
        },
        product:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"product",
          required:true
        }
      },
    ],

    itemPrice: Number,
    shippingCharge: Number,
    totalPrice: Number,
    paymentMethod:{
    type:'String',
    default:'cod'
    },
    shippingAddress: {
      postalCode: String,
      country: String,
      address: String,
      city: String,
    },
    isDeliveredAt: {
      type: Date,
    },
    paidAt:{
      type:Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    transactionCode:String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
