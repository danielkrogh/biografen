/*
    Antal biletter og kupon
*/
let minus = document.querySelectorAll('.minus'); // Alle minus knapper
let plus = document.querySelectorAll('.plus'); // Alle plus knapper
let quantity = document.querySelectorAll('.quantity'); // Alle billettypers antal

// Billet priser
const priceOld = 70;
const priceAdult = 85;
const priceYoung = 65;

// Samlet pris
let total = document.querySelector('#total');


minus.forEach(elm => elm.addEventListener('click', () => { // Klik på minus
    if (elm.nextElementSibling.innerHTML == 0) { // Hvis quantity allerede er nul gøres intet

    } else { // Ellers trækkes en fra nuværende quantity
        elm.nextElementSibling.innerHTML = elm.nextElementSibling.innerHTML - 1;
    }

    calculatePrice(); // Funktion til at beregne pris kaldes
    allSelected(); // Funktion til at vise/skjule siddepladser kaldes
}))

plus.forEach(elm => elm.addEventListener('click', () => { // Klik på plus
    elm.previousElementSibling.innerHTML = Number(elm.previousElementSibling.innerHTML) + 1; // Quantity tilføjes en

    calculatePrice(); // Funktion til at beregne pris kaldes
    allSelected(); // Funktion til at vise/skjule siddepladser kaldes
}))

 // Funktion til at beregne pris
function calculatePrice() {
    total.innerHTML = (quantity[0].innerHTML * priceOld + quantity[1].innerHTML * priceAdult + quantity[2].innerHTML * priceYoung) * discount; // Quantity ganges med pris og plusses sammen
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



/*
    Valg af placering
*/
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const movieSelect = document.getElementById('movie');

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

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
        allSelected();
    }
})


function allSelected() {
    let ticketsSelected = Number(quantity[0].innerHTML) + Number(quantity[1].innerHTML) + Number(quantity[2].innerHTML);
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (ticketsSelected == 0) {
        document.querySelectorAll('.row .seat').forEach(seat => {
            seat.classList.add('occupied')
        })
        document.querySelectorAll('.row .seat.selected').forEach(seat => {
            seat.classList.remove('selected')
        })
        localStorage.removeItem('selectedSeats')
        occupySeats();
    } else if (ticketsSelected == 1 && selectedSeats == null) {
        document.querySelectorAll('.row .seat').forEach(seat => {
            seat.classList.remove('occupied')
        })
        occupySeats();
    } else if (selectedSeats.length == ticketsSelected) {
        document.querySelectorAll('.row .seat:not(.selected)').forEach(seat => {
            seat.classList.add('occupied')
        })
    } else if (selectedSeats.length > ticketsSelected) {
        document.querySelectorAll('.row .seat.occupied').forEach(seat => {
            seat.classList.remove('occupied')
        })
        document.querySelectorAll('.row .seat.selected').forEach(seat => {
            seat.classList.remove('selected')
        })
        occupySeats();
    } else {
        document.querySelectorAll('.row .seat:not(.selected)').forEach(seat => {
            seat.classList.remove('occupied')
        })
        occupySeats();
    }
}


let dates = document.querySelectorAll('.date-row p');
const currentDate = JSON.parse(localStorage.getItem('occupiedSeats'));
let datesOccupied = [currentDate, [13,14], [15,16], [17,18], [19,20], [21,22]]

dates[0].classList.add('active');

dates.forEach(date => date.addEventListener('click', () => {
    dates.forEach(date => date.classList.remove('active'));
    date.classList.add('active');

    let clickedIndex = Array.from(dates).indexOf(date);
    localStorage.setItem('occupiedSeats', JSON.stringify(datesOccupied[clickedIndex]));
    allSelected();
}))


populateUI();
updateSelectedCount();
calculatePrice();
occupySeats();
allSelected();


function occupySeats() {
    let occupiedSeats = JSON.parse(localStorage.getItem("occupiedSeats"));

    if (occupiedSeats) {
        occupiedSeats.forEach(elm => seats[elm].classList.add('occupied'));

        document.querySelector('#order h1').innerHTML = `Køb billetter til ${localStorage.getItem('movieTitle')} her`;
        document.querySelector('#movie-img img').src = `img/Poster-${localStorage.getItem('movieTitle')}.jpg`
    }
}