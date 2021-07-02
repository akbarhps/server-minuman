require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const mongooseOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(process.env.MONGO_URL, mongooseOptions)
    .then(() => console.log("Connected to database"))
    .catch(error => console.log(error.message));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname + 'public'));

// Routes
const productRoute = require('./src/routes/product.routes');
app.use('/api/products', productRoute);

app.use((err, _req, res, _next) => {
    const status = err.status || 500;
    console.log(`Status: ${status} | Error: ${err.message}`);
    res.status(status).json({status: status, message: err.message});
});

app.listen(PORT, () => console.log('Server is running on PORT ' + PORT));