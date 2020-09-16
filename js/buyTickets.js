let minus = document.querySelectorAll('.minus');
let plus = document.querySelectorAll('.plus');
let quantity = document.querySelectorAll('.quantity');

const priceOld = 70;
const priceAdult = 85;
const priceYoung = 65;

let total = document.querySelector('#total');

minus.forEach(elm => elm.addEventListener('click', () => {
    if (elm.nextElementSibling.innerHTML == 0) {

    } else {
        elm.nextElementSibling.innerHTML = elm.nextElementSibling.innerHTML - 1;
    }

    calculatePrice();
}))

plus.forEach(elm => elm.addEventListener('click', () => {
    elm.previousElementSibling.innerHTML = Number(elm.previousElementSibling.innerHTML) + 1;

    calculatePrice();
}))

function calculatePrice() {
    total.innerHTML = (quantity[0].innerHTML * priceOld + quantity[1].innerHTML * priceAdult + quantity[2].innerHTML * priceYoung) * discount;
}


let coupon = document.querySelector('#coupon p');
let couponCodeInput = document.querySelector('#coupon input');
let couponBtn = document.querySelector('#coupon button');
let discount = 1;

coupon.addEventListener('click', () => {
    let couponIcon = document.querySelector('#coupon p span');
    let form = document.querySelector('#coupon form');

    form.classList.toggle('display');

    if (couponIcon.innerHTML == '+') {
        couponIcon.innerHTML = '-';
    } else {
        couponIcon.innerHTML = '+';
    }
})

couponBtn.addEventListener('click', () => {
    if (couponCodeInput.value == 20) {
        discount = 0.8;
        calculatePrice();

        if (document.querySelector('#fail')) {
            document.querySelector('#fail').remove();
        } else if (document.querySelector('#success')) {
            document.querySelector('#success').remove();
        }

        couponBtn.insertAdjacentHTML('afterend', '<p id="success">Du har fået 20% rabat.</p>')
    } else {
        discount = 1;
        calculatePrice();

        if (document.querySelector('#success')) {
            document.querySelector('#success').remove();
        } else if (document.querySelector('#fail')) {
            document.querySelector('#fail').remove();
        }

        couponBtn.insertAdjacentHTML('afterend', '<p id="fail">Ingen rabat til dig.</p>')
    }
})


let parser = document.createElement('a');
parser.href = window.location.href;
let query = parser.search.substring(1);
let title = query.replace('-', ' ');

document.querySelector('#buy-tickets h1').innerHTML = `Køb billetter til ${title} her`;





const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
}

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    movieSelect.addEventListener('change', (e) => {
        ticketPrice = +e.target.value;
        setMovieData(e.target.selectedIndex, e.target.value);
        updateSelectedCount();
    });

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
})

updateSelectedCount();