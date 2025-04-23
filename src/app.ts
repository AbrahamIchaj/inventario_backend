import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config();

import roleRoutes from "./routes/roleRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import taxRoutes from "./routes/taxRoutes";


// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API'Ss
app.use("/api/roles", roleRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/tax", taxRoutes );

// SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
