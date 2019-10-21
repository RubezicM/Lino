import Glide from "@glidejs/glide/dist/glide.min.js";


let glide = new Glide('.glide', {
    type: 'carousel',
    perView: 1,
    focusAt: 'center',
    autoplay: "2500"
});
glide.mount();