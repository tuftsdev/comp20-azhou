
function initMap() {
  southstn = {lat: 42.352271, lng: -71.05524200000001};
  map = new google.maps.Map(document.getElementById('map'), {
  zoom: 15,
  center: southstn
});
  drawLine(map, 42.352271, -71.05524200000001, 42.355518, -71.060225);

}
function drawLine(map, lat1, lng1, lat2, lng2){
  addMarker(map, lat1, lng1);
  polyline = new google.maps.Polyline({
    path:[
      new google.maps.LatLng(lat1, lng1),
      new google.maps.LatLng(lat2, lng2)
    ],
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 5,
    map: map
  });
}
function addMarker(map, lat, lng){
  newmarker = {lat, lng};
  marker = new google.maps.Marker({
    position: newmarker,
    map: map
  });
}