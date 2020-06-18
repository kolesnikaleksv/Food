//"use strict";

document.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    
    function hedeTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hedeTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            
            tabs.forEach((item, i) => {
                if (target == item) {
                    hedeTabContent();
                    showTabContent(i);
                } 
            }); 
        }
    });

    //Timer
    const deadline = '2020-06-09';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num <= 0 || num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();
        
        function updateClock() {
            const t = getTimeRemaining(endtime);
              
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            
            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = 'aк';
                hours.innerHTML = 'ци';
                minutes.innerHTML = 'йн';
                seconds.innerHTML = 'ет';
            }
        }
    }

    setClock('.timer', deadline);

    //Modal window

    const btnmodal = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal');
        
    function openModal() {
            modalWindow.classList.add('show', 'fade');
            modalWindow.classList.remove('hide');
            document.body.style.overflow = 'hidden';   // untouchable site
            clearInterval(modalTimerId);   // excludes re-display
    }
    
    btnmodal.forEach(item => {
        item.addEventListener('click',  openModal);
        });

    modalWindow.addEventListener('click', (e) => {   // event on the backing
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    function closeModal() {
        modalWindow.classList.remove('show');
        modalWindow.classList.add('hide');
        document.body.style.overflow = '';
    }

    document.addEventListener('keydown', (e) => {    // key connection 'Escape'
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });
    
    const modalTimerId = setTimeout(openModal, 50000); // open modal window after 5s
    
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
        

        // Used class for cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.classes = classes;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML =  `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle"> ${this.title}</h3>
                <div class="menu__item-descr"> ${this.descr}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });
    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });
        
        

        //Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',   //prescribe the path to the spinner
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item); 
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img'); // redo the picture
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `    
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);  // change the append method

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => { 
                console.log(data);
                showThanksModal(message.success);    // call the new method
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
                console.log('catch');
            }).finally(() => {
                form.reset();
                console.log('finally');
            });

        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');  // create new modal window
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
         <div class="modal__content">
            <div class="modal__close" data-close>x</div>
            <div class="modal__title">${message}</div>
         </div>
        `;

        document.querySelector('.modal').append(thanksModal); //delegate event
        setTimeout(() => {                      // turn off new modal window
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    //slider

    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          current = document.querySelector('#current'),
          total = document.querySelector('#total');

          total.innerHTML = getZero(slides.length);
          
    let slideIndex = 1;

    showSlides(slideIndex);

    function showSlides(n) {
        if(n > slides.length) {
            slideIndex = 1;
        }
        if(n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach(item =>  item.classList.add('hide'));
        slides[slideIndex - 1].classList.remove('hide');
        slides[slideIndex - 1].classList.add('show');
        current.innerHTML = getZero(slideIndex);
    }
    

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function minusSlides(n) {
        showSlides(slideIndex -= n);
    }
    
    prev.addEventListener('click', () => {
        minusSlides(-1);
    });

    next.addEventListener('click', () => {
        plusSlides(1);
    });
    
    // sliders.forEach((index, item) => {
    //     hideSlider(item);
    //     if(sliders[item].classList.contains('show')) {
    //         let currentItem = item;
    //         current.innerHTML = getZero(item + 1);
    //         //console.log(currentItem);
    //         //console.log(item);
    //         if(currentItem < 0) {
    //             currentItem = sliders.length;
    //         } else if(currentItem > sliders.length) {
    //             currentItem = 0;
    //         }
    //         console.log(currentItem);
    //     }
    // });

    // arrowLeft.addEventListener('click', (e) => {
    //     //showSlider(currentItem);
    //    //hideSlider(currentItem);
    // });
    
    // arrowRight.addEventListener('click', () => {
    //     console.log(arrowRight);
    // });

    // function hideSlider(i) {
    //         sliders[i].classList.remove('show');
    //         sliders[i].classList.add('hide');
    // }

    // function showSlides(i = 0) {
    //     if(slideindex > 4) {

    //     }
    //     sliders[i].classList.remove('hide');
    //     sliders[i].classList.add('show');
           
    // }
    // showSlider();
    
    
    

    


    

    

});


