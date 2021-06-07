function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: {lat: 40.75204, lng: -73.99136},
  });
  // Create an array of alphabetical characters used to label the markers.
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locations" array.
  // The map() method here has nothing to do with the Google Maps API.
  const markers = locations.map((location, i) => {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length],
    });
  });
  // Add a marker clusterer to manage the markers.
  new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });
}
const locations = [
  {lat: 40.814952414706234, lng: -73.9357404878696},
  {lat: 40.80533782057538, lng: -73.94724180062583},
  {lat: 40.73851692904129, lng: -74.00097181394982},
  {lat: 40.73721624531854, lng: -73.99238874472874},
];