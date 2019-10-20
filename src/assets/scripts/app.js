import mixitup from "mixitup/dist/mixitup";
import Glide from "@glidejs/glide/dist/glide";

const mixerContainer = document.querySelector('.portfolioMix');

let mixer = mixitup(mixerContainer, {
    selectors: {
        target: '.mix'
    },
    animation: {
        duration: 300
    }
});


let glide = new Glide('.glide', {
    type: 'carousel',
    perView: 1,
    focusAt: 'center',
    autoplay: "2500"
});
glide.mount();


let mq = window.matchMedia( "(max-width: 992px)" );
let sr = new ScrollReveal();

console.log(mq);

let slideUp = {
    distance: '150%',
    origin: 'bottom',
    opacity: .1,
    duration: 700,
    interval: 50,
    delay:200
};
let slideLeft = {
    distance: '150%',
    origin: 'left',
    duration: 750,
    delay: 100,
    mobile: false
};
let slideTop = {
    distance: '300%',
    origin: 'top',
    duration: 850,
    delay: 300
};
let slideRight = {
    distance: '150%',
    origin: 'right',
    duration: 250,
    opacity: 0
};
if(!mq.matches){
    sr.reveal('.stats-counter',slideUp);
    sr.reveal('.about-us__img',slideLeft);
    sr.reveal('.about-us',slideTop);
    sr.reveal('.carousel',slideLeft);
    sr.reveal('.case-study__img',slideRight);
}



const nav = document.getElementById('nav');
const arrowTop = document.getElementById('arrowTop');
const sliderPanel = document.querySelectorAll('.slider__trigger');
const parallax = document.querySelector('.parallax');
const statistics = document.querySelector('.statistics');
const statsDIVs = document.querySelectorAll('.stats-counter__num');
let xScrollPosition;
let yScrollPosition;
let lastScrollPos = 0;
let distance = 0;
let counted = false;
let parallaxPos = document.querySelector('.statistics');

let data = parallaxPos.getBoundingClientRect();
const menuItems = document.querySelectorAll('.nav__item');
const menuBtn = document.querySelector('.nav__button');
// const breakpoints = {
//     sm: 3,
//     md:
// };



/// closing mobile menu

menuItems.forEach((item)=>{
   item.addEventListener('click',(e)=>{
      console.log(e.currentTarget.parentElement.parentElement);
       e.currentTarget.children[0].click();
       e.currentTarget.parentElement.parentElement.classList.remove('open');
       menuBtn.classList.remove('active');
   });
});

function getDocHeight() {
    let D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    )
}

let docheight = getDocHeight();


window.onscroll = function () {


  shrinkNav();
  showArrow();


  /////// start counting up in service section

    if(isElementInViewport(statistics) && counted === false){
        statsDIVs.forEach(e=>{
            let cat = e.id;
            let time = 3;
            let countTo = completeStats[`${cat}`];
            countValue(e,countTo,time);
            counted = true;
        });
    }



};

function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */;
}

function scrollLoop() {
    xScrollPosition = window.scrollX;
    yScrollPosition = window.scrollY;
    setTranslate(0, yScrollPosition * 0.1, parallax);
    requestAnimationFrame(scrollLoop);
    //console.log(xScrollPosition,yScrollPosition,parallaxPos.offsetTop);
}


function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}
function setBgPosY(yPos, el) {
    el.style.backgroundPositionY = yPos + "px";
}
// Smooth scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    addDataAttributes();
    //scrollLoop();
}, false);

const shrinkNav = (width) => {

  if((document.body.scrollTop > 80 || document.documentElement.scrollTop > 80)){
       nav.style.backgroundColor = 'rgba(0,0,0,.55)';
       nav.style.padding = '1rem';
       nav.style.position = 'fixed';
       nav.style.height = '80px';

  } else {
    nav.style.backgroundColor = 'transparent';
    nav.style.padding = '3rem 2.5rem';
    nav.style.position = 'absolute';
  }
};

const showArrow = () => {
    if(document.body.scrollTop > 400 || document.documentElement.scrollTop > 400){
        arrowTop.style.opacity = '1';
    } else {
        arrowTop.style.opacity = '0';
    }
};


// SLIDER

const sliderBtns = document.querySelectorAll('.slider__trigger');
const sliderImgs = document.querySelectorAll('.slider__img');




function addDataAttributes(){
    sliderImgs.forEach((img)=>{
        let name = img.getAttribute('src').split('/')[3].split('.')[0];
        // adding data-name to img

        img.setAttribute('data-name',name);
    })
}

// global - timeout event for slide
let slideInProgress;
sliderBtns.forEach((e)=>{
   e.addEventListener('click',(event)=>{
        if(e.classList.contains('active')){
            console.log('aktivno dugmo');
            return false;
        } else {
            document.querySelector('.slider__trigger.active').classList.remove('active');
            e.classList.add('active')
        }

       let slide = e.id;
       let img = document.querySelectorAll(`[data-name='${slide}']`);

       // removing active image

       if(document.querySelector('.slider__img.active')){
           document.querySelector('.slider__img.active').classList.remove('active');
       }


       // if sliding in progress
       let elems = document.querySelector(".sliding");

       if(elems !== null){
           elems.classList.remove('sliding');
           clearTimeout(slideInProgress);
       }

        if(!img[0].classList.contains('active') && !img[0].classList.contains('sliding')){
            img[0].classList.add('sliding');

            // Getting animation duration from CSS //
            let currentAnimationDuration = window.getComputedStyle(img[0], null).getPropertyValue("animation-duration");

            // in ms
            currentAnimationDuration = parseFloat(currentAnimationDuration.replace('s','')) * 1000;


            // setting timeout event
            slideInProgress = setTimeout(()=>{
                img[0].classList.remove('sliding');
                img[0].classList.add('active');

            },currentAnimationDuration)
        }

   });
});


adjustServicesSection();

// Adjust services section

function adjustServicesSection(){
    let rowLeft = document.querySelector('.row').getBoundingClientRect().x;
    let servicesLeft = document.querySelector('.services').getBoundingClientRect().x;
    let mq = window.matchMedia( "(max-width: 1200px)" );

    sliderPanel.forEach((el)=>{
        if(!mq.matches){
            el.style.paddingLeft = (rowLeft + servicesLeft) + 'px';
        }

    })

}




// make sub titles in a slider

const slides = document.querySelectorAll('.mix');

slides.forEach(slide=>{
    buildDescDiv(slide);
});

function buildDescDiv(div){
    // list of cats
    let categories = div.classList.value.replace('mix','').trim().split(' ');
    // img name
    let imgName = div.lastElementChild.getAttribute('src').split('/')[1].split('.')[0];
    let container = document.createElement("div");
    let title = document.createElement('h5');
    container.className = 'mix__title';
    title.textContent = imgName.split('-').join(' ');
    container.appendChild(title);
    let categoriesSub = document.createElement('p');
    categoriesSub.className = 'mix__category';
        for(let i = 0;i<categories.length;i++){
            let categoryHolder = document.createElement('span');
            categoryHolder.textContent = categories[i];
            categoriesSub.appendChild(categoryHolder);
        }
    container.appendChild(categoriesSub);
    div.appendChild(container);
}



// Stats counter



let completeStats = {
    favorites:3891,
    posts24h: 233,
    totalPosts:643,
    campaigns: 564,
    amazingFeatures: 154
};



function countValue(el,value,time) {
    let interval = value/time/7;
    let init = 0;
    let counting = setInterval(()=>{
        init+=interval;
        if(el.id==="posts24h"){
            el.textContent = Math.floor(init) + "K";
        }else {
            el.textContent = Math.floor(init);
        }

        if(init >= value){
                init = value;
                clearInterval(counting);
            if(el.id==="posts24h"){
                el.textContent = Math.floor(init) + "K";
            }else {
                el.textContent = Math.floor(init);
            }
           return Math.floor(init);
        }
    },120);
}


// Blog hover function

const readMoreBlog = document.querySelectorAll('.blog__readmore');

readMoreBlog.forEach(elem=>{
    elem.addEventListener('mouseenter',(e)=>{
        let overlay = e.target.parentElement.parentElement.children[0].children[0];

        overlay.classList.add('active');
    });
    elem.addEventListener('mouseout',(e)=>{
        let overlay = e.target.parentElement.parentElement.children[0].children[0];

        overlay.classList.remove('active');
    });
});

// hamburger menu



menuBtn.addEventListener('click',(e)=>{
   e.currentTarget.classList.toggle('active');
   console.log(e.currentTarget.parentNode.children[1].classList.toggle('open'));
});
