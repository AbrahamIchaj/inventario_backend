import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config();

import roleRoutes from "./routes/roleRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API'S
app.use("/api/roles", roleRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
