function handleSubmit(event){
    event.preventDefault()

    /* Global Variables */
    const geoNamesURL ="http://api.geonames.org/postalCodeSearchJSON?postalcode=";

    const weatherBitURL = "http://api.weatherbit.io/v2.0/forecast/daily?units=I&key=";

    const pixabayURL = "https://pixabay.com/api/?key=";

    const zip = document.getElementById('zip').value;

    /**
    const dateRange = document.getElementById('tripStartDate').innerHTML;

    const start_date = dateRange.split(" ");
    start_date[3] = start_date[3].toString().replace(/\//g,"-");
    start_date[3] = [start_date[3].slice(-4), start_date[3].slice(0,5)].join('-');
    const end_date = dateRange.split(" ");
    end_date[6] = end_date[6].toString().replace(/\//g,"-");
    end_date[6] = [end_date[6].slice(-4), end_date[6].slice(0,5)].join('-');

    **/

    // Create a new date instance dynamically with JS
    const d = new Date();
    const newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    getCreds()
        .then(function(creds){
        getGeoNamesAPI(geoNamesURL, zip, creds.geo)
            .then(function(res){
                if(res.postalCodes.length != 0){
                    postData('/addGeoNames', {latitude:res.postalCodes[0].lat,longitude:res.postalCodes[0].lng,country:res.postalCodes[0].countryCode, location:res.postalCodes[0].placeName});
                    getWeatherBit(weatherBitURL, creds.bit, res.postalCodes[0].lat, res.postalCodes[0].lng)
                    .then(function(bitRes){
                        postData('/addWeatherBit', {info: bitRes.data});
                        getPixaBay(pixabayURL, creds.pix, bitRes.city_name)
                        .then(function(pixRes){
                            postData('/addPixaBay', {info: pixRes});
                            updateUI();
                        });
                    });
                }
                else{
                    alert("Please validate postal code and try again");
                }
            });
        });
}

    //POST request calling server.js to store geonames data
    const postData = async ( url = '', data = {}) => {
        const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

        try {
            const newData = await response.json();
            return newData;
        }catch(error) {
        console.log("error", error);
        alert("Invalid postal code please try again.");
        }
    };
    //GET request to geonames api
    const getGeoNamesAPI = async (geoNamesURL, zip, geoNamesId) => {
        const res = await fetch(geoNamesURL+zip+"&username="+ geoNamesId, {
            method: 'GET'
        });
        try {
            let data = await res.json();
            return data;
        } catch (error) {
            console.log("error:", error);
            alert("Invalid postal code please try again.");
        }
    }

    //GET request to weather api
    const getWeatherBit = async (weatherBitURL, weatherBitAPICred, lat, lng, start, end) => {
        const res = await fetch(weatherBitURL+weatherBitAPICred+"&lat="+lat+"&lon="+lng, {
            method: 'GET'
        });
        try {
            let data = await res.json();
            return data;
        } catch (error) {
            console.log("error:", error);
            alert("Invalid postal code please try again.");
        }
    }

    const getPixaBay = async (pixabayURL, pixabayAPICred, location) => {
        const res = await fetch(pixabayURL+pixabayAPICred+"&q="+encodeURIComponent(location)+"&image_type=photo", {
            method: 'GET'
        });
        try {
            let data = await res.json();
            return data;
        } catch (error) {
            console.log("error:", error);
            alert("Invalid postal code please try again.");
        }

    }

    //Async request used to update UI
    const updateUI = async() => {
    	const req = await fetch('/getData');
        try {
            const placeUI = document.getElementById("place");
        	const latUI = document.getElementById("latitude");
    		const lngUI = document.getElementById("longitude");
    		const countryUI = document.getElementById("country");
            const dateUI = document.getElementById("date");
            const tempUI = document.getElementById("temp");
            const imgUI = document.getElementById("pixImg");
            const weatherUL = document.getElementById("weatherForecast");

            const geoNamesData = await req.json();
            placeUI.innerHTML = geoNamesData.location;
            latUI.innerHTML = "Latitude: " + geoNamesData.latitude;
            lngUI.innerHTML = "Longitude: " + geoNamesData.longitude;
            countryUI.innerHTML = "Country: " + geoNamesData.country;
            dateUI.innerHTML = "Date: " + geoNamesData.weatherData[0].weatherDate;
            tempUI.innerHTML = "Temperature: " + geoNamesData.weatherData[0].weatherTemp;
            if(geoNamesData.pix == ""){
                imgUI.src = "https://cdn.pixabay.com/user/2020/06/03/11-05-03-625_250x250.jpg";
            } else{
                imgUI.src = geoNamesData.pix;
            }

            document.getElementById("generate").style.display = "none";
            document.getElementById("clear").style.display = null;
            document.getElementById("zip").style.display = "none";
            document.getElementById("zipLabel").style.display = "none";

            geoNamesData.weatherData.forEach(function(item){
                let li = document.createElement('li');
                let dateDiv = document.createElement('div');
                dateDiv.innerHTML = "Date: " + item.weatherDate;
                let tempDiv = document.createElement('div');
                tempDiv.innerHTML = "Temp: " + item.weatherTemp
                let descDiv = document.createElement('div');
                descDiv.innerHTML = "Weather: " + item.weatherDescription;
                li.appendChild(dateDiv);
                li.appendChild(tempDiv);
                li.appendChild(descDiv);
                weatherUL.appendChild(li);
            });
        } catch(error) {
            console.log('error', error);
        }
    };

    const getCreds = async() => {
        const req = await fetch('/getCreds');
        try {
            const creds = await req.json();
            return creds;
        } catch(error) {
             console.log('error', error);
        }
    }


export { handleSubmit };

