
var music1 = new Audio("Tian Guan Ci Fu OST&BGM 17 桃源.mp3");
var music2 = new Audio("入云间 - 《天官赐福》动画配乐.mp3");
var music3 = new Audio("心魔 - 《天官赐福》动画配乐.mp3");
var music4 = new Audio("飞升 - 《天官赐福》动画配乐.mp3");
var music5 = new Audio("与君山 - 《天官赐福》动画配乐.mp3")





function Music1play(){

    music1.play();
    music1.volume = 0.6;
    music1.loop = true;

}

function toMusic2(){

    music1.pause();
    music2.play();
    music2.volume = 0.6;
    music2.loop = true;

}

function toMusic3(){

    music4.pause();
    music3.pause();
    music2.pause();
    music5.pause();
    music1.pause();
    music3.play();
    music3.volume = 0.6;
    music3.loop = true;

}

function toMusic4(){

    music5.pause();
    music2.pause();
    music3.pause();
    music4.play();
    music4.volume = 0.6;
    music4.loop = true;

}

function toMusic5(){

    music3.pause();
    music2.pause();
    music1.pause();
    music4.pause();
    music5.play();
    music5.volume = 0.6;
    music5.loop = true;

}

function stop(){
    music1.pause();
    music2.pause();
    music3.pause();
    music4.pause();
    music5.pause();
}