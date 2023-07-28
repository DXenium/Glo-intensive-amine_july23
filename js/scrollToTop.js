const scroll = () => {
    const scrollToTopButton = document.querySelector('#scrollToTopButton');

    scrollToTopButton.addEventListener('click', (event) => {
        event.preventDefault;

        seamless.scrollIntoView(document.querySelector(".header"), {
            behavior: "smooth",
            block: "center",
            inline: "center",
        })
    })
}

scroll()