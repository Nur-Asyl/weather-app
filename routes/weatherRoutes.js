const express = require('express');
const WeatherHistory = require('../models/weather');
const User = require('../models/user');

const router = express.Router();
const weatherController = require('../controllers/weatherController');
const axios = require('axios');

const OPEN_WEATHER_MAP_API_KEY = "709d0ff50ae9221f8ae9916496ba77cc";
const VISUAL_CROSSING_API_KEY = '3A5QWCLECANGUPR99GW52YWU9';

router.get('/', async (req, res) => {
    let city = req.query.city || "Astana";

    try {
        const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_MAP_API_KEY}`
        );

        const visualCrossingResponse = await axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${VISUAL_CROSSING_API_KEY}`
        );

        const forecastData = visualCrossingResponse.data;

        const weatherData = {
            cityId: response.data.id,
            city: response.data.name,
            temperature: response.data.main.temp,
            feelsLike: response.data.main.feels_like,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            coordinates: response.data.coord,
            humidity: response.data.main.humidity,
            pressure: response.data.main.pressure,
            windSpeed: response.data.wind.speed,
            countryCode: response.data.sys.country,
            rainVolume: response.data.rain ? response.data.rain['1h'] : 0,
        };

        if (req.session.user) {
            const user = req.session.user;

            const weatherEntry = new WeatherHistory({
                userId: user._id,
                location: city,
                dateTime: new Date(),
                temperature: weatherData.temperature,
                description: weatherData.description
            });

            await weatherEntry.save();

            await User.findByIdAndUpdate(user._id, {
                $push: { weatherHistory: weatherEntry._id }
            });
        }

        res.render('index.ejs', { weatherData, forecastData, user: req.session.user });
    } catch (error) {
        console.error(error);
        res.render('index.ejs', { weatherData: null, forecastData: null, user: req.session.user });
    }
});

module.exports = router;
