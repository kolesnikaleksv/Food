function modals() {
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
}

module.exports = modals;