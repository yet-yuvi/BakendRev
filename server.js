const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Parse request from body JSON
app.use(bodyParser.json());

// Define a simple route
app.get('/', (req, res) => {
    res.json({massage: 'WElcome to my application'});
})

// Create a user
app.post('/users', (req, res) => {
    const user = req.body;
    res.json(user);
})

// Start the Server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})