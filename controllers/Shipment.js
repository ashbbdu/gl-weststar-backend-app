// import Shipment from "../models/Shipment";
const Shipment = require("../models/Shipment")

module.exports.addShipment = async (req , res) => {
    try {
        const {
            shipmentNumber,
            transportType,
            portOfLoading,
            portOfDischarge,
            estimatedTimeOfDeparture,
            actualTimeOfDeparture,
            estimatedTimeOfArrival,
            actualTimeOfArrival,
            status,
        } = req.body;

        if (!shipmentNumber ||
            !transportType ||
            !portOfLoading ||
            !portOfDischarge ||
            !estimatedTimeOfDeparture ||
            !actualTimeOfDeparture ||
            !estimatedTimeOfArrival ||
            !actualTimeOfArrival ||
            !status) {
            return res.status(411).json({
                success: false,
                msg: "Please fill the required fields"
            })
        }

     const newShipment = await Shipment.create({
            shipmentNumber,
            transportType,
            portOfLoading,
            portOfDischarge,
            estimatedTimeOfDeparture,
            actualTimeOfDeparture,
            estimatedTimeOfArrival,
            actualTimeOfArrival,
            status,
        });

        return res.status(201).json({
            message: 'Shipment created successfully',
            shipment: newShipment,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to create shipment',
        });
    }
};

module.exports.updateShipment = async (req , res) => {
    const {shipmentId} = req.params; 
    const updateData = req.body;

    try {
        if (!shipmentId) {
            return res.status(400).json({
                success: false,
                msg: "Shipment ID is required"
            });
        }


        const updatedShipment = await Shipment.findByIdAndUpdate(shipmentId, updateData, {
            new: true,
            runValidators: true 
        });

        if (!updatedShipment) {
            return res.status(404).json({
                success: false,
                msg: "Shipment not found"
            });
        }

        return res.status(200).json({
            message: 'Shipment updated successfully',
            shipment: updatedShipment,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to update shipment',
        });
    }
};

module.exports.deleteShipment = async (req , res) => {
    const { shipmentId } = req.params;
    try {
        const shipment = await Shipment.findById({_id : shipmentId});
        if(!shipment) {
            return res.status(413).json({
                success : false,
                msg : "Shipment not found"
            })
        }

        const deleteShipment = await Shipment.findByIdAndDelete({_id : shipmentId});
        return res.status(200).json({
            success : false,
            msg : "Shipment deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to delete shipment',
        });
    }
}


module.exports.allShipments = async (req , res) => {
    try {        
        const shipments = await Shipment.find();
        return res.status(200).json({
            message : "Shipments fetched successfully !",
            shipments
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch all the shipment',
        });
    }
}

module.exports.shipmentById = async (req , res) => {
    const { shipmentId } = req.params;
    try {        
        const shipment = await Shipment.findById({_id : shipmentId});
        return res.status(200).json({
            message : "Shipment fetched successfully !",
            shipment
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch all the shipment',
        });
    }
}