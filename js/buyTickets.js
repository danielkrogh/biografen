/*
    Antal biletter og kupon
*/
let minus = document.querySelectorAll('.minus'); // Alle minus knapper
let plus = document.querySelectorAll('.plus'); // Alle plus knapper
let quantity = document.querySelectorAll('.quantity'); // Alle billettypers antal
let coupon = document.querySelector('#coupon p'); // Felt der skal klikkes for at vise input
let couponCodeInput = document.querySelector('#coupon input'); // Coupon input felt
let couponBtn = document.querySelector('#coupon button'); // Coupon knap
let discount = 1; // Rabat er som udgangspunkt 1. 20% rabat vil være 0.8
let seniorDiscount = JSON.parse(sessionStorage.getItem('seniorDiscount'));

let prices = [70, 85, 65] // Billet priser

let total = document.querySelector('#total'); // Samlet pris

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

function calculatePrice() { // Funktion til at beregne pris
    if (seniorDiscount == true) { // Hvis senior rabat er true er total gratis
        total.innerHTML = 'Gratis'
    } else if (seniorDiscount == false) { // Hvis senior rabat er false ganges quantity med pris og plusses sammen. Resultat ganges med evt. rabat
        let totalPrice = 0;

        for (i = 0; i < quantity.length; i++) {
            totalPrice += (quantity[i].innerHTML * prices[i])
        }

        total.innerHTML = totalPrice * discount + ' kr.';
    }
}


if (seniorDiscount == true) {
    coupon.classList.add('disable-click');
} else if (seniorDiscount == false) {
    coupon.classList.remove('disable-click');
}

coupon.addEventListener('click', () => { // Klik på 'Kupon' tekst
    let couponIcon = document.querySelector('#coupon p span');
    let form = document.querySelector('#coupon form');

    form.classList.toggle('display'); // Toggle af klassen 'display' på coupon form

    if (couponIcon.innerHTML == '+') { // Skift af plus/minus-tegn
        couponIcon.innerHTML = '-';
    } else {
        couponIcon.innerHTML = '+';
    }
})

couponBtn.addEventListener('click', () => { // Klik på indløs coupon knap 
    if (couponCodeInput.value == 20) { // Hvis indtastet værdi er '20'
        discount = 0.8; // Rabat sættes til 0.8 hvilket svarer til 20% rabat
        calculatePrice(); // Pris beregnes

        if (document.querySelector('#fail')) { // Fjern fail/success besked hvis en af disse findes
            document.querySelector('#fail').remove();
        } else if (document.querySelector('#success')) {
            document.querySelector('#success').remove();
        }

        couponBtn.insertAdjacentHTML('afterend', '<p id="success">Du har fået 20% rabat.</p>') // Tilføj success besked
    } else { // Hvis intet eller alt andet end '20' indtastet
        discount = 1; // Rabat sættes til sdt.
        calculatePrice(); // Pris beregnes

        if (document.querySelector('#success')) { // Fjern fail/success besked hvis en af disse findes
            document.querySelector('#success').remove();
        } else if (document.querySelector('#fail')) {
            document.querySelector('#fail').remove();
        }

        couponBtn.insertAdjacentHTML('afterend', '<p id="fail">Ingen rabat til dig.</p>') // Tilføj fail besked
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

function allSelected() { // Knytter antal billetter valgt og antal pladser valgt sammen
    let ticketsSelected = Number(quantity[0].innerHTML) + Number(quantity[1].innerHTML) + Number(quantity[2].innerHTML);
    let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (ticketsSelected == 0) { // Hvis ingen billetter er valgt fjernes klasser occupied og selected fra alle seats og selectedSeats fjernes fra local storage
        document.querySelectorAll('.row .seat').forEach(seat => {
            seat.classList.add('occupied')
            seat.classList.remove('selected')
        })
        localStorage.removeItem('selectedSeats')
    } else if (ticketsSelected == 1 && selectedSeats == null) { // Hvis en billet er valg men ingen pladser er valgt fjernes klassen occupied fra alle seats
        document.querySelectorAll('.row .seat').forEach(seat => {
            seat.classList.remove('occupied')
        })
    } else if (selectedSeats !== null && selectedSeats.length == ticketsSelected) { // Hvis antallet af valgte billetter og pladser er det samme tilføjes klassen occupied til alle seats uden klassen selected
        document.querySelectorAll('.row .seat:not(.selected)').forEach(seat => {
            seat.classList.add('occupied')
        })
    } else if (selectedSeats !== null && selectedSeats.length > ticketsSelected) { // Hvis altallet af valgte billetter er mindre end antallet af valgte pladser fjernes klasserne occupied og selected fra alle seats og selectedSeats fjernes fra local storage
        document.querySelectorAll('.row .seat').forEach(seat => {
            seat.classList.remove('occupied')
            seat.classList.remove('selected')
        })
        localStorage.removeItem('selectedSeats')
    } else { // Ellers fjernes klassen occupied fra alle seats 
        document.querySelectorAll('.row .seat').forEach(seat => {
            seat.classList.remove('occupied')
        })
    }

    occupySeats();
}


let occupiedTrash = [20, 21, 39, 40]; // Optagede pladser til filmen 'Trash'
let occupiedCitizenfour = [16, 17, 18, 19, 42, 43, 44, 45]; // Optagede pladser til filmen 'Citizenfour'

if (JSON.parse(sessionStorage.getItem('newArray')).title == 'trash') { // Hvis titlen er trash sættes currentOccupiedSeats som occupiedTrash
    localStorage.setItem('currentOccupiedSeats', JSON.stringify(occupiedTrash));
} else if (JSON.parse(sessionStorage.getItem('newArray')).title == 'citizenfour') { // Hvis titlen er citizenfour sættes currentOccupiedSeats som occupiedCitizenfour
    localStorage.setItem('currentOccupiedSeats', JSON.stringify(occupiedCitizenfour));
}

let dates = document.querySelectorAll('.date-row p'); // Alle datoer
const currentOccupiedSeats = JSON.parse(localStorage.getItem('currentOccupiedSeats')); // Optagede pladser på første dato
let datesOccupied = [currentOccupiedSeats, [13,14], [15,16], [17,18], [19,20], [21,22]] // Array med optagede pladser på alle datoer

dates[0].classList.add('active'); // Første dato er som udgangspunkt valgt
localStorage.setItem('occupiedSeats', JSON.stringify(currentOccupiedSeats)); // occupiedSeats sættes som currentOccupiedSeats hvilket svarer til første dato

dates.forEach(date => date.addEventListener('click', () => { // Hver gang der klikkes på en dato
    dates.forEach(date => date.classList.remove('active')); // Alle datoer får fjernet klassen active
    date.classList.add('active'); // Den klikkede dato får tilføjet klassen active

    let clickedIndex = Array.from(dates).indexOf(date); // Vi får fat i index af den klikkede dato i arrayet dates
    localStorage.setItem('occupiedSeats', JSON.stringify(datesOccupied[clickedIndex])); // occupiedSeats sættes som datoer fra array datesOccupied ud fra index af den klikkede dato
    allSelected();
}))


populateUI();
updateSelectedCount();
calculatePrice();
occupySeats();
allSelected();
setMovieInfo();


function occupySeats() {
    let occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeats'));

    if (occupiedSeats) {
        occupiedSeats.forEach(elm => seats[elm].classList.add('occupied'));
    }
}

function setMovieInfo() {
    let selectedMovieArray = JSON.parse(sessionStorage.getItem('newArray'));

    document.querySelector('#order h1').innerHTML = `Køb billetter til ${selectedMovieArray.title} her`;
    document.querySelector('#movie-img img').src = `img/${selectedMovieArray.image}.jpg`
    document.querySelector('.screen').style.backgroundImage = `url(/img/${selectedMovieArray.image}.jpg)`;
}


document.querySelector('#buy-btn').classList.add('disable-click');

window.addEventListener('click', () => {
    let ticketsSelected = Number(quantity[0].innerHTML) + Number(quantity[1].innerHTML) + Number(quantity[2].innerHTML);
    let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if (selectedSeats !== null && selectedSeats.length == ticketsSelected) {
        document.querySelector('#buy-btn').classList.remove('disable-click');
    } else {
        document.querySelector('#buy-btn').classList.add('disable-click');
    }
})


document.querySelector('#buy-btn').addEventListener('click', () => {
    document.querySelector('#order-container').classList.remove('middle')
    document.querySelector('#order-container').classList.add('hide-left')

    document.querySelector('#order-info').classList.remove('hide-right')
    document.querySelector('#order-info').classList.add('middle')

    setOrder();
})

document.querySelector('#tilbage').addEventListener('click', () => {
    document.querySelector('#order-container').classList.remove('hide-left')
    document.querySelector('#order-container').classList.add('middle')

    document.querySelector('#order-info').classList.remove('middle')
    document.querySelector('#order-info').classList.add('hide-right')
})




let selectedMovie = document.querySelector('#movie');
let date = document.querySelector('#date');
let ticketOld = document.querySelector('#ticket-old');
let ticketAdult = document.querySelector('#ticket-adult');
let ticketYoung = document.querySelector('#ticket-young');
let places = document.querySelector('#places');
let finalDiscount = document.querySelector('#discount');
let totalPrice = document.querySelector('#total-price');

function setOrder() {
    selectedMovie.innerHTML = JSON.parse(sessionStorage.getItem('newArray')).title
    date.innerHTML = document.querySelector('.active').innerHTML;
    ticketOld.innerHTML = document.querySelector('#tickets > div:nth-of-type(1) .quantity').innerHTML;
    ticketAdult.innerHTML = document.querySelector('#tickets > div:nth-of-type(2) .quantity').innerHTML;
    ticketYoung.innerHTML = document.querySelector('#tickets > div:nth-of-type(3) .quantity').innerHTML;

    places.innerHTML = '';
    let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    selectedSeats.forEach(number => {
        if (Array.from(selectedSeats).indexOf(number) + 1 == selectedSeats.length) {
            places.innerHTML += number;
        } else if (Array.from(selectedSeats).indexOf(number) + 1 == selectedSeats.length - 1) {
            places.innerHTML += number + ' & ';
        } else {
            places.innerHTML += number + ', ';
        }
    })

    if (seniorDiscount == true) {
        finalDiscount.innerHTML = '100%';
    } else if (seniorDiscount == false) {
        finalDiscount.innerHTML = 100 - discount * 100 + '%';
    }

    totalPrice.innerHTML = total.innerHTML;
}



window.addEventListener('load', () => {
    document.querySelector('#order > div').style.height = document.querySelector('#order-container').clientHeight + 'px';
    localStorage.removeItem('selectedSeats');
    document.querySelectorAll('.row .seat.selected').forEach(seat => {
        seat.classList.remove('selected')
    })
    document.querySelectorAll('.row .seat').forEach(seat => {
        seat.classList.remove('occupied')
    })
    occupySeats()
})
window.addEventListener('resize', () => {
    document.querySelector('#order > div').style.height = document.querySelector('#order-container').clientHeight + 'px';
})



document.querySelector('#input-first-name').addEventListener('keyup', () => {
    document.querySelector('#name').innerHTML = document.querySelector('#input-first-name').value + ' ' + document.querySelector('#input-last-name').value;
})

document.querySelector('#input-last-name').addEventListener('keyup', () => {
    document.querySelector('#name').innerHTML = document.querySelector('#input-first-name').value + ' ' + document.querySelector('#input-last-name').value;
})

document.querySelector('#email-address').addEventListener('keyup', () => {
    document.querySelector('#display-email').innerHTML = document.querySelector('#email-address').value;
})

document.querySelector('#input-phone').addEventListener('keyup', () => {
    document.querySelector('#phone').innerHTML = document.querySelector('#input-phone').value;
})