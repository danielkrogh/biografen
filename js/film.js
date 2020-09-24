
const movieContainer = document.querySelector('.movie-container')
const alle = document.querySelector('.alle')
const drama = document.querySelector('.drama')
const action = document.querySelector('.action')
const børn = document.querySelector('.børn')
const orderBtn = document.querySelector('.orderBtn')

// Selector og dens options
const select = document.querySelector('.selector');
const option = document.querySelectorAll('option')

// Ved valg af option i selector => event click (§1) hent værdi af den valgte option og gem i variablen input
// slet tidligere elementer sådanne de ny kan komme frem uden at stå sammen med de gamle elementor (§2)
// Kør main function der kaster array ud arrType(Den valgte array, Hvilken sal/bio) (§3)
select.addEventListener('click', function() {
    let selected = document.querySelector('.selector').selectedIndex;
    input = document.querySelectorAll('option')[selected].value; //(§1)
    // (§2)
    removeContainerChildren()
    // (§3)
    arrType(arrAction, input)
    arrType(arrDrama, input)
    arrType(arrBørn, input)
});

// Dette er 3 af de fire filter knapper, ikke selector
// Ved click slettes de gamle elemetor og nye elementer med inholdet fra det nye array kastes ud
action.addEventListener('click', () => {
    removeContainerChildren()
    arrType(arrAction, input)
    })
drama.addEventListener('click', () => {
    removeContainerChildren()
    arrType(arrDrama, input)
    })
børn.addEventListener('click', () => {
    removeContainerChildren()
    arrType(arrBørn, input)
    })
alle.addEventListener('click', () => {
    removeContainerChildren()
    arrType(arrAction, "0")
    arrType(arrDrama, "0")
    arrType(arrBørn, "0")
    })
// Dette er functonen der sletter elementor
// Den tager elementor i movie-container i html og looper igennem vært child og sletter dem en efter en
// og efterlader movie-container tom igen, sådanne et nyt array objector kan blive udelt i arrType og kastes ud i html
function removeContainerChildren() {
    document.querySelector('.productContainer')
    // Dom elementet container children slettet inden ny array bliver kaldt.
    // tager længden af children container indeholder(childNodes), hvorefter
    // antalt children(array items containere) fjernes
    for (let i = 0; i < movieContainer.childNodes.length; i) {
        document.querySelector('.productContainer').remove()
    }
}


// Ved start af browser skal alle film/arrays vises, derfor kalder vi på alle arrays
// og sætter deres input/select til 0 = alle 
arrType(arrAction, "0")
arrType(arrDrama, "0")
arrType(arrBørn, "0")

// Her kalder vi igen på functionen med to fallback parametere, sådanne at den altid har 
// en værdi at falde tilbage til hvis intet er valgt
arrType(arr = arrAction, input = "0")

/*!!!!!!!!!!!!!!!!!!!!!!!! */
/* MAIN FUNC arrType() */
/*!!!!!!!!!!!!!!!!!!!!!!!! */

// arrType(p, p) er functionen der tage det valgte array og input hvor efter kaster det ud i html
// De andre functioner over denne er egentlig bare for at få denne til at fungere
// Select => til at få et input(input er den valgte option =>input(option) =  Alle(0), sal1(1), sal2(2), sal3(3))
// De tre btn => drama, action, børn, som er den valgte kategori/array = arr
// removeContainerChildren() til at slette og gøre plads til nye elementor

function arrType(arr, input) {
    
    // filter method => create new array without editing the previous array 
    // For at opdele film i de forskelige sale/bio skal de splittes fra deres nuværende array og tildeles et nyt array,
    // feks. alle film fra array de tre arrays, drama, action og børn med bio:3 bliver splittet fra deres eget array
    // og sat i et nyt array med alle film med bio:3 | Det nye array hedder filt
    const filt = arr.filter(function(newArr){
        if (newArr.bio == input) {
            return newArr.bio
        }
    })
    // her kigger vi på to ting
    // Om vi skal køre et ufiltreret arr, eller det filtreret filt
    // hvis input er 0 så vises alle film. Det betemes af den valgte Select option 
    // vi kalder også på arrType() med input på 0 ved start af browser for at visse alle film fra alle kategorier
    // arrType(arrAction, "0")
    // arrType(arrDrama, "0")
    // arrType(arrBørn, "0")

    if(input == 0) { 
    // elemetor af ufiltreret(arr) elementor sendes i createArray()    
    for (element of arr) {
            createArray()
        }
    }else {
        // elemetor af filtreret(filt) elementor sendes i createArray()    
        for (element of filt) {
            createArray()
        }
    }
    
    // bruger "data" fra objeterne af den valgte array og tildeler det til elementor der kastes ud i html
    function createArray() {
        /* create elements and add classes*/
        let productContainer = document.createElement('div')
        productContainer.classList.add('productContainer')
        
        
        let card = document.createElement('div')
        card.classList.add('card')
    
        
        /* Images array src => DOM */
        let img = document.createElement("img");
        img.classList.add('img')
        img.setAttribute("alt", element.alt)
        img.src = `img/${element.image}.jpg`
        

        /*!!!!!!!!!!!!!!!!!!!!!!!! */
        /*         JSON KNAP       */
        /*!!!!!!!!!!!!!!!!!!!!!!!! */
        let orderBtn = document.createElement('a');
        orderBtn.classList.add('orderBtn');
        orderBtn.innerHTML = 'Køb billet';
        orderBtn.setAttribute('href', 'valgtfilm.html')

        // set id as array id
        // loops over.. 1 2 3 
        // Vært film der bliver smidt ud i htmlèn har en nummer/array index
        // første film array[1], array[2] osv..
        // vær film/array[i] har også en køb billet btn med det samme nummer[i] som array index
        // det får den ved at kigge efter elemetes id og får sin eget id med det samme num
        orderBtn.setAttribute('id',`${element.id}`)
        // get id and parse it to an int/number
        let btnId = parseInt(orderBtn.id)
    
        // Her gemmes den valgte film/array i session storage
        // orderBtn click => 
        // declare newArray and set it to the array with the same index as the btn
        orderBtn.onclick = function() { 
            // newArray er det array der har den samme id som den knap som der klikkes på
            // den gemmes i storage, samtidig har knappen et link der sender en videre 
            // til valgtFilm.html, hvor indholdet bestemmes af NewArray som vi lige har declaret ved at trykke på knapen
            let newArray = arr[btnId]
            sessionStorage.setItem('newArray', JSON.stringify(newArray));
        };
        /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
        /*   se resten af forklaring på valgtFilm.js  */
        /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
        
    
        
        
        /* Append elements to each other and finally to the container*/
        productContainer.appendChild(card)
        card.appendChild(img)
        card.appendChild(orderBtn)
        movieContainer.appendChild(productContainer)
    }
}


