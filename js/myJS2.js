//selecting province
function selectProvince(n){
    for(let x=1;x<11;x++){
        var path = document.getElementById("pathId"+x);
        path.setAttribute('style','fill:#4D419B');
    }
    var path = document.getElementById("pathId"+n);
    path.setAttribute('style','fill:#FDB833');
    displayDetails(n);

}
let prevContainer=0;
//Display province details
function displayDetails(n){
    if(prevContainer===0){
        
    }else{
        document.getElementById("container"+prevContainer).setAttribute('style','display:none');
    }
    document.getElementById("container"+n).setAttribute('style','display:block');
    prevContainer=n;
}




//printing the heading
const text = "EXPLORE";
count = 0;
index1=0;
count1=0;
(function type(){
        currentText = text;
        letter = currentText.slice(0,++index1);
        document.querySelector('.heading').textContent=letter;
        count1++;
        if(count1<10){
            setTimeout(type,200);
        }
}());