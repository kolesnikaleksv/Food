function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add('show', 'fade');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';   // untouchable site

    console.log(modalTimerId);
    if(modalTimerId) {
        clearInterval(modalTimerId);   // excludes re-display
    }
}

function modals(triggerSelector, modalSelector, modalTimerId) {
    //Modal window

    const btnmodal = document.querySelectorAll(triggerSelector),
        modalWindow = document.querySelector(modalSelector);


    btnmodal.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });
        
    modalWindow.addEventListener('click', (e) => {   // event on the backing
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {    // key connection 'Escape'
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
    
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

export default modals;
export {closeModal};
export {openModal};