
function initMap() {
  southstn = {lat: 42.352271, lng: -71.05524200000001};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: southstn
  });
  drawRedLine(map);
}
function drawRedLine(map){
  drawLine(map, 42.395428, -71.142483, 42.39674, -71.121815);
  drawLine(map, 42.39674, -71.121815, 42.3884, -71.11914899999999);
  drawLine(map, 42.3884, -71.11914899999999, 42.373362, -71.118956);
  drawLine(map, 42.373362, -71.118956, 42.365486, -71.103802);
  drawLine(map, 42.365486, -71.103802, 42.36249079, -71.08617653);
  drawLine(map, 42.36249079, -71.08617653, 42.361166, -71.070628);
  drawLine(map, 42.361166, -71.070628, 42.35639457, -71.0624242);
  drawLine(map, 42.35639457, -71.0624242, 42.355518, -71.060225);
  drawLine(map, 42.355518, -71.060225, 42.352271, -71.05524200000001);
  drawLine(map, 42.352271, -71.05524200000001, 42.342622, -71.056967);
  drawLine(map, 42.342622, -71.056967, 42.330154, -71.057655);
  drawLine(map, 42.330154, -71.057655, 42.320685, -71.052391);
  //split at JFK
  drawLine(map, 42.320685, -71.052391, 42.275275, -71.029583);
  drawLine(map, 42.275275, -71.029583, 42.2665139, -71.0203369);
  drawLine(map, 42.2665139, -71.0203369, 42.251809, -71.005409);
  drawLine(map, 42.251809, -71.005409, 42.233391, -71.007153);
  drawLine(map, 42.233391, -71.007153, 42.2078543, -71.0011385);
  addMarker(map, 42.2078543, -71.0011385);
  //back to JFK split
  drawLine(map, 42.320685, -71.052391, 42.31129, -71.053331);
  drawLine(map, 42.31129, -71.053331, 42.300093, -71.061667);
  drawLine(map, 42.300093, -71.061667, 42.29312583, -71.06573796000001);
  drawLine(map, 42.29312583, -71.06573796000001, 42.284652, -71.06448899999999);
  addMarker(map, 42.284652, -71.06448899999999);
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
    map: map,
    icon: {
      size: new google.maps.Size(20, 20),
      scaledSize: new google.maps.Size(20, 20),
      url: "t.png"
    }
  });
}