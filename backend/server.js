import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./src/config/database.js"
import authRoutes from "./src/routes/auth.js"
import chargingStationRoutes from "./src/routes/chargingStations.js"
import { errorHandler } from "./src/middleware/errorHandler.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB()

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    //origin: "http://localhost:5173",
    credentials: true,
  }),
)
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/charging-stations", chargingStationRoutes)

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "VoltSync API is running" })
})

// Error handling middleware
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
