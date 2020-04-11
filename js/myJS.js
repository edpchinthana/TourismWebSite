//preloader
window.addEventListener('load',() => { 
    const preload = document.querySelector('.preloader');
    preload.classList.add('preload-finish');
});
//SlideShow
var index = 1;
hideAll();
previewSlides(index);



function nextSlide(n){
    previewSlides(index+=n);
}

function prevSlide(n){
    n=index-1;
    previewSlides(n);
}
function currentSlide(n) {
    previewSlides(n);
  }

function previewSlides(n){
    hideAll();
    if(n>6){
        n=1;
    }else if(n<1){
        n=6;
    }
    index=n;
    document.getElementById("slide"+n).setAttribute("style","display:block;");
}

function hideAll(){
    var i;
    for(i=1;i<7;i++){
        document.getElementById("slide"+i).setAttribute("style","display:none;");
    }
}

setInterval(function(){ previewSlides(index+1); }, 5000);

const navSlide=()=>{
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.navBar-links');
    const navLinks = document.querySelectorAll('.navBar li');
    burger.addEventListener('click',()=>{
        nav.classList.toggle('navBar-active');
        
        navLinks.forEach((link, index)=>{
            if(link.style.animation){
                link.style.animation = '';
            }else{
                console.log(index);
                link.style.animation = 'navLinkFade 1s ease '+(index/7)+'s';
            }
        });
        burger.classList.toggle('toggle');
    }); 
}
var lastScroll=0;
    navSlide();
    window.addEventListener("scroll", function (event) {
        var scroll = this.scrollY;
        if(scroll===0){
            var navBar= document.getElementById('navBar');
            navBar.style.background='rgba(0, 0, 0, 0.144)';
        }else{
            var navBar= document.getElementById('navBar');
            navBar.style.background='black';
        }
        lastScroll=scroll;
    });

    //windows scroll effect
function scrollWindow(k){
    var element = document.getElementById(k);
    var location = element.offsetTop-50;
    window.scrollTo(0,location)
}

//load about pages
function loadPages(n) {
    let page;
    switch(n){
        case 1:
            page="wild.html";
            break;
        case 2:
            page = "thrills.html";
            break;
        case 3:
            page = "bliss.html";
            break;
        case 4:
            page = "essence.html";
            break;
        case 5:
            page = "festive.html";
            break;
        case 6:
            page = "scenic.html";
            break;
        case 7:
            page = "heritage.html";
            break;
        case 8:
            page = "pristine.html";
            break;
    }
    document.getElementById("aboutDetailsContainter").classList.add("visible-aboutDetailsContainer");
    document.getElementById("aboutDetailsContainterParent").classList.add("visible-aboutDetailsContainer");
    document.getElementById("aboutDetailsContainter").innerHTML='<object type="text/html" data="'+page+'" ></object>';
}

function hideAboutDetails(){
    document.getElementById("aboutDetailsContainter").classList.remove("visible-aboutDetailsContainer");
    document.getElementById("aboutDetailsContainterParent").classList.remove("visible-aboutDetailsContainer");
}
//Selecting weather icon
function weatherIcon(test){
    let img;
    switch(String(test)){
        case "Thunderstorm":
            img="11d.png";
            break;
        case "Drizzle":
            img="09d.png";
            break;
        case "Rain":
            img = "10d.png";
            break;
        case "Snow":
            img = "13d.png";
            break;
        case "Atmosphere":
            img = "50d.png";
            break;
        case "Clear":
            img = "01d.png";
            break;
        case "Clouds":
            img = "02d.png";
            break;
    }
    return img;
}

//API - Importing weather
function requestWeather(x){
    let request = new XMLHttpRequest();
    //request.open("GET","http://api.openweathermap.org/data/2.5/forecast?q="+data.provinces[SelectedProvince].places[x].weather+"&cnt=5&units=metric&appid=fd2e1f6714e2061128504bacd101384a",true);
    request.open("GET","testWeatherData.json",true);
    request.send();
    request.onload = () => {
        if(request.status===200){
            let weatherData = JSON.parse(request.response);
            console.log(weatherData);
            //Setting Date
            let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
            let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            let today  = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let day = today.getDay();
            document.getElementById("place"+x+"-todayDate").innerHTML+=days[day-1]+",&nbsp&nbsp"+today.getDate()+"&nbsp&nbsp"+months[today.getMonth()]+"&nbsp&nbsp"+today.getFullYear();

            //Setting today weather icon
            console.log(weatherData.list[0].weather[0].main);
            let img = weatherIcon(weatherData.list[0].weather[0].main);
            
            document.getElementById("place"+x+"-todayIcon").src = "res/weatherIcons/"+img;

            //Setting today's temperature
            document.getElementById("place"+x+"-todayTemp").innerHTML=weatherData.list[0].main.temp+" &#8451;";
            document.getElementById("place"+x+"-todayTemp").innerHTML+="<p>Max : "+weatherData.list[0].main.temp_max+"&#8451;</p>";
            document.getElementById("place"+x+"-todayTemp").innerHTML+="<p>Min : "+weatherData.list[0].main.temp_min+"&#8451;<br></p>";
            //Setting today's details
            
            document.getElementById("place"+x+"-todayDetails").innerHTML+=weatherData.list[0].weather[0].main+" - "+weatherData.list[0].weather[0].description;
            document.getElementById("place"+x+"-todayDetails").innerHTML+="<br>Humidity &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:&nbsp"+weatherData.list[0].main.humidity;
            document.getElementById("place"+x+"-todayDetails").innerHTML+="<br>Pressure &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:&nbsp"+weatherData.list[0].main.pressure;
            document.getElementById("place"+x+"-todayDetails").innerHTML+="<br>Sea Level &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:&nbsp"+weatherData.list[0].main.sea_level; 
            document.getElementById("place"+x+"-todayDetails").innerHTML+="<br>Ground Level&nbsp:&nbsp"+weatherData.list[0].main.grnd_level;   
            //Setting forecast data
            let firstDay = day;
            let secondDay = day+1;
            let thirdDay = day+2;
            let fourthDay = day+3;
            if(day+3==7){
                fourthDay=0;
            }else if(day+2==7){
                fourthDay = 1;
                thirdDay = 0;
            }else if(day+1==7){
                fourthDay = 2;
                thirdDay = 1;
                secondDay = 0;
            }else if(day==7){
                fourthDay = 3;
                thirdDay = 2;
                secondDay = 1;
                firstDay = 0;
            }
            document.getElementById("place"+x+"-firstDayName").innerHTML=days[firstDay]+"<br><p2>"+weatherData.list[1].main.temp+"&#8451;<p2>";
            document.getElementById("place"+x+"-firstDayIcon").src = "res/weatherIcons/"+ weatherIcon(weatherData.list[1].weather[0].main);
        
            document.getElementById("place"+x+"-secondDayName").innerHTML=days[secondDay]+"<br><p2>"+weatherData.list[2].main.temp+"&#8451;<p2>";
            document.getElementById("place"+x+"-secondDayIcon").src = "res/weatherIcons/"+ weatherIcon(weatherData.list[2].weather[0].main);

            document.getElementById("place"+x+"-thirdDayName").innerHTML=days[thirdDay]+"<br><p2>"+weatherData.list[3].main.temp+"&#8451;<p2>";
            document.getElementById("place"+x+"-thirdDayIcon").src = "res/weatherIcons/"+ weatherIcon(weatherData.list[3].weather[0].main);

            document.getElementById("place"+x+"-fourthDayName").innerHTML=days[fourthDay]+"<br><p2>"+weatherData.list[4].main.temp+"&#8451;<p2>";
            document.getElementById("place"+x+"-fourthDayIcon").src = "res/weatherIcons/"+ weatherIcon(weatherData.list[4].weather[0].main);
        }else{
            console.log(`error ${request.status} ${request.statusText}`);
        }
    }
    
}

//load provinces pages
var data=null;
function request(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

       data = JSON.parse(xhttp.responseText);
    }
    };
    xhttp.open("GET", "data.json", true);
    xhttp.send();
}
request();

//Initial values
var SelectedProvince = 0;
var SelectedPlace = 0;
var SelectedImage = 0;


//Show province details
function showProvinces(k){

    document.getElementById("showProvincesContainer").classList.add("showProvinces-Container-Visible");
    document.getElementById("places-Container").innerHTML="";
    let i, L = document.getElementById("placesComboBox").options.length - 1;
   for(i = L; i >= 0; i--) {
    document.getElementById("placesComboBox").remove(i);
   }
    for(let x=0;x<data.provinces[k].places.length;x++){
        //adding options to combobox
        let option = document.createElement("option");
        option.text = data.provinces[k].places[x].name;
        option.value = x;
        document.getElementById("placesComboBox").add(option);

        //adding places details to containers
        let parentDiv = document.createElement("div");
        parentDiv.id = "place"+x+"-Container";
        parentDiv.classList.add("places-Container");

        let imageMapContainer = document.createElement("div");
        imageMapContainer.id = "place"+x+"-imageMapContainer";
        imageMapContainer.classList.add("places-ImageMapContainer");
        parentDiv.appendChild(imageMapContainer);

        let galleryButton = document.createElement("button");
        galleryButton.id = "place"+x+"-galleryButton";
        galleryButton.innerHTML="Gallery";
        galleryButton.setAttribute('onclick','changeMenu(0)');
        galleryButton.classList.add("places-Buttons");
        galleryButton.classList.add("galleryButton");
        galleryButton.classList.add("placesButtons-active");
        imageMapContainer.appendChild(galleryButton);

        let weatherButton = document.createElement("button");
        weatherButton.id = "place"+x+"-weatherButton";
        weatherButton.innerHTML = "Weather";
        weatherButton.setAttribute('onclick','changeMenu(1)');
        weatherButton.classList.add("places-Buttons");
        weatherButton.classList.add("weatherButton");
        imageMapContainer.appendChild(weatherButton);

        let locationButton = document.createElement("button");
        locationButton.id = "place"+x+"-locationButton";
        locationButton.innerHTML = "Location"
        locationButton.setAttribute('onclick','changeMenu(2)');
        locationButton.classList.add("places-Buttons");
        locationButton.classList.add("locationButton");
        imageMapContainer.appendChild(locationButton);

        let imageContainer = document.createElement("div");
        imageContainer.classList.add("places-imageContainer");
        imageContainer.classList.add("places-ImageMapContainer-active");
        imageContainer.id = "place"+x+"-imageContainer";
        
        for(let y=0;y<data.provinces[k].places[x].numberOfPhotos;y++){
            let image = document.createElement("img");
            image.id = "place"+x+"-image"+y;
            image.src = data.provinces[k].places[x].photos+"/photo"+(y+1)+".jpg";
            image.classList.add("places-image");
            if(y==0){
                image.classList.add("places-image-visible");
            }
            imageContainer.appendChild(image);
        }
        

        let prevButton = document.createElement("button");
        prevButton.id="places-imagePrevButton";
        prevButton.innerHTML = "&#10094;";
        prevButton.classList.add("places-image-buttons");
        prevButton.classList.add("places-image-prevButton");
        prevButton.setAttribute('onclick','showPrevImage();');
        imageContainer.appendChild(prevButton);

        let nextButton = document.createElement("button");
        nextButton.id = "places-imageNextButton";
        nextButton.innerHTML = "&#10095;";
        nextButton.classList.add("places-image-buttons");
        nextButton.classList.add("places-image-nextButton");
        nextButton.setAttribute('onclick','showNextImage();');
        imageContainer.appendChild(nextButton);

        imageMapContainer.appendChild(imageContainer);

        let weatherContainer = document.createElement("div");
        weatherContainer.classList.add("places-weather-container");
        weatherContainer.id = "place"+x+"-weatherContainer";
        //let weatherData = requestWeather(data.provinces[k].places[x].weather);
        let todayDiv = document.createElement("div");
        todayDiv.classList.add("today");
        todayDiv.id= "place"+x+"-today";

        let todayDate = document.createElement("p");
        todayDate.id = "place"+x+"-todayDate";
        todayDate.classList.add("today-details");
        todayDiv.appendChild(todayDate);

        let todayDay = document.createElement("p");
        todayDay.classList.add("today-details");
        todayDay.innerHTML+="";
        todayDiv.appendChild(todayDay);

        let todayIcon = document.createElement("img");
        todayIcon.id = "place"+x+"-todayIcon";
        todayDiv.appendChild(todayIcon);

        let todayTemp = document.createElement("div");
        todayTemp.id = "place"+x+"-todayTemp";
        todayTemp.classList.add("today-temp");
        todayDiv.appendChild(todayTemp);

        let todayDetails = document.createElement("div");
        todayDetails.id = "place"+x+"-todayDetails";
        todayDetails.classList.add("today-details");
        todayDiv.appendChild(todayDetails);

        weatherContainer.appendChild(todayDiv);

        let futureDiv = document.createElement("div");
        futureDiv.classList.add("future");
        futureDiv.id= "place"+x+"-future";
        
        let firstDay = document.createElement("div");
        firstDay.id = "place"+x+"-firstDayDiv";
        firstDay.classList.add("future-days");
        let firstDayName = document.createElement("p");
        firstDayName.id = "place"+x+"-firstDayName";
        firstDay.appendChild(firstDayName);
        let firstDayIcon = document.createElement("img");
        firstDayIcon.id = "place"+x+"-firstDayIcon";
        firstDay.appendChild(firstDayIcon);
        futureDiv.appendChild(firstDay);

        let secondDay = document.createElement("div");
        secondDay.id = "place"+x+"-secondDayDiv";
        secondDay.classList.add("future-days");
        let secondDayName = document.createElement("p");
        secondDayName.id = "place"+x+"-secondDayName";
        secondDay.appendChild(secondDayName);
        let secondDayIcon = document.createElement("img");
        secondDayIcon.id = "place"+x+"-secondDayIcon";
        secondDay.appendChild(secondDayIcon);
        futureDiv.appendChild(secondDay);

        let thirdDay = document.createElement("div");
        thirdDay.id = "place"+x+"-thirdDayDiv";
        thirdDay.classList.add("future-days");
        let thirdDayName = document.createElement("p");
        thirdDayName.id = "place"+x+"-thirdDayName";
        thirdDay.appendChild(thirdDayName);
        let thirdDayIcon = document.createElement("img");
        thirdDayIcon.id = "place"+x+"-thirdDayIcon";
        thirdDay.appendChild(thirdDayIcon);
        futureDiv.appendChild(thirdDay);

        let fourthDay = document.createElement("div");
        fourthDay.id = "place"+x+"-fourthDayDiv";
        fourthDay.classList.add("future-days");
        let fourthDayName = document.createElement("p");
        fourthDayName.id = "place"+x+"-fourthDayName";
        fourthDay.appendChild(fourthDayName);
        let fourthDayIcon = document.createElement("img");
        fourthDayIcon.id = "place"+x+"-fourthDayIcon";
        fourthDay.appendChild(fourthDayIcon);
        futureDiv.appendChild(fourthDay);

        weatherContainer.appendChild(futureDiv);


        imageMapContainer.appendChild(weatherContainer);
        

        let locationContainer = document.createElement("div");
        locationContainer.id = "place"+x+"-locationContainer";
        locationContainer.classList.add("places-map-container");
        locationContainer.innerHTML = data.provinces[k].places[x].map;
        imageMapContainer.appendChild(locationContainer);


        let description = data.provinces[k].places[x].description;
        parentDiv.innerHTML+=description;

        document.getElementById("places-Container").appendChild(parentDiv);

        if(x==0){
            parentDiv.classList.add("places-Container-active");
            document.getElementById("place0-imageContainer").classList.add("places-ImageMapContainer-active");
        }
        requestWeather(x);
    }
    SelectedProvince = k;
    SelectedPlace = 0;
    SelectedImage = 0;
    
}

//Close province details
function closePlaces(){
    document.getElementById("showProvincesContainer").classList.remove("showProvinces-Container-Visible");
    document.getElementById("places-Container").innerHTML="";
    typeExplore('Explore');
    SelectedPlace = 0;
    SelectedImage = 0;
}



function changePlace(){
    let k = document.getElementById("placesComboBox").value;
    document.getElementById("place"+SelectedPlace+"-Container").classList.remove("places-Container-active");
   
    setTimeout(() => {   document.getElementById("place"+k+"-Container").classList.add("places-Container-active"); }, 500);
    SelectedPlace = k;
}

function changeMenu(k){
    
        document.getElementById("place"+SelectedPlace+"-imageContainer").classList.remove("places-ImageMapContainer-active");
        document.getElementById("place"+SelectedPlace+"-galleryButton").classList.remove("placesButtons-active");
    
        document.getElementById("place"+SelectedPlace+"-weatherButton").classList.remove("placesButtons-active");
        document.getElementById("place"+SelectedPlace+"-weatherContainer").classList.remove("places-ImageMapContainer-active");

        document.getElementById("place"+SelectedPlace+"-locationContainer").classList.remove("places-ImageMapContainer-active");
        document.getElementById("place"+SelectedPlace+"-locationButton").classList.remove("placesButtons-active");

    
    if(k==0){
        document.getElementById("place"+SelectedPlace+"-imageContainer").classList.add("places-ImageMapContainer-active");
        document.getElementById("place"+SelectedPlace+"-galleryButton").classList.add("placesButtons-active");
    }else if(k==1){
        document.getElementById("place"+SelectedPlace+"-weatherButton").classList.add("placesButtons-active");
        document.getElementById("place"+SelectedPlace+"-weatherContainer").classList.add("places-ImageMapContainer-active");
    }else{
        document.getElementById("place"+SelectedPlace+"-locationContainer").classList.add("places-ImageMapContainer-active");
        document.getElementById("place"+SelectedPlace+"-locationButton").classList.add("placesButtons-active");
    }
   
}

function showNextImage(){
    let images = document.getElementById("place"+SelectedPlace+"-imageContainer").children;
    console.log(images);
    for(let x=0;x<data.provinces[SelectedProvince].places[SelectedPlace].numberOfPhotos;x++){
        if(images[x].classList.length==2){
            console.log(x);
            document.getElementById("place"+SelectedPlace+"-image"+x).classList.remove("places-image-visible");
            if(x==(data.provinces[SelectedProvince].places[SelectedPlace].numberOfPhotos)-1){
                setTimeout(() => {   document.getElementById("place"+SelectedPlace+"-image"+0).classList.add("places-image-visible"); }, 400);
            }else{
                setTimeout(() => {   document.getElementById("place"+SelectedPlace+"-image"+(x+1)).classList.add("places-image-visible"); }, 400);
            }
            break;
        }
    }
}

function showPrevImage(){
    let images = document.getElementById("place"+SelectedPlace+"-imageContainer").children;
    console.log(images);
    for(let x=0;x<data.provinces[SelectedProvince].places[SelectedPlace].numberOfPhotos;x++){
        if(images[x].classList.length==2){
            console.log(x);
            document.getElementById("place"+SelectedPlace+"-image"+x).classList.remove("places-image-visible");
            if(x==0){
                setTimeout(() => {   document.getElementById("place"+SelectedPlace+"-image"+(data.provinces[SelectedProvince].places[SelectedPlace].numberOfPhotos-1)).classList.add("places-image-visible"); }, 400);
            }else{
                setTimeout(() => {   document.getElementById("place"+SelectedPlace+"-image"+(x-1)).classList.add("places-image-visible"); }, 400);
            }
            break;
        }
    }
}

document.getElementById("placesComboBox").onchange = changePlace;

