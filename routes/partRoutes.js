const express = require("express");
const {
  createPart,
  getParts,
  getPartById,
  updatePart,
  deletePart,
} = require("../controllers/partController");
const router = express.Router();

router.post("/", createPart);
router.get("/", getParts);
router.get("/:id", getPartById);
router.put("/:id", updatePart);
router.delete("/:id", deletePart);

module.exports = router;
