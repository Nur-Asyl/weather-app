const mongoose = require('mongoose');

const weatherHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    location: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const WeatherHistory = mongoose.model('WeatherHistory', weatherHistorySchema);

module.exports = WeatherHistory;