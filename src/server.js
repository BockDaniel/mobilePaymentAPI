// initialize the node packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

// call the routing module
const commRoutes = require('./routes/comm_mw')

// initialize the dotenv
dotenv.config();
const server_port = Number(process.env.PORT || 4040);

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// get the static sripts for the pages
app.use(express.static('page_scripts'));
app.use('/comm', commRoutes)

// creating the depfault route
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './pages/index.html'));
});


// starting the server
app.listen(server_port, () => {
    console.log(`Server successfully started and listening on port ${server_port}`)
})
