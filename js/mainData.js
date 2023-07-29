// Функция получает данные из файла db.json внутри проекта

//const mainData = () => {
//     fetch('./db.json')
//         .then((response) => {
//             return response.json()
//         })
//         .then((data) => {
//             console.log(data.anime);
//         })
// }

// mainData()



// Функция получает данные из облачного хранилища firebase


const mainData = () => {
    const renderAnimeList = (array, ganres) => {
        console.log(array);
        console.log(ganres);
    }

    const renderTopAnime = (array) => {
        const wrapper = document.querySelector('.filter__gallery')

        wrapper.innerHTML = ''; //очищаем вёрстку переменной wrapper 

        array.forEach((item) => {
            wrapper.insertAdjacentHTML('afterbegin', `
                <div class="product__sidebar__view__item set-bg mix" data-setbg="${item.image}">
                    <div class="ep">"${item.rating}" / 10</div>
                    <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
                    <h5><a href="/anime-details.html">${item.title}</a></h5>
                </div>
            `)// методом перебора заполняем вёрстку каждой карточки переменными из базы данных
        });

        wrapper.querySelectorAll('.set-bg').forEach((elem) => {
            elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
        })// добавляем каждой карточке картинку на фон
    }

    fetch('https://glo-intensive-anime-july23-default-rtdb.firebaseio.com/anime.json')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const ganres = new Set();

            renderTopAnime(data.sort((a, b) => b.views - a.views).slice(0, 5));
            // сортируем массив по параметру "просмотры/views" от большего к меньшему
            // обрезам первые 5 элементов от 0 до 5

            data.forEach((item) => {
                ganres.add(item.ganre)
                //сортируем массив по жарнрам и заполняем коллекцию уникальными элементами
            })

            renderAnimeList(data, ganres);
        })
}

mainData()