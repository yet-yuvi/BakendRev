const express = require('express');
const app = express();

// Define a simple route
app.get('/', (req, res) => {
    res.json({massage: 'WElcome to my application'})
})

// Start the Server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})