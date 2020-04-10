var data=null;
function request(){
    let request = new XMLHttpRequest();
    request.open("GET","http://api.openweathermap.org/data/2.5/forecast?q=Colombo&cnt=4&units=metric&appid=fd2e1f6714e2061128504bacd101384a",true);
    request.send();
    request.onload = () => {
        //console.log(request);
        if(request.status===200){
            data = JSON.parse(request.response);
            console.log(data);
            document.getElementById("city").innerHTML+=data.city.name;
            document.getElementById("country").innerHTML+=data.city.country;
            document.getElementById("today-temperature").innerHTML+=data.list[0].main.temp;
            document.getElementById("today-weather").innerHTML+=data.list[0].weather[0].main;
            document.getElementById("tomorrow-temperature").innerHTML+=data.list[1].main.temp;
            document.getElementById("tomorrow-weather").innerHTML+=data.list[1].weather[0].main;

        }else{
            console.log(`error ${request.status} ${request.statusText}`);
        }
    }
    
}
//request();
//api.openweathermap.org/data/2.5/forecast/daily?q=Colombo&cnt=5&appid=fd2e1f6714e2061128504bacd101384a