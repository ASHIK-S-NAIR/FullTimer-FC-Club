const track = document.querySelector('.hero-carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.hero-carousel-button-left');
const nextButton = document.querySelector('.hero-carousel-button-right');
const dotsNavigation = document.querySelector('.hero-carousel-navigation');
const dots = Array.from(dotsNavigation.children);

const slideWidth = slides[0].getBoundingClientRect().width;


const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updatingDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (track, prevButton, nextButton, targetIndex) => {
    if(targetIndex === 0){
        prevButton.classList.add('isHidden');
        nextButton.classList.remove('isHidden');
    }else if(targetIndex === track.length - 1){
        prevButton.classList.remove('isHidden');
        nextButton.classList.add('isHidden');
    }else{
        prevButton.classList.remove('isHidden');
        nextButton.classList.remove('isHidden');
    }
}

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNavigation.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    const nextDot = currentDot.nextElementSibling;
    
    moveToSlide(track, currentSlide, nextSlide);
    updatingDots(currentDot, nextDot);
    hideShowArrows(track, prevButton, nextButton, nextIndex);
})

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNavigation.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    const prevDot = currentDot.previousElementSibling;
    
    moveToSlide(track, currentSlide, prevSlide);
    updatingDots(currentDot, prevDot);
    hideShowArrows(track, prevButton, nextButton, prevIndex);
})

dotsNavigation.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if(!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNavigation.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updatingDots(currentDot, targetDot);
    hideShowArrows(track, prevButton, nextButton, targetIndex);
})



