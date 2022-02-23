var hora = document.getElementById("hora");
var body = document.getElementsByTagName("body")[0];

if (window.navigator.language === "es-ES") {
    var days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
}
else {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
}

function zfill(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
}

function Background(hour, minutes, seconds) {
    var colorConfig = [[0,0,255],[255,0,255],[255,0,0],[255,255,0],[255,0,0],[255,0,255]];
    var valueToChange = [0,2,1,1,2,0];

    var step = Math.floor(hour/4)

    var rgb = colorConfig[step];

    var percent = ((hour-step*4)*60+minutes)/(60*4);

    if (rgb[valueToChange[step]] === 255) {
        rgb[valueToChange[step]] = 255 - Math.floor(percent*255);
    }
    else {
        rgb[valueToChange[step]] = Math.floor(percent*255);
    }

    return rgb;
}

function updateTime() {
    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var time_str = days[now.getDay()] + " " + zfill(hour,2) + ":" + zfill(minutes,2) + ":" + zfill(seconds,2);

    hora.innerHTML = time_str;
    var colorConfig = Background(hour, minutes, seconds);
    hora.style.color = "rgb(" + (colorConfig[0]) + "," + (255-colorConfig[1]) + "," + (colorConfig[2]) + ")";
    body.style.backgroundColor = `rgb(${colorConfig[0]},${colorConfig[1]},${colorConfig[2]})` //rgb(255,0,0) rgb(255,0,255) rgb(0,0,255) rgb(255,0,255) rgb(255,0,0)
}
updateTime();

setInterval(updateTime, 500);

