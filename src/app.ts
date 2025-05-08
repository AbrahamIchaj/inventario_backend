import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";
import corsOptions from "./utils/cors";


const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config();

// CORS
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API
import roleRoutes from "./routes/roleRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import taxRoutes from "./routes/taxRoutes";
import brandRoutes from "./routes/brandRoutes";
import paymentmethodRoutes from "./routes/paymentmethodRoutes";
import customerRoutes from "./routes/customerRoutes";
import supplierRoutes from "./routes/supplierRoutes";
import userRoutes from "./routes/userRoutes";
import branchRoutes from "./routes/branchRoutes";
import boxRoutes from "./routes/boxRoutes";
import buyRoutes from "./routes/buyRoutes";
import productRoutes from "./routes/productRoutes";

app.use("/api/roles", roleRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/tax", taxRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/paymentmethod", paymentmethodRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/user", userRoutes);
app.use("/api/branch", branchRoutes);
app.use("/api/box", boxRoutes);
app.use("/api/buy", buyRoutes);
app.use("/api/product", productRoutes);

//SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
