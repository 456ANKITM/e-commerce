import User from "./models/user.js"
import Product from "./models/product.js"
import Order from "./models/order.js"
import connectDB from "./data/db.js";

import products from "./data/products.js"
import users from "./data/users.js"


connectDB()

async function loadData(){
  await Product.insertMany()
  await User.deleteMany()
  await Order.deleteMany()

  const newUsers =  await User.insertMany(users);  
  await Product.insertMany(products.map(p=>(
    {
      ...p,
      users: newUsers[0]._id
    }
  )))  
  console.log("Data Loaded");
  process.exit();

}



async function destroyData(){
  await Product.deleteMany();
  await User.deleteMany();
  await Order.deleteMany();
  
  console.log("Data Destroyed Sucessfully");
  process.exit();
}

if(process.argv[2] == "-d") destroyData()
else loadData();