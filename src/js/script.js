document.addEventListener('DOMContentLoaded', () => {

    const tabs = require('./modules/tabs'),
          modals = require('./modules/modals'),
          timer = require('./modules/timer'),
          slider = require('./modules/slider'),
          createCards = require('./modules/creatCards'),
          forms = require('./modules/forms'),
          calc = require('./modules/calc');

    tabs();
    modals();
    timer();
    slider();
    createCards();
    forms();
    calc();
});