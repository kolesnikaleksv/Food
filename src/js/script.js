require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import modals from './modules/modals';
import timer from './modules/timer';
import slider from './modules/slider';
import createCards from './modules/creatCards';
import forms from './modules/forms';
import calc from './modules/calc';
import {openModal} from './modules/modals';


window.addEventListener('DOMContentLoaded', () => {
    
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000); // open modal window after 5s

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modals('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2020-07-09');
    slider({
        container: '.offer__slider', 
        slide: '.offer__slide', 
        nextArrow: '.offer__slider-next', 
        prevArrow: '.offer__slider-prev', 
        totalCounter: '#total', 
        currentCounter: '#current', 
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner'
    });
    createCards();
    forms('form', modalTimerId); 
    calc();
});