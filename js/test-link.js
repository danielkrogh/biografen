/*
    Knap der tilføjer data til local storage udfra html attribut data-title
*/
let buyBtn = document.querySelectorAll('.buy');
let occupiedTrash = [20, 21, 39, 40]; // Optagede pladser til filmen 'Trash'
let occupiedRiot = [16, 17, 18, 19, 42, 43, 44, 45]; // Optagede pladser til filmen 'Riot'

buyBtn.forEach(elm => elm.addEventListener('click', () => {
    localStorage.setItem('movieTitle', event.target.dataset.title); // Filmes titel føjes til local storage
    if (event.target.dataset.title == 'trash') { // Hvis filems titel er trash tilføjes optagede pladser til filmen 'Trash' til local storage
        localStorage.setItem('occupiedSeats', JSON.stringify(occupiedTrash));
    } else if (event.target.dataset.title == 'riot') { // Hvis filems titel er riot tilføjes optagede pladser til filmen 'Riot' til local storage
        localStorage.setItem('occupiedSeats', JSON.stringify(occupiedRiot));
    }
}))