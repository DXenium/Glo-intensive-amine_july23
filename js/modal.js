const modal = () => {
    const modal = document.querySelector('.search-model');
    const modalBtn = document.querySelector('.icon_search');
    const modalClose = modal.querySelector('.search-close-switch');
    const searchInput = modal.querySelector('#search-input');
    const wrapper = document.querySelector('.search-modal-result');

    wrapper.style.width = '100%';
    wrapper.style.maxWidth = '500px';

    //реализуем отложенный запрос debounce на сервер 
    const debounce = (func, ms = 500) => {
        let timer
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(this, args), ms
            })
        }
    }

    const searchDebounce = debounce((searchString) => {
        searchFunc(searchString)
    }, 800)

    //реализуем живой поиск в модельном окне
    const renderFunc = (items) => {
        wrapper.innerHTML = ''

        items.forEach(item => {
            wrapper.insertAdjacentHTML('beforeend', `
            <a class="p-2" href="/anime-details.html" target="_blank" style="color:#ffffff;">${item.title}</a>
            `)
        });
    }

    const searchFunc = (serchStr) => {
        fetch('https://glo-intensive-anime-july23-default-rtdb.firebaseio.com/anime.json')
            .then((response) => response.json())
            .then((data) => {
                const filteredData = data.filter(dataItem => {
                    return dataItem.title.toLowerCase().includes(serchStr.toLowerCase()) ||
                        dataItem.description.toLowerCase().includes(serchStr.toLowerCase())
                })
                renderFunc(filteredData.slice(0, 5));
            })
    }

    modalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        searchInput.focus();
    })

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        searchInput.value = '';
        wrapper.innerHTML = ''

    })

    searchInput.addEventListener('input', (event) => {
        searchDebounce(event.target.value)
    });
};

modal();