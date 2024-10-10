const { mongoose } = require("mongoose");

const ShipmentSchema = new mongoose.Schema({
    shipmentNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    
    transportType: {
        type: String,
        enum: ["Air" , "Sea" , "Land"],
        required: true,
    },
    portOfLoading: {
        type: String,
        required: true,
        trim: true
    },
    portOfDischarge: {
        type: String,
        required: true,
        trim: true
    },
    estimatedTimeOfDeparture: {
        type: Date,
        required: true
    },
    actualTimeOfDeparture: {
        type: Date,
        required: true
    },
    estimatedTimeOfArrival: {
        type: Date,
        required: true
    },
    actualTimeOfArrival: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending","In Transit","Delivered","Delayed"],
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Shipment', ShipmentSchema);