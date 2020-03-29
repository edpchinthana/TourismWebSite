

//selecting province
function selectProvince(n){
    var path = document.getElementById("pathId"+n);
    displayDetails(n);
}
let prevContainer=0;
//Display province details
function displayDetails(n){
    if(prevContainer===0){

    }else{
            var element = document.getElementById('explore');
            var location = element.offsetTop-50;
            window.scrollTo(0,location)
        document.getElementById("container"+prevContainer).style.display="none";
    }
    document.getElementById("containerDiv").style.transform="translateX(0px)";
        document.getElementById("containerDiv").style.opacity="1";
        document.getElementById("container"+n).style.display="block";
        document.getElementById("container"+n).style.transform="translateX(0px)"
        document.getElementById("container"+n).style.animation="showDetails 1s ease-in-out";
    prevContainer=n;
}

function hideContent(){
    document.getElementById("containerDiv").style.transform="translateX(100%)";
    document.getElementById("containerDiv").style.opacity="0";
}



//printing the heading

function typeExplore(k){
    const text = k;
    count = 0;
    index1=0;
    count1=0;
    (function type(){
        currentText = text;
        letter = currentText.slice(0,++index1);
        document.querySelector('.heading').textContent=letter;
        count1++;
        if(count1<text.length){
            setTimeout(type,80);
        }
    }());
}

function typeAboutSriLanka(){
    const text = "About Sri Lanka";
    count = 0;
    index1=0;
    count1=0;
    (function type2(){
        currentText = text;
        letter = currentText.slice(0,++index1);
        document.querySelector('.about-heading').textContent=letter;
        count1++;
        if(count1<15){
            setTimeout(type2,100);
        }
    }());
}