// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

// Start up an instance of app
const app = express();
app.use(express.static("dist"));

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

/* Creds */
const geoNamesId=process.env.geoID;
const weatherBitAPICred = process.env.weatherBitID;
const pixabayAPICred = process.env.pixaBayID;

// Setup Server
const port = 8080;

const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
  };

app.get("/getData", function(req, res){
    res.send(projectData);
});

app.get("/getCreds", function(req,res){
    creds = {
        geo: geoNamesId,
        bit: weatherBitAPICred,
        pix: pixabayAPICred,
    }
    res.send(creds);
});

app.post("/addGeoNames", function(req, res){
    newData = {
        location: req.body.location,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        country: req.body.country,
	}
    Object.assign(projectData, newData);
    res.send(projectData);

});

app.post("/addWeatherBit", function(req, res){
    newData = [];
    for(let count = 0; count<7; count++){
        newObj = {
            weatherDate: req.body.info[count].datetime,
            weatherTemp: req.body.info[count].temp,
            weatherDescription: req.body.info[count].weather.description,
        }
        newData.push(newObj);
    }

    submitData = {
        weatherData: newData,
    }
    Object.assign(projectData, submitData);
    res.send(projectData);

});

app.post("/addPixaBay", function(req, res){
    try{
        newData = {
            pix: req.body.info.hits[0].webformatURL,
        }
    }catch(error){
        console.log("No image available");
        newData = {
            pix: "",
        }
    }
    Object.assign(projectData, newData);
    res.send(projectData);

});

module.exports = app;
