// Your JavaScript goes here...
function loadJson() {
	request = new XMLHttpRequest();
	request.open("GET", data.json, true);
	request.onreadstatefunction = function(){
		if(request.readyState == 4 && request.status == 200){
			data = JSON.parse(request.responseText);
			message = "";
			for(i = 0; i < data.length; i++)
				message += "<p>" + data[i].content + " " + parsed[i].username + "</p>";
		}
	}
	request.send();
}