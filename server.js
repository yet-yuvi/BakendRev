const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Parse request from body JSON
app.use(bodyParser.json());

// Define a simple route
app.get('/', (req, res) => {
    res.json({massage: 'WElcome to my application'});
})

let users = [];
let lastId = 0;

// Create a user
app.post('/users', (req, res) => {
    const user = req.body;
    user.id = ++lastId;
    users.push(user);
    res.json(user);
})

// Retrive all users
app.get('/users', (req, res) => {
    res.json(users);
})

// Retrive one user
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);    // Convert id to number, 10 specifies radix
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID." }); // Validation Not-a-Number
    }
    const user = users.find((u) => u.id === id);  // Use strict equality
    if(user) {
        res.json(user);
    }
    else {
        res.status(404).json({message: "User not found."});
    }
})

// Start the Server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})