import { CorsOptions } from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.1.138:3000",
  "http://192.168.1.22:3000",
];

const corsOptions: CorsOptions = {
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
};

export default corsOptions;
