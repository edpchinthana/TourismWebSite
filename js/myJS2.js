function selectProvince(n,a){
    //console.log(n+" is clicked");
    for(let x=1;x<11;x++){
        var path = document.getElementById("pathId"+x);
        path.setAttribute('style','fill:rgb(66, 112, 236)');
    }

    var path = document.getElementById("pathId"+a);
    path.setAttribute('style','fill:green');

}