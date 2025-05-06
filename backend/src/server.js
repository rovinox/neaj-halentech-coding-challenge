import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import ticketRoutes from "./routes/ticketsRoutes.js";

const app = express();
const PORT = process.env.PORT || 8001;

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  credentials: true,
};

// Express middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/tickets", ticketRoutes);

// Root route for basic API check
app.get("/", (req, res) => {
  res.json({ message: "Halen Technologies Ticket Management API" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
