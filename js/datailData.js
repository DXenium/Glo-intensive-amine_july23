const detaiData = () => {

    const preloder = document.querySelector('.preloder');


    //функция выпадающего меню с жанрами категорий аниме
    const renderGanreList = (ganres) => {
        const DropDownBlock = document.querySelector('.header__menu .dropdown')

        ganres.forEach(ganre => {
            DropDownBlock.insertAdjacentHTML('beforeend', `
                <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
            `)
        })
    }

    const renderAnimeDetails = (array, itemId) => {
        const animeObj = array.find(item => item.id == itemId)
        const imageBlock = document.querySelector('.anime__details__pic')
        const viewsBlock = imageBlock.querySelector('.view')
        const titleBlock = document.querySelector('.anime__details__title h3')
        const subtitleBlock = document.querySelector('.anime__details__title span')
        const descriptionBlock = document.querySelector('.anime__details__text p')
        const widgetList = document.querySelectorAll('.anime__details__widget ul li')
        const breadcrumb = document.querySelector('.breadcrumb__links span')

        if (animeObj) {
            imageBlock.dataset.setbg = animeObj.image
            viewsBlock.insertAdjacentHTML('beforeend', `
            <i class="fa fa-eye"></i> ${animeObj.views}</div>
            `)

            titleBlock.textContent = animeObj.title
            subtitleBlock.textContent = animeObj['original-title']
            descriptionBlock.textContent = animeObj.description

            widgetList[0].insertAdjacentHTML('beforeend', `
                 <span>Date aired:</span>  ${animeObj.date}
            `)
            widgetList[1].insertAdjacentHTML('beforeend', `
                <span>Rating:</span>  ${animeObj.rating}
            `)
            widgetList[2].insertAdjacentHTML('beforeend', `
                <span>Genre:</span>  ${animeObj.tags.join(", ")}
            `)

            breadcrumb.textContent = animeObj.ganre //записываем правильную категорию в хлебные крошки

            document.querySelectorAll('.set-bg').forEach((elem) => {
                elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
            })// добавляем каждой карточке картинку на фон

            setTimeout(() => {
                preloder.classList.remove('active');
            }, 500) //отключение прелоадера

        } else {
            console.log('Аниме отсутствует!');
        }
    }

    fetch('https://glo-intensive-anime-july23-default-rtdb.firebaseio.com/anime.json')
        .then((response) => response.json())
        .then((data) => {
            const ganres = new Set();
            const rangeParams = new URLSearchParams(window.location.search).get('itemId')

            data.forEach((item) => {
                ganres.add(item.ganre)
                //сортируем массив по жарнрам и заполняем коллекцию уникальными элементами
            })

            if (rangeParams) {
                renderAnimeDetails(data, rangeParams);
            } else {
                console.log('Аниме отсутствует!');
            }
            renderGanreList(ganres);
        })
}

detaiData()