require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;
const mongooseOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, mongooseOptions)
    .then(() => console.log("Connected to database"))
    .catch(error => console.log(error.message));

app.use((err, _req, res, _next) => {
    console.log(`Status: ${err.status} | Error: ${err.message}`);
    res.status(err.status).json({message: err.message});
});

app.listen(PORT, () => console.log('Server is running on PORT ' + PORT));