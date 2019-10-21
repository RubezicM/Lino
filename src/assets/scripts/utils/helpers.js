export const getDocHeight = () => {
    let D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    )
};

export const isElementInViewport = (el) => {
    let rect = el.getBoundingClientRect();

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth)  &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight);
};


//export default getDocHeight;