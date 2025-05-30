import ChargingStation from "../models/ChargingStation.js"

export const createStation = async (req, res) => {
  try {
    const stationData = {
      ...req.body,
      createdBy: req.user._id,
    }

    const station = new ChargingStation(stationData)
    await station.save()

    res.status(201).json({
      message: "Charging station created successfully",
      station,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const getStations = async (req, res) => {
  try {
    const { status, connectorType, minPower, maxPower } = req.query

    // Build filter object
    const filter = {}
    if (status) filter.status = status
    if (connectorType) filter.connectorType = connectorType
    if (minPower || maxPower) {
      filter.powerOutput = {}
      if (minPower) filter.powerOutput.$gte = Number(minPower)
      if (maxPower) filter.powerOutput.$lte = Number(maxPower)
    }

    const stations = await ChargingStation.find(filter).populate("createdBy", "name email").sort({ createdAt: -1 })

    res.json({
      message: "Stations retrieved successfully",
      stations,
      count: stations.length,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const getStation = async (req, res) => {
  try {
    const station = await ChargingStation.findById(req.params.id).populate("createdBy", "name email")

    if (!station) {
      return res.status(404).json({ message: "Station not found" })
    }

    res.json({
      message: "Station retrieved successfully",
      station,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const updateStation = async (req, res) => {
  try {
    const station = await ChargingStation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("createdBy", "name email")

    if (!station) {
      return res.status(404).json({ message: "Station not found" })
    }

    res.json({
      message: "Station updated successfully",
      station,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

export const deleteStation = async (req, res) => {
  try {
    const station = await ChargingStation.findByIdAndDelete(req.params.id)

    if (!station) {
      return res.status(404).json({ message: "Station not found" })
    }

    res.json({
      message: "Station deleted successfully",
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
