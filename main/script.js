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
    document.body.style.background = "url('https://static.wikia.nocookie.net/modao-zushi/images/5/59/Lotus_Pier.png/revision/latest?cb=20191123060530'), background-size: cover, background-repeat: no-repeat, background-position: fill;";
}

function background2(){
    document.body.style.background = "url('https://i.pinimg.com/736x/39/25/0c/39250c63d80f67c24606bb5f80ffd3c8.jpg')";
}

function background3(){
    document.body.style.background = "url('https://static.wikia.nocookie.net/modao-zushi/images/1/1e/Burial_Mounds_-_2.png/revision/latest?cb=20200512073257')";
}