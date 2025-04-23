import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";

dotenv.config();

import roleRoutes from "./routes/roleRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

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

// API'S
app.use("/api/roles", roleRoutes);

// SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
