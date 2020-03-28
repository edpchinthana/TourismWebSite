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
        
        console.log(scroll);
        if(scroll===0){
            var navBar= document.getElementById('navBar');
            navBar.style.background='rgba(0, 0, 0, 0.144)';
        }else{
            var navBar= document.getElementById('navBar');
            navBar.style.background='black';
        }
        lastScroll=scroll;
    });

function scrollWindow(k){
    //window.scrollTo(0,k);
    var element = document.getElementById(k);
    var location = element.offsetTop-50;
    window.scrollTo(0,location)
}

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