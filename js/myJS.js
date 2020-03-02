function scrollAppear(){
    var introText = document.querySelector('.intro-text');
    var introPosition = introText.getBoundingClientRect().top;
    var screenPosition = window.innerHeight/1.3;
    console.log(screenPosition);
    console.log(introPosition);
    if(introPosition<screenPosition){
        introText.classList.add('intro-appear');
    }
}

window.addEventListener('scroll',scrollAppear);

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
    if(n>4){
        n=1;
    }else if(n<1){
        n=4;
    }
    index=n;
    document.getElementById("slide"+n).setAttribute("style","display:block;");
}

function hideAll(){
    var i;
    for(i=1;i<5;i++){
        document.getElementById("slide"+i).setAttribute("style","display:none;");
    }
}

setInterval(function(){ previewSlides(index+1); }, 5000);

//printing the heading
const text = "SRI LANKA";
let count = 0;
let count1=0;
let index1=0;
(function type(){
        currentText = text;
        console.log("Hello");
        if(index1==2){
            letter=letter+" L";
            index1 = index1+2;
        }else{
            letter = currentText.slice(0,++index1);
        }
        document.querySelector('.bannerHeading').textContent=letter;
        count1++;
        if(count1<10){
            setTimeout(type,150);
        }
}());