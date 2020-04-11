

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
            setTimeout(type,40);
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