require('dotenv').config();
const express = require('express');
const app = express();
const patentRoutes = require('./routes/patentRoutes');
const jsonDB = require('./db/jsonDatabase');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/patents', patentRoutes);
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Initialize JSON Database
jsonDB.initializeDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
