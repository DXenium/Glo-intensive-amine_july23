const bgElements = () => {
    const elements = document.querySelectorAll('.set-bg');

    //Перебор массива объектов через метод ForEach:

    elements.forEach((elem) => {
        elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
    })


    //Перебор массива объектов в цикле for:

    // for (let i = 0; i < elements.length; i++) {
    //     const src = elements[i].dataset.setbg;

    //     elements[i].style.backgroundImage = `url(${src})`;
    // }
}

bgElements()