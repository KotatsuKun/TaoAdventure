
var music1 = new Audio("Tian Guan Ci Fu OST&BGM 17 桃源.mp3");
var music2 = new Audio("The Legend of Ashitaka.mp3");

function Music1play(){

    music1.play();
    music1.volume = 0.6;
    music1.loop = true;

}

function toMusic2(){

    music1.pause()
    music2.play();
    music2.volume = 0.6;
    music2.loop = true;

}

