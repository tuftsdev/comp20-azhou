// Your JavaScript goes here...
function loadJson() {
	request = new XMLHttpRequest();
	request.open("GET", "data.json", true);
	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			elements = JSON.parse(request.responseText);
			message = document.getElementById("messages");
			for(i = 0; i < elements.length; i++)
      			message.innerHTML += "<p>" + elements[i].content + " " + elements[i].username + "</p>";
		}
	}
	request.send();
}