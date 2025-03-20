import express from "express";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import logger from "./middleware/logger.js";
import notFoundHandler from "./middleware/notFoundHandler.js";
import errorHandler from "./middleware/errorHandler.js";
import orderRouter from "./routes/orderRouter.js";
import uploadRouter from "../backend/routes/uploadRouter.js";
import path from "path";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use(logger);

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/image", uploadRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
