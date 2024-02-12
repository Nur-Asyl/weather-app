const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken');

const weatherRoutes = require('./routes/weatherRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRouters = require('./routes/adminRoutes');


const app = express();
const port = process.env.PORT || 3000;

const session = require('express-session');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));


const dbURL = "mongodb+srv://Nur-Asyl:min@cluster0.wxztznh.mongodb.net/weatherApp?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(dbURL, connectionParams).then(()=>{
    console.info("Connected to the MongoDB")
    }).catch((e)=>{
        console.log("Error:", e);
    });


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', weatherRoutes);
app.use('/', userRoutes);
app.use('/admin', adminRouters);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
    console.log("Rg5y$98h4@pX!qL0aP2s#4dS6fG8hJk1")
})