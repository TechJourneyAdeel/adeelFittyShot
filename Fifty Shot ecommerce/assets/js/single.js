fetch("https://fakestoreapi.com/products")
    .then((data) => {
        return data.json()
    }).then((data) => {
        displayData(data)
    }).catch((erorr) => {
        console.log(erorr)
    })


displayData = (data) => {

    const urlParams = new URLSearchParams(window.location.search)
    const urlId = String(urlParams.get('id')).replace(/_/g, ' ').replace(/[^a-zA-Z0-9\s]/g, '').trim();

    console.log(data)

    data.forEach((item) => {
        let title = String(item.title).replace(/[^\w]/g, ' ').trim();

        if (title === urlId) {
            document.querySelector('.main-img img').setAttribute('src', item.image);
            document.querySelector('.main-description .category span').innerText = item.category;
            document.querySelector('.main-description .product-title').innerText = item.title;
            document.querySelector('.main-description i').setAttribute('data-star', item.rating.rate);
            document.querySelector('.main-description .new-price').innerText = `$${item.price}`;
            document.querySelector('.product-details .description').innerText = item.description;
        }
    });
}

