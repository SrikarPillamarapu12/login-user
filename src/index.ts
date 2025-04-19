import express from "express";
import authRoutes from "./routes/auth.route";
import dotenv from "dotenv";

// Load environment variables from the .env file in the root directory
dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("Error: JWT_SECRET is not defined in the .env file.");
  process.exit(1); // Exit the application if JWT_SECRET is missing
}

console.log("JWT_SECRET loaded successfully:", process.env.JWT_SECRET);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount auth routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});