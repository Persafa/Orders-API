const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');

const app = express();


// Conectar a MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/v1', orderRoutes);

const PORT = process.env.PORT || 3000;
// Iniciar el servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
