
function continueTimer(event){
    event.preventDefault()
    let tripStartDate = null;
    let tripEndDate = null;
    let options = {
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "numeric"
    };
    tripStartDate = document.getElementById("trip-start").valueAsDate;
    tripEndDate = document.getElementById("trip-end").valueAsDate;
    document.getElementById("tripStartDate").innerHTML = "Trip dates: " + tripStartDate.toLocaleDateString("en", options) + " - " + tripEndDate.toLocaleDateString("en", options);
    document.getElementById("trip-start").style.display = "none";
    document.getElementById("trip-end").style.display = "none";
    document.getElementById("trip-end").style.display = "none";
    document.getElementById("count-down").style.visibility = "visible";
    document.getElementById("datesGenerate").style.display = "none";
    let dateCounter = "";
    window.interval = setInterval(function() {
        let now = new Date().getTime();
        let t = tripStartDate - now;
        if(t <= 0){
            document.getElementById("count-down").innerHTML = "0d 0h 0m 0s";
        }
        else{
            let days = Math.floor(t / (1000 * 60 * 60 * 24));
            let hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
            let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((t % (1000 * 60)) / 1000);
            dateCounter = "Time until trip: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s "
            document.getElementById("count-down").innerHTML = dateCounter;
        }

    }, 1000);
}

export { continueTimer };