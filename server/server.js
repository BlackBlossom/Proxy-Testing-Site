// server/server.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const proxyRoutes = require('./routes/proxyRoutes');
const { errorHandler } = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const path = require('path');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

app.use(cors(corsOptions));

app.use(express.json());

// Serve everything under "public" at /public
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/proxies', proxyRoutes);

app.use('/api/admin/auth', require('./routes/authRoutes'));

app.use('/api/admin', require('./routes/adminRoutes'));

// global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Backend listening on port ${PORT}`));
});
