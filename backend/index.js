import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import customerRoutes from "./routers/customers.js";
import purchaseRoutes from "./routers/purchases.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use("/customers", customerRoutes);
app.use("/purchases", purchaseRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
