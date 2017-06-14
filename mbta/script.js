function getMyLoc(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
//      me = {lat: 42.305093, lng: -71.061667};
      me = {lat: position.coords.latitude, lng: position.coords.longitude};
      initMap();
      loadJsonData();
    });
  }
  else
    alert("Geolocation not supported by your web browser.");
}
function loadJsonData(){
  request = new XMLHttpRequest();
  request.open("GET", "https://defense-in-derpth.herokuapp.com/redline.json", true);
  request.onreadystatechange = function(){
    if(request.readyState == 4 && request.status == 200){
      mbtadata = JSON.parse(request.responseText);
      addDataToMarkers();
    }
  }
  request.send();
}
function addDataToMarkers(){
  for(var i = 0; i < mbtadata.TripList.Trips.length; i++){
    for(var j = 0; j < mbtadata.TripList.Trips[i].Predictions.length; j++){
      var stninfo = markerDictionary[mbtadata.TripList.Trips[i].Predictions[j].Stop];
      var currentcontent = stninfo.infowindow.content;
      var addedcontent = "<tr><td>" + mbtadata.TripList.Trips[i].Destination + "</td><td>";
      var time = secondsToMinutes(mbtadata.TripList.Trips[i].Predictions[j].Seconds);
      if(time < 1)
        addedcontent += "Now Arriving";
      else
        addedcontent += time + " minutes";
      addedcontent += "</td></tr>"; 
      addedcontent = insertString(currentcontent, addedcontent, "</table>");
      stninfo.infowindow.setContent(addedcontent);
    }
    addTrainMarkers(map, i);
  }
}
function addTrainMarkers(map, i){
  if(mbtadata.TripList.Trips[i].Position){
    newtrain = {lat: mbtadata.TripList.Trips[i].Position.Lat, lng: mbtadata.TripList.Trips[i].Position.Long};
    var marker = new google.maps.Marker({
      position: newtrain,
      map: map,
      title: "train",
      icon: {
        size: new google.maps.Size(20, 20),
        scaledSize: new google.maps.Size(20, 20),
        url: "train.png"
      }
    });
  }
}
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: me
  });
  numMarkers = 0;
  markerDictionary = {};
  drawRedLine(map);
  addStartMarker(map, me.lat, me.lng);
}
function drawRedLine(map){
  drawLine(map, 42.395428, -71.142483, 42.39674, -71.121815, "Alewife");
  drawLine(map, 42.39674, -71.121815, 42.3884, -71.11914899999999, "Davis");
  drawLine(map, 42.3884, -71.11914899999999, 42.373362, -71.118956, "Porter Square");
  drawLine(map, 42.373362, -71.118956, 42.365486, -71.103802, "Harvard Square");
  drawLine(map, 42.365486, -71.103802, 42.36249079, -71.08617653, "Central Square");
  drawLine(map, 42.36249079, -71.08617653, 42.361166, -71.070628, "Kendall/MIT");
  drawLine(map, 42.361166, -71.070628, 42.35639457, -71.0624242, "Charles/MGH");
  drawLine(map, 42.35639457, -71.0624242, 42.355518, -71.060225, "Park Street");
  drawLine(map, 42.355518, -71.060225, 42.352271, -71.05524200000001, "Downtown Crossing");
  drawLine(map, 42.352271, -71.05524200000001, 42.342622, -71.056967, "South Station");
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
    var marker = new google.maps.Marker({
      position: newmarker,
      map: map,
      title: name,
      icon: {
        size: new google.maps.Size(20, 20),
        scaledSize: new google.maps.Size(20, 20),
        url: "t.png"
      }
    });
    var tablehtml = "<h3>" + name + "</h3><p></p><table><tr><th>Destination</th><th>Arrival Time</th></tr></table>";
    var infowindow = new google.maps.InfoWindow({
      content: tablehtml
    });
    markerDictionary[name] = {marker, infowindow};
    marker.addListener('click', function(){
      infowindow.open(map, marker);
    });
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
        markerDictionary[closestStn].marker.position
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
  for(stn in markerDictionary){
    dist = google.maps.geometry.spherical.computeDistanceBetween(
      markerDictionary[stn].marker.position,
      new google.maps.LatLng(me.lat, me.lng));
    if(dist < shortestdist){
      closestStn = stn;
      shortestdist = dist;
    }
  }
  shortestdist = getMiles(shortestdist);
}
function getMiles(i){
  return (i*0.000621371192).toFixed(2);
}
function secondsToMinutes(i){
  return Math.floor(i / 60);
}
function insertString(a, b, at){
  var position = a.indexOf(at);
  return a.substr(0, position) + b + a.substr(position);
}



