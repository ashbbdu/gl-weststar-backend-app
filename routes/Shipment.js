
const express = require("express");
const { addShipment, updateShipment, deleteShipment, allShipments } = require("../controllers/Shipment");
const { auth } = require("../middlewares/auth");



const router = express.Router()
router.post("/addShipment" , auth , addShipment);
router.put("/updateShipment/:shipmentId" , auth , updateShipment);
router.delete("/deleteShipment/:shipmentId" , auth , deleteShipment);
router.get("/allShipments" , auth , allShipments);

module.exports = router;