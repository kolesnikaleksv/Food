function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //slider

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width; // get the width of the slider window from computedStyle
    
    let offset = 0;
    let slideIndex = 1;
    total.innerHTML = getZero(slides.length);

    slidesField.style.width = 100 * slides.length + '%'; // we get the total width, and equals 400%
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slides.forEach(slide => slide.style.width = width); // set the width of the pictures

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'), // ordered list
          dots = [];

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);
    
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); // assign to certain pictures
        dot.classList.add('dot');
        
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot); // push in array dots
    }

    function getZero(num) {
        if (num <= 0 || num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    slidesWrapper.style.overflow = 'hidden'; // hide everything that does not fall into scope

    const digClean = () =>  +width.replace(/\D/g, '');

    next.addEventListener('click', () => {
        if (offset == digClean() * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += digClean();
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        generalChanges();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = digClean() * (slides.length - 1);
        } else {
            offset -= digClean();
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        generalChanges();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            let slideTo = e.target.getAttribute('data-slide-to');
            
            slideIndex = slideTo;
            offset = digClean() * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            generalChanges();
        });
    });

    function generalChanges() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1; 

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }
}

export default slider;