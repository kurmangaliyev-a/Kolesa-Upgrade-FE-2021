import '../scss/style.scss';

document.querySelector('.header .search').addEventListener('click', (e) => {
    if (!e.target.classList.contains('search-icon')) {
        document.querySelector('.search input[type="search"]').focus();
    }
});

function productModalWindow() {
    const elements = document.querySelectorAll('.product .openModal');
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.closeModal');

    elements.forEach((elm) => {
        elm.addEventListener('click', () => {
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
        });
    });
    closeModal.addEventListener('click', () => {
        modal.classList.add('hide');
        document.body.style.overflow = '';
    });
}

productModalWindow();
