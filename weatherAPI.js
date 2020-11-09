//Getting element root from HTML file
const app = document.getElementById('root');
var lat, long, index=0;
var map, mapId="";
//Creating and apending a div element with class container to the root element
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);
var coords;
function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            showMapLoc();
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}
function showMapLoc() {
    map = new google.maps.Map(document.getElementById(mapId), {
        zoom: 6,
        center: new google.maps.LatLng(lat, long),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}
//Creating new XMLHTTP request
var request = new XMLHttpRequest();
//Using GET on API and calling function when API loads
request.open('GET', 'https://opendata-download-warnings.smhi.se/api/version/2/alerts.json', true);
request.onload = function () {
    //Parsing JSON response and assigning to data
    let data = JSON.parse(this.response);
    //Checking if request goes through successfully and running function if it does
    if (request.status >= 200 && request.status < 400) {
        //Looping through records which are stored in an array within data variable
        data.alert.forEach((record,index) => {
            //Creating a record-container element and assigning class to it
            const recordContainer = document.createElement('div');
            recordContainer.setAttribute('class', 'container-items padding-container');
            //Creating a record-title and assigning alert to it
            const recordTitle = document.createElement('h3');
            recordTitle.setAttribute('class', 'record-title');
            recordTitle.innerHTML = record.msgType;
            //Creating severity paragraph and assigning info to it
            const severityParagraph = document.createElement('p');
            severityParagraph.setAttribute('class', 'severity-paragraph');
            var severity = "Severity: " + record.info.severity;
            severityParagraph.innerText = severity;
            const headlineParagraph = document.createElement('p');
            headlineParagraph.setAttribute('class', 'location-paragraph');
            var headline = "Location: " + record.info.headline;
            headlineParagraph.innerText = headline;
            //Creating info paragraph and assigning info to it
            const infoParagraph = document.createElement('p');
            infoParagraph.setAttribute('class', 'info-paragraph');
            let obj = record.info.parameter;
            let info;
            for (let property of obj) {
                if (property.valueName === "system_eng_description") {
                    info = property.value;
                }
            }
            infoParagraph.innerText = info;
            //Append the recordContainer to the container
            //and append recordTitle and recordParagraph to recordContainer
            container.appendChild(recordContainer);
            recordContainer.appendChild(recordTitle);
            recordContainer.appendChild(severityParagraph);
            recordContainer.appendChild(headlineParagraph);
            recordContainer.appendChild(infoParagraph);
            coords = record.info.area.polygon;
            if(coords != null) {
            const mapDiv = document.createElement('div');
            mapDiv.setAttribute('class', 'map_container');
            mapId = 'map_canvas'+index;
            mapDiv.setAttribute('id', mapId);
            recordContainer.appendChild(mapDiv);
            drawShape(coords);
            }
        });
    }
    else {
        //If the request didn't go through successfully, return error to console
        console.log('Error: Request unsuccessful');
    }
}
// Error handling for geolocation call
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}
//shows the map centering to the coordinates lat and long
// function to position the map and mark the area in the map
// by drawing the polygin with the given coordinates
function drawShape(shapeCoords) {
    if (shapeCoords != null) {
    var polygonCoords = [];
    var splitCoords = shapeCoords.split(" ");
    for (var i = 0; i < splitCoords.length; i++) {
        var pt = { lat: parseFloat(splitCoords[i].split(",")[0]), lng: parseFloat(splitCoords[i].split(",")[1]) };
        polygonCoords.push(pt);
    }
    lat = parseFloat(splitCoords[0].split(",")[0]);
    long =parseFloat(splitCoords[0].split(",")[1]);
    showMapLoc();
    // Construct the polygon.
    const shape = new google.maps.Polygon({
        paths: polygonCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35
    });
    shape.setMap(map);
    }
}
//Send request
request.send();