function getMyLoc(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      me = {lat: position.coords.latitude, lng: position.coords.longitude};
      initMap();
    });
  }
  else{
    alert("Geolocation not supported by your web browser.");
  }
}
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: me
  });

  allsubMarkers = [];
  drawRedLine(map);
  addStartMarker(map, me.lat, me.lng);
}
function drawRedLine(map){
  drawLine(map, 42.395428, -71.142483, 42.39674, -71.121815, "Alewife");
  drawLine(map, 42.39674, -71.121815, 42.3884, -71.11914899999999, "Davis");
  drawLine(map, 42.3884, -71.11914899999999, 42.373362, -71.118956, "Porter");
  drawLine(map, 42.373362, -71.118956, 42.365486, -71.103802, "Harvard");
  drawLine(map, 42.365486, -71.103802, 42.36249079, -71.08617653, "Central");
  drawLine(map, 42.36249079, -71.08617653, 42.361166, -71.070628, "Kendall");
  drawLine(map, 42.361166, -71.070628, 42.35639457, -71.0624242, "Charles");
  drawLine(map, 42.35639457, -71.0624242, 42.355518, -71.060225, "Park");
  drawLine(map, 42.355518, -71.060225, 42.352271, -71.05524200000001, "Downtown");
  drawLine(map, 42.352271, -71.05524200000001, 42.342622, -71.056967, "South");
  drawLine(map, 42.342622, -71.056967, 42.330154, -71.057655, "Broadway");
  drawLine(map, 42.330154, -71.057655, 42.320685, -71.052391, "Andrew");
  //split at JFK
  drawLine(map, 42.320685, -71.052391, 42.275275, -71.029583, "JFK/UMass");
  drawLine(map, 42.275275, -71.029583, 42.2665139, -71.0203369, "North Quincy");
  drawLine(map, 42.2665139, -71.0203369, 42.251809, -71.005409, "Wollaston");
  drawLine(map, 42.251809, -71.005409, 42.233391, -71.007153, "Quincy Center");
  drawLine(map, 42.233391, -71.007153, 42.2078543, -71.0011385, "Quincy Adams");
  addSubMarker(map, 42.2078543, -71.0011385, "Braintree");
  //back to JFK split
  drawLine(map, 42.320685, -71.052391, 42.31129, -71.053331);
  drawLine(map, 42.31129, -71.053331, 42.300093, -71.061667, "Savin Hill");
  drawLine(map, 42.300093, -71.061667, 42.29312583, -71.06573796000001, "Fields Corner");
  drawLine(map, 42.29312583, -71.06573796000001, 42.284652, -71.06448899999999, "Shawmut");
  addSubMarker(map, 42.284652, -71.06448899999999, "Ashmont");
}
function drawLine(map, lat1, lng1, lat2, lng2, name){
  addSubMarker(map, lat1, lng1, name);
  polyline = new google.maps.Polyline({
    path:[
      new google.maps.LatLng(lat1, lng1),
      new google.maps.LatLng(lat2, lng2)
    ],
    strokeColor: "#FF0000",
    strokeOpacity: 0.5,
    strokeWeight: 3,
    map: map
  });
}
function addSubMarker(map, lat, lng, name){
  if(name){
    newmarker = {lat, lng};
    marker = new google.maps.Marker({
      position: newmarker,
      map: map,
      title: name,
      icon: {
        size: new google.maps.Size(20, 20),
        scaledSize: new google.maps.Size(20, 20),
        url: "t.png"
      }
    });
    allsubMarkers.push({marker, name}); 
  }
}
function addStartMarker(map, lat, lng){
  newmarker = {lat, lng};
  marker = new google.maps.Marker({
    position: newmarker,
    map: map
  });
  calculatedistance();
  var infowindow = new google.maps.InfoWindow({
    content: "The closest station is " + closestStn + 
    " which is " + shortestdist + " miles away"
  });
  marker.addListener('click', function(){
    infowindow.open(map, marker);
    polyline = new google.maps.Polyline({
      path:[
        new google.maps.LatLng(me.lat, me.lng),
        allsubMarkers[closestStnIdx].marker.position
      ],
      strokeColor: "#0000FF",
      strokeOpacity: 0.5,
      strokeWeight: 3,
      map: map
  });
  })
}
function calculatedistance(){
  shortestdist = Infinity;
  for(i = 0; i < allsubMarkers.length; i++){
    dist = google.maps.geometry.spherical.computeDistanceBetween(
      allsubMarkers[i].marker.position,
      new google.maps.LatLng(me.lat, me.lng));
    console.log(allsubMarkers[i].name);
    if(dist < shortestdist){
      closestStnIdx = i;
      closestStn = allsubMarkers[i].name;
      shortestdist = dist;
    }
  }
  shortestdist = getMiles(shortestdist);
  console.log(shortestdist);
  console.log(closestStn);
}
function getMiles(i){
  return (i*0.000621371192).toFixed(2);
}







