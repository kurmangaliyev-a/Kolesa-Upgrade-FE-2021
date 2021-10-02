document.querySelector('.header .search').addEventListener('click', (e) => {
    // if(e.target)
    if (!e.target.classList.contains('search-icon')) {
        document.querySelector('.search input[type="search"]').focus();
    }
});
