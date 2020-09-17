/*
    Knap der tilføjer data til local storage udfra html attribut data-title
*/
let buyBtn = document.querySelectorAll('.buy');
let occupiedDruk = [20, 21, 39, 40]; // Optagede pladser til filmen 'Druk'
let occupiedAntebellum = [16, 17, 18, 19, 42, 43, 44, 45]; // Optagede pladser til filmen 'Antebellum'

buyBtn.forEach(elm => elm.addEventListener('click', () => {
    localStorage.setItem('movieTitle', event.target.dataset.title); // Filmes titel føjes til local storage
    if (event.target.dataset.title == 'druk') { // Hvis filems titel er druk tilføjes optagede pladser til filmen 'Druk' til local storage
        localStorage.setItem('occupiedSeats', JSON.stringify(occupiedDruk));
    } else if (event.target.dataset.title == 'antebellum') { // Hvis filems titel er antebellum tilføjes optagede pladser til filmen 'Antebellum' til local storage
        localStorage.setItem('occupiedSeats', JSON.stringify(occupiedAntebellum));
    }
}))