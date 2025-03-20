import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/product.js";
import ApiError from "../utils/ApiError.js";

const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.send(products);
});

const addProducts = asyncHandler(async (req, res) => {
  // const data = req.body;
  const product = await Product.create({
    name: "sample Name",
    user: req.user.id,
    description: "sample description",
    image: "/image/sampleimage.jpg",
    brand: "sample brand",
    category: "sample category",
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  });
  res.send({ message: "product added", product });
});

const getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (product) res.send(product);
  else throw new ApiError(404, "product not found");
});

const updateProducts = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  let product = await Product.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true }
  );
  res.send({
    message: "Product updated",
    product,
  });
});

const deleteProducts = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let toDeleteProduct = await Product.findByIdAndDelete(id);
  if (!toDeleteProduct) {
    throw new ApiError(202, "Product not Found");
  } else {
    res.json("user deleted");
  }
});

const addReview = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  const { comment, rating } = req.body;

  const isReviewed = product.reviews.find(
    (p) => p.user.toString() == req.user.id.toString()
  );
  if (isReviewed) throw new ApiError(400, "Review already added");

  product.reviews.push({
    user: req.user.id,
    name: req.user.name,
    comment,
    rating,
  });
  product.numReviews = product.reviews.length;
  product.rating = (
    product.reviews.reduce((acc, r) => acc + r.rating, 0) /
    product.reviews.length
  ).toFixed(2);
  await product.save();
  res.send({ message: "Review added" });
});

export {
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts,
  getProductById,
  addReview,
};
