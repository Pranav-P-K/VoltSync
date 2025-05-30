import express from "express"
import {
  createStation,
  getStations,
  getStation,
  updateStation,
  deleteStation,
} from "../controllers/chargingStationController.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

// All routes require authentication
router.use(authenticate)

router.post("/", createStation)
router.get("/", getStations)
router.get("/:id", getStation)
router.put("/:id", updateStation)
router.delete("/:id", deleteStation)

export default router
