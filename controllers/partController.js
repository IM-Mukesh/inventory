const Part = require("../models/Part");

// Create a new part
const createPart = async (req, res) => {
  try {
    const { name, description, brandId, warehouseId, quantity, serialNumbers } =
      req.body;
    const part = new Part({
      name,
      description,
      brandId,
      warehouseId,
      quantity,
      serialNumbers,
    });
    await part.save();
    res.status(201).json(part);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all parts
const getParts = async (req, res) => {
  try {
    const parts = await Part.find().populate("brandId").populate("warehouseId");
    res.status(200).json(parts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get part by ID
const getPartById = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id)
      .populate("brandId")
      .populate("warehouseId");
    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }
    res.status(200).json(part);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a part
const updatePart = async (req, res) => {
  try {
    const { name, description, brandId, warehouseId, quantity, serialNumbers } =
      req.body;
    const part = await Part.findById(req.params.id);

    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }

    part.name = name;
    part.description = description;
    part.brandId = brandId;
    part.warehouseId = warehouseId;
    part.quantity = quantity;
    part.serialNumbers = serialNumbers;

    await part.save();
    res.status(200).json(part);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a part
const deletePart = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }
    await part.remove();
    res.status(200).json({ message: "Part deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createPart,
  getParts,
  getPartById,
  updatePart,
  deletePart,
};
