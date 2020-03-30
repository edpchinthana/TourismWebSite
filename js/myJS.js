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
            page="about/wild.html";
            break;
        case 2:
            page = "about/thrills.html";
            break;
        case 3:
            page = "about/bliss.html";
            break;
        case 4:
            page = "about/essence.html";
            break;
        case 5:
            page = "about/festive.html";
            break;
        case 6:
            page = "about/scenic.html";
            break;
        case 7:
            page = "about/heritage.html";
            break;
        case 8:
            page = "about/pristine.html";
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
    xhttp.open("GET", "places/data.json", true);
    xhttp.send();
}
request();

//Initial values
var SelectedProvince = 0;
var SelectedPlace = 0;
var SelectedPhoto = 0;

//Show province details
function showProvinces(k){
    document.getElementById("ProvincesContainerParent").classList.add("showProvinces-visible");
    let i, L = document.getElementById("places").options.length - 1;
   for(i = L; i >= 0; i--) {
    document.getElementById("places").remove(i);
   }
    for(let x=0;x<data.provinces[k].places.length;x++){
        let option = document.createElement("option");
        option.text = data.provinces[k].places[x].name;
        option.value = x;
        document.getElementById("places").add(option);
    }
    SelectedProvince = k;
    SelectedPlace = 0;
    importingDetails();
    console.log(k);
}

//Close province details
function closePlaces(){
    document.getElementById("ProvincesContainerParent").classList.remove("showProvinces-visible");
    //SelectedPlace=0;
    //SelectedProvince=0;
    //SelectedPhoto=0;
}


function importingDetails(){
    let k = document.getElementById("places").value;
    SelectedPlace = k;
    SelectedPhoto = 0;
    let name = data.provinces[SelectedProvince].places[k].name;
    let description = data.provinces[SelectedProvince].places[k].description;
    let map = data.provinces[SelectedProvince].places[k].map;
   document.getElementById("placeDescription").innerHTML=description;
    document.getElementById("placesImage").src=data.provinces[SelectedProvince].places[SelectedPlace].photos+"/photo"+(SelectedPhoto+1)+".jpg";

   document.getElementById("placesMap").innerHTML=map;
}

document.getElementById("places").onchange = importingDetails;

//map button
document.getElementById("mapButton").addEventListener("click", function(){
    document.getElementById("mapButton").classList.add("button-active");
    document.getElementById("galleryButton").classList.remove("button-active");

    document.getElementById("placesImagesContainer").classList.add("placesImagesContainer-hidden");
    document.getElementById("placesMap").classList.remove("placesImagesContainer-hidden");
  });

//gallery button
document.getElementById("galleryButton").addEventListener("click", function(){
    document.getElementById("galleryButton").classList.add("button-active");
    document.getElementById("mapButton").classList.remove("button-active");

    document.getElementById("placesImagesContainer").classList.remove("placesImagesContainer-hidden");
    document.getElementById("placesMap").classList.add("placesImagesContainer-hidden");
  });

  //Prev button
function prevPhoto(){
    if(SelectedPhoto===0){
        SelectedPhoto = data.provinces[SelectedProvince].places[SelectedPlace].numberOfPhotos-1;
    }else{
        SelectedPhoto = SelectedPhoto - 1;
    }
    document.getElementById("placesImage").src=data.provinces[SelectedProvince].places[SelectedPlace].photos+"/photo"+(SelectedPhoto+1)+".jpg";
  }
  //Next button
  function nextPhoto(){
    if(SelectedPhoto===data.provinces[SelectedProvince].places[SelectedPlace].numberOfPhotos-1){
        SelectedPhoto=0;
    }else{
        SelectedPhoto = SelectedPhoto + 1;
    }
    document.getElementById("placesImage").src=data.provinces[SelectedProvince].places[SelectedPlace].photos+"/photo"+(SelectedPhoto+1)+".jpg";
}
