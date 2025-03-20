import ApiError from "../utils/ApiError.js";

const checkAmdin = async (req,res,next)=>{
  if(req.user.isAdmin){
    next();
  } else {
    let err = new ApiError(403,"You are not authorized to perform this operation")
    next(err)
  }
}
export default checkAmdin;