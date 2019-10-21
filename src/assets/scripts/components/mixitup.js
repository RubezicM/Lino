import mixitup from "mixitup";

const mixerContainer = document.querySelector('.portfolioMix');

let mixer = mixitup(mixerContainer, {
    selectors: {
        target: '.mix'
    },
    animation: {
        duration: 300
    }
});