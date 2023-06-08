const scrollElements = document.querySelectorAll(".jsScroll");

const elementInView = (el, offset) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= ((window.innerHeight || document.documentElement.clientHeight) - offset));
};

const elementOutView = (el, offset) => {
    const elementBottom = el.get
}

const displayScrollElement = (el) => {
    el.classList.add('scrolled');
}

const hideScrollElement = (el) => {
    el.classList.remove('scrolled');
}

const scrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        } 
        else {
            hideScrollElement(el);
        }
    })
}

window.addEventListener('scroll', () => {
    scrollAnimation();
})