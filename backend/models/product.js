import mongoose from "mongoose";
import User from "./user.js"

const reviewSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User',

  },
  name:{
    type:String,
    required:true,
  },
  comment:{
    type:String,
  },
  rating:{
    type:Number,
    default:0
  }
})


const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    description: String,
    brand: {
      type: String,
      // required: true,
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
    },
    reviews: [reviewSchema],
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
