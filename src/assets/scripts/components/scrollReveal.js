// Scroll reveeal init

let mq = window.matchMedia( "(max-width: 992px)" );
let sr = new ScrollReveal();


const scrollAnimations = {
    slideUp: {
        distance: '120%',
        origin: 'bottom',
        opacity: .1,
        duration: 700,
        interval: 50,
        delay:200
    },
    slideLeft: {
        distance: '120%',
        origin: 'left',
        duration: 750,
        delay: 100,
        mobile: false
    },
    slideTop: {
        distance: '120%',
        origin: 'top',
        duration: 850,
        delay: 300
    },
    slideRight: {
        distance: '120%',
        origin: 'right',
        duration: 250,
        opacity: 0
    }
};


if(!mq.matches){
    sr.reveal('.stats-counter',scrollAnimations.slideUp);
    sr.reveal('.about-us__img',scrollAnimations.slideLeft);
    sr.reveal('.about-us',scrollAnimations.slideTop);
    sr.reveal('.carousel',scrollAnimations.slideLeft);
    sr.reveal('.case-study__img',scrollAnimations.slideRight);
}

