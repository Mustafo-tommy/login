import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

const corsOption = {
  Credential: true,
  origin: (origin, callback) => {
    if (!origin) {
      console.log("Cors: accepting request with no origin");
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      console.log(`CORS accepting origin ${requestOrigin}`);
      return callback(null, true);
    }

    console.warn(`CORS: rejecting origin ${requestOrigin}`);
    return callback(
      new Error(`CORS policy does not allow origin ${requestOrigin}`),
      false,
    );
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  exposedHeaders: ["Authorization", "X-total-Count"],
  maxAge: 86400,
};

app.use(cors(corsOption));

export default app;
