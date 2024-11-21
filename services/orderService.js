const Order = require('../models/orderModel');

// Función para crear una nueva orden en la base de datos
const createOrder = async (userId, itemId, discountId, payment) => {
    try {
        // Validaciones básicas
        if (!userId || !itemId || !payment) {
            throw new Error('Missing required fields: userId, itemId, or payment');
        }
        if (!payment.method || !payment.card_number || !payment.valid_at || !payment.document_number) {
            throw new Error('Incomplete payment information');
        }

        // Crear una nueva orden
        const newOrder = new Order({
            user_id: userId,
            item_id: itemId,
            discount_id: discountId || null,
            payment: {
                method: payment.method,
                card_number: payment.card_number.slice(-4), // Guarda solo los últimos 4 dígitos
                valid_at: payment.valid_at,
                document_number: payment.document_number
            }
        });
        await newOrder.save();
        return newOrder;
    } catch (error) {
        console.error("Error creating order:", error);
        throw new Error('Failed to create order');
    }
};


// Función para obtener todas las órdenes de un usuario específico
const getOrdersByUserId = async (userId) => {
    return await Order.find({ user_id: userId });
};

// Función para obtener todas las órdenes en la base de datos
const getAllOrders = async () => {
    return await Order.find();
};

const getOrdersByItemId = async (itemId) => {
    // Busca órdenes con el item_id proporcionado
    return await Order.find({ item_id: itemId });

};

const getOrdersByDate = async (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999); // Asegura que el rango incluya todo el dia

    return await Order.find({
        created_at: {
            $gte: start,
            $lte: end
        }
    });
};


// Exporta todas las funciones del servicio
module.exports = {
    createOrder,
    getOrdersByUserId,
    getAllOrders,
    getOrdersByItemId,
    getOrdersByDate
};
