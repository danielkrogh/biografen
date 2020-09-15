let minus = document.querySelectorAll('.minus');
let plus = document.querySelectorAll('.plus');
let quantity = document.querySelectorAll('.quantity');

const priceOld = 70;
const priceAdult = 85;
const priceYoung = 65;

let total = document.querySelector('#price .total');

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
    total.innerHTML = quantity[0].innerHTML * priceOld + quantity[1].innerHTML * priceAdult + quantity[2].innerHTML * priceYoung;
}