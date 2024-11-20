const passnext = document.querySelectorAll('.next-btn');

passnext.forEach(button => {
    button.addEventListener('click', function(){
        const active = document.querySelector('.active');
        const nextpass = 'pass-' + this.getAttribute('data-pass');

        active.classList.remove('active');
        document.getElementById(nextpass).classList.add('active');

    })
})

