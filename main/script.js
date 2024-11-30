const passnext = document.querySelectorAll('.next-btn');

passnext.forEach(button => {
    button.addEventListener('click', function(){
        const active = document.querySelector('.active');
        const nextpass = 'pass-' + this.getAttribute('data-pass');

        active.classList.remove('active');
        document.getElementById(nextpass).classList.add('active');

    })
})


function background1(){
    document.body.style.backgroundImage = "url('https://static.wikia.nocookie.net/modao-zushi/images/5/59/Lotus_Pier.png/revision/latest?cb=20191123060530')";
}

function background2(){
    document.body.style.backgroundImage = "url('https://i.pinimg.com/736x/39/25/0c/39250c63d80f67c24606bb5f80ffd3c8.jpg')";
}

function background3(){
    document.body.style.backgroundImage = "url('https://static.wikia.nocookie.net/modao-zushi/images/1/1e/Burial_Mounds_-_2.png/revision/latest?cb=20200512073257')";
}

function background4(){
    document.body.style.backgroundImage = "url('https://static.wikia.nocookie.net/heaven-officials-blessing/images/2/20/Puji_shrine_donghua.png/revision/latest?cb=20201121072112')";
}


function background5(){
    document.body.style.backgroundImage = "url('https://images6.alphacoders.com/136/thumb-350-1367773.webp')";
}