import ApiError from "../utils/ApiError.js";
import  jwt from "jsonwebtoken";
import User from "../models/user.js"

const checkAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    let err = new ApiError(401, "Token Not Supplied");
    return next(err);
  }
  try{
    const {_id} = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(_id)
    req.user = {
      id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin
    }
    next()
  }catch(err){
    next(err)
  }
};

export default checkAuth;
