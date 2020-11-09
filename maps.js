
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
function showMapLoc() {
    map = new google.maps.Map(document.getElementById("map_canvas"), {
        zoom: 15,
        center: new google.maps.LatLng(lat, long),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}

// function to position the map and mark the area in the map
// by drawing the polygin with the given coordinates
function drawShape(shapeCoords) {
    showMapLoc();
 
    var polygonCoords = [];
    var splitCoords = str.split(" ");
    for (var i = 0; i < splitCoords.length; i++) {
        var pt = { lat: splitCoords[0], lng: splitCoords[1] };
        polygonCoords.push(pt);
    }

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