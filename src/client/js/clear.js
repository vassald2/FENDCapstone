function clearPage(event){
	event.preventDefault()

	document.getElementById("place").innerHTML = "";
	document.getElementById("latitude").innerHTML = "";
	document.getElementById("longitude").innerHTML = "";
	document.getElementById("country").innerHTML = "";
	document.getElementById("date").innerHTML = "";
	document.getElementById("temp").innerHTML = "";
	document.getElementById("pixImg").src = "";
	document.getElementById("tripStartDate").innerHTML = "Trip dates:";
    document.getElementById("trip-start").style.display = "block";
    document.getElementById("trip-end").style.display = "block";
    document.getElementById("trip-start").value = null;
    document.getElementById("trip-end").value = null;
    document.getElementById("count-down").innerHTML = "";
    document.getElementById("count-down").style.visibility = "hidden";
    document.getElementById("datesGenerate").style.display = null;
    document.getElementById("generate").style.display = null;
	document.getElementById("weatherForecast").innerHTML = "";
    document.getElementById("clear").style.display = "none";
    document.getElementById("zip").value = "";
    document.getElementById("zip").style.display = null;
    document.getElementById("zipLabel").style.display = null;
    clearInterval(window.interval);
}

export { clearPage };