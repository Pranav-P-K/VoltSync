import mongoose from "mongoose"

const chargingStationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Station name is required"],
      trim: true,
    },
    location: {
      latitude: {
        type: Number,
        required: [true, "Latitude is required"],
        min: -90,
        max: 90,
      },
      longitude: {
        type: Number,
        required: [true, "Longitude is required"],
        min: -180,
        max: 180,
      },
      address: {
        type: String,
        trim: true,
      },
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Maintenance"],
      default: "Active",
    },
    powerOutput: {
      type: Number,
      required: [true, "Power output is required"],
      min: 0,
    },
    connectorType: {
      type: String,
      enum: ["Type 1", "Type 2", "CCS", "CHAdeMO", "Tesla Supercharger"],
      required: [true, "Connector type is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Index for geospatial queries
chargingStationSchema.index({ "location.latitude": 1, "location.longitude": 1 })

export default mongoose.model("ChargingStation", chargingStationSchema)
