//selecting province
function selectProvince(n){
    for(let x=1;x<11;x++){
        var path = document.getElementById("pathId"+x);
        path.setAttribute('style','fill:rgb(78, 151, 235)');
    }
    var path = document.getElementById("pathId"+n);
    path.setAttribute('style','fill:rgb(20, 16, 250)');
    displayDetails(n);

}
let prevContainer=0;
//Display province details
function displayDetails(n){
        document.getElementById("container"+prevContainer).setAttribute('style','display:none');
    
    document.getElementById("container"+n).setAttribute('style','display:block');
    prevContainer=n;
}




//printing the heading
function typeExplore(){
    const text = "Explore";
    count = 0;
    index1=0;
    count1=0;
    (function type(){
        currentText = text;
        letter = currentText.slice(0,++index1);
        document.querySelector('.heading').textContent=letter;
        count1++;
        if(count1<10){
            setTimeout(type,150);
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