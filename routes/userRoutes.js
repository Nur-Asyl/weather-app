const express = require('express');
const axios = require('axios');

const router = express.Router();
const userController = require('../controllers/userController')

const WeatherHistory = require('../models/weather');
const User = require('../models/user');


const isAuthenticated = require('../middleware/authMiddleware');



router.get('/login', (req, res) => {
    res.render('login.ejs');
})

router.get('/signup', (req, res) => {
    res.render('signup.ejs');
})

router.post('/login', userController.login);

router.post('/signup', userController.signup);

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        
        res.render('index.ejs', { weatherData: null, forecastData: null, user: null});
    })
});

router.get('/history', isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.user._id;

        const weatherHistory = await WeatherHistory.find({ userId });
        res.render('history', { weatherHistory });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

const PDFDocument = require('pdfkit');
const fs = require('fs');

router.get('/download-pdf', async (req, res) => {
    try {
        const userId = req.session.user._id;

        const userWeatherHistory = await WeatherHistory.find({ userId });

        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="weather_history.pdf"');

        doc.pipe(res);

        doc.text('Weather History');

        userWeatherHistory.forEach(entry => {
            doc.text(`Date: ${entry.dateTime}, Location: ${entry.location}, Temperature: ${entry.temperature}, Description: ${entry.description}`);
        });

        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/findAll', userController.findAll);

router.get('/findOne/:id', userController.findOne);

router.put('/update/:id', userController.update);

router.delete('/destroy/:id', userController.delete);


module.exports = router