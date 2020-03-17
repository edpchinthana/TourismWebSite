var elements = document.getElementsByClassName("images column");
var imageContainer = document.getElementById("showImage");
var heading = document.getElementById("heading");
    elements[0].onclick = function() {
        showImage(0);
    }

    elements[1].onclick = function() {
        showImage(1);
    }
    elements[2].onclick = function() {
        showImage(2);
    }
    elements[3].onclick = function() {
        showImage(3);
    }
    function showImage(n){
        imageContainer.style.display="block";
        imageContainer.style.animation="fadeIn 0.8s forwards";
        heading.style.animation="headingFadeIn 0.8s forwards";
        var src = elements[n].getAttribute("src");
        document.getElementById("photo").setAttribute("src",src);
    }
    
    imageContainer.onclick= function(){
        imageContainer.style.animation="fadeOut 1s forwards";
        heading.style.animation="headingFadeOut 1s forwards";
        imageContainer.style.display="none"; 
        //clearTimeout(function(){ imageContainer.style.display="none"; }, 800);
        
    }