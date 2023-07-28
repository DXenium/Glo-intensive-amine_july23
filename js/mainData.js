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
    fetch('https://glo-intensive-anime-july23-default-rtdb.firebaseio.com/anime.json')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data);
        })
}

mainData()