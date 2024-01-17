const express = require('express');
const cors = require('cors');
const app = express();


//config
app.use(cors());
app.use(express.json());


//DB Connection
const conn = require('./db/conn');
conn();


// Routes
const routes = require('./routes/router');
app.use('/api', routes);


// service
app.listen(3000, function() {
    console.log("Servidor Online!");
});