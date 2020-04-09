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
                link.style.animation = 'navLinkFade 0.5s ease forwards '+(index/7+0.3)+'s';
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

//load provinces pages
var data=null;
function request(){
    var xhttp = new XMLHttpRequest();
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
        prevButton.setAttribute('onclick','showPrevImage();');
        imageContainer.appendChild(prevButton);

        let nextButton = document.createElement("button");
        nextButton.id = "places-imageNextButton";
        nextButton.innerHTML = "&#10095;";
        nextButton.setAttribute('onclick','showNextImage();');
        imageContainer.appendChild(nextButton);

        imageMapContainer.appendChild(imageContainer);

        let weatherContainer = document.createElement("div");

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
    
        document.getElementById("place"+SelectedPlace+"-locationContainer").classList.remove("places-ImageMapContainer-active");
        document.getElementById("place"+SelectedPlace+"-locationButton").classList.remove("placesButtons-active");

    
    if(k==0){
        document.getElementById("place"+SelectedPlace+"-imageContainer").classList.add("places-ImageMapContainer-active");
        document.getElementById("place"+SelectedPlace+"-galleryButton").classList.add("placesButtons-active");
    }else if(k==1){
        document.getElementById("place"+SelectedPlace+"-weatherButton").classList.add("placesButtons-active");
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
                document.getElementById("place"+SelectedPlace+"-image"+0).classList.add("places-image-visible");
            }else{
                document.getElementById("place"+SelectedPlace+"-image"+(x+1)).classList.add("places-image-visible");
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
                document.getElementById("place"+SelectedPlace+"-image"+(data.provinces[SelectedProvince].places[SelectedPlace].numberOfPhotos-1)).classList.add("places-image-visible");
            }else{
                document.getElementById("place"+SelectedPlace+"-image"+(x-1)).classList.add("places-image-visible");
            }
            break;
        }
    }
}

document.getElementById("placesComboBox").onchange = changePlace;

