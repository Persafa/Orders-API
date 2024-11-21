const mongoose = require('mongoose');// importacion de Mongoose

// esquema para la información de pago
const PaymentSchema = new mongoose.Schema({
    method: { type: String, required: true },
    card_number: { type: String, required: true },
    valid_at: { type: String, required: true },
    document_number: { type: String, required: true }
});

// esquema principal para una orden
const OrderSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    item_id: { type: String, required: true },
    discount_id: { type: String, default: null },
    payment: { type: PaymentSchema, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// exportacion del modelo
module.exports = mongoose.model('Order', OrderSchema);
