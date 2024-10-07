const permits = [
    {
        "from_to_location": "Hamburg to Frankfurt",
        "rating": "Rating: 8/10",
        "duration": "10 weeks",
        "img": "../assets/imgs/road.jpg",
        "price": 120
    },
    {
        "from_to_location": "Berlin to Munich",
        "rating": "Rating: 6/10",
        "duration": "6 weeks",
        "img": "../assets/imgs/road.jpg",
        "price": 150
    },
    {
        "from_to_location": "Cologne to Dusseldorf",
        "rating": "Rating: 10/10",
        "duration": "8 weeks",
        "img": "../assets/imgs/road.jpg",
        "price": 200
    },
    {
        "from_to_location": "Stuttgart to Nuremberg",
        "rating": "Rating: 3/10",
        "duration": "1/2 years",
        "img": "../assets/imgs/road.jpg",
        "price": 130
    },
    {
        "from_to_location": "Leipzig to Dortmund",
        "rating": "Rating: 9/10",
        "duration": "1 year",
        "img": "../assets/imgs/road.jpg",
        "price": 180
    }
]
let permitsArray = [...permits];

const addPermitsToPage = (array) => {
    const itemsWrapper = document.getElementById('ItemsWrappper');
    const template = document.querySelector('.item-template');

    let child = itemsWrapper.firstChild;
    while (child) {
        const nextSibling = child.nextSibling;
        if (child.nodeType === 1 && child.tagName.toLowerCase() === 'div') {
            itemsWrapper.removeChild(child);
        }
        child = nextSibling;
    }

    array.forEach(permit => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('.picture').style.backgroundImage = `url(${permit.img})`;
        clone.querySelector('.h3').textContent = permit.from_to_location;
        clone.querySelector('.h6').textContent = permit.rating;
        clone.querySelector('.h5').textContent = permit.duration;
        clone.querySelector('h6').textContent = `${permit.price}$`;

        itemsWrapper.appendChild(clone);
    });
}

function filterPermits(searchTerm) {
    return permits.filter(permit =>
        permit.from_to_location.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
    );
}

function calculateTotalPrice() {
    const totalPrice = permitsArray.reduce((sum, permit) => sum + permit.price, 0);
    document.getElementById('total_price').textContent = `${totalPrice.toString()} $`;
}

function sortByCategory(sortBy) {
    if (sortBy === 'Price(Low to High)') {
        return permitsArray.slice().sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Name A-Z') {
        return permitsArray.slice().sort((a, b) => a.from_to_location.localeCompare(b.from_to_location));
    } else if (sortBy === 'Name Z-A') {
        return permitsArray.slice().sort((a, b) => b.from_to_location.localeCompare(a.from_to_location));
    }
    else if (sortBy === 'Rating') {
        return permitsArray.slice().sort((a, b) => {
            const ratingA = parseInt(a.rating.match(/\d+/)[0]);
            const ratingB = parseInt(b.rating.match(/\d+/)[0]);
            return ratingB - ratingA;
        })}
}

document.querySelector('.search-menu form').addEventListener('submit', function(event) {
    event.preventDefault();
    let filteredPermits;
    const searchTerm = event.target.querySelector('input').value;
    if (searchTerm !== '') {
        filteredPermits = filterPermits(searchTerm);
        permitsArray = filteredPermits;
    }
    else {
        permitsArray = permits;
        filteredPermits = permits;
    }

    const selected_value = document.getElementById('sort').value
    if (selected_value !== 'Choose one...') {
        addPermitsToPage(sortByCategory(selected_value))
    }
    else {
        addPermitsToPage(filteredPermits);
    }
});

document.querySelector('.clear').addEventListener('click', function(event) {
    event.preventDefault()
    document.querySelector('.search-menu input').value = '';
    permitsArray = permits;


    const selected_value = document.getElementById('sort').value
    if (selected_value !== 'Choose one...') {
        addPermitsToPage(sortByCategory(selected_value))
    }
    else {
        addPermitsToPage(permits);
    }

});

document.getElementById('sort').addEventListener('change', function(event) {
    const sortBy = event.target.value;
    let sortedPermits;

    addPermitsToPage(sortByCategory(sortBy));
});

document.querySelector('.item-count-button').addEventListener('click', function(event) {
    event.preventDefault();
    calculateTotalPrice();
});

addPermitsToPage(permitsArray);