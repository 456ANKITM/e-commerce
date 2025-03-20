import User from "../models/user.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import createToken from "../utils/createToken.js";
// import Product from "../models/product.js";

const signup = asyncHandler(async (req, res) => {
  let { name, email, password, isAdmin } = req.body;
  let user = await User.findOne({ email });
  if (user) throw new ApiError(400, "user already exists");
  let newUser = await User.create({ name, email, password, isAdmin });
  createToken(res, newUser._id);
  res.send({ message: "user registered Sucessfully", user: newUser });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "user not registered");
  if (await user.comparePassword(password)) {
    createToken(res, user._id);
    res.send({
      message: "Login Sucessfull",
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    throw new ApiError(400, "Invalid Password");
  }
});

const logout = asyncHandler(async (req, res) => {
  await res.clearCookie("jwt", "");
  res.send({ message: "Logout Successful" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  res.send(req.user);
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "user Not FOund");
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }
  await user.save();
  res.send({
    message: "profile updated",
    user: {
      name: user.name,
      email: user.email,
      admin: user.isAdmin,
    },
  });
});

export { signup, login, logout, getUserProfile, updateProfile };
