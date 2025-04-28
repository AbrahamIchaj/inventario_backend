import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config();

import roleRoutes from "./routes/roleRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import taxRoutes from "./routes/taxRoutes";
import brandRoutes from "./routes/brandRoutes";
import paymentmethodRoutes from "./routes/paymentmethodRoutes";

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.1.138:3000",
  "http://192.168.1.22:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      const msg = `The CORS policy for this site does not allow access from ${origin}`;
      return callback(new Error(msg), false);
    },
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
app.use("/api/tax", taxRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/paymentmethod", paymentmethodRoutes);

// SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
