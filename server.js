import express from "express";
import connectDatabase from "./config/MongoDb.js"
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Error.js";
import orderRouter from "./Routes/orderRoutes.js"
import userRouter from "./Routes/UserRoutes.js";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:4000', 'https://ecommerce-frontend-nu-flame.vercel.app','https://dashboard-two-beta-60.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



// Api
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});



// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
