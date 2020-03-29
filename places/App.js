function request(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       let data = JSON.parse(xhttp.responseText);

        console.log(data.NorthernProvince.places[0].Name);
        document.getElementById("container").innerHTML=data.NorthernProvince.places[0].map;
        document.getElementById("image").src=data.NorthernProvince.places[0].photos[0];
    }
    };
    xhttp.open("GET", "data.json", true);
    xhttp.send();
}