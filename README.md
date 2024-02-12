# Weather App
Node.js app to check the weather today and forecast for 14 days in your city (temperature, humidity, wind speed, feels like and etc.) and also download by pdf your search history :)

## Dependencies
npm install axios express body-parser ejs path  <br/>
npm install newsapi ejs sessions mongoose bcrypt <br/>

## Admin
Username: Min
Password: lol
AdminRoutes: {
    ('/admin/add|create|edit')
}

## Database (MongoDB)
Mongoose (instead of orig driver) <br/>
Schemes: <br/>
USER { <br/>
    username
    password
    creationDate
    updatedDate
    deletionDate
    adminStatus
    weatherHistory <br/>
}, <br/>
WEATHER { <br/>
    userId
    location
    dateTime
    temperature
    description <br/>
} <br/>

port -> 3000

## Routes
adminRoutes <br/>
userRoutes <br/>
weatherRoutes <br/>

## Middlewares
adminMiddleware <br/>
authMiddleware <br/>

## API's
### OpenWeather: https://openweathermap.org/price <br/>
Uses for fetch weather data 
### Visual Crossing Weather https://www.visualcrossing.com/weather-data-editions <br/>
Uses for forecast for 14 days
### GoogleMap
Uses for show your city in the map


