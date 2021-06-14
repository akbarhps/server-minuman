require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

const mongooseOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(process.env.MONGO_URL, mongooseOptions)
    .then(() => console.log("Connected to database"))
    .catch(error => console.log(error.message));

app.use((error, _req, res, _next) => {
    // Middleware error catch
    //TODO: Implement error handler
});

app.listen(PORT, () => console.log('Server is running on PORT ' + PORT));