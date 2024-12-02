
var music1 = new Audio("Tian Guan Ci Fu OST&BGM 17 桃源.mp3");
var music2 = new Audio("入云间 - 《天官赐福》动画配乐.mp3");
var music3 = new Audio("心魔 - 《天官赐福》动画配乐.mp3");
var music4 = new Audio("飞升 - 《天官赐福》动画配乐.mp3");
var music5 = new Audio("与君山 - 《天官赐福》动画配乐.mp3")

var volume = 0.6



function Music1play(){

    stop()
    music1.play();
    music1.volume = volume;
    music1.loop = true;

}

function toMusic2(){

    stop()
    music2.play();
    music2.volume = volume;
    music2.loop = true;

}

function toMusic3(){

    stop()
    music3.play();
    music3.volume = volume;
    music3.loop = true;

}

function toMusic4(){

    stop()
    music4.play();
    music4.volume = volume;
    music4.loop = true;

}

function toMusic5(){

    stop()
    music5.play();
    music5.volume = volume;
    music5.loop = true;

}

function stop(){
    music1.pause();
    music2.pause();
    music3.pause();
    music4.pause();
    music5.pause();
}