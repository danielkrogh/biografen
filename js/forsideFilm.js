
const movieContainer = document.querySelector('.movie-container')
const orderBtn = document.querySelector('.orderBtn') 

arrType(arr = arrForside, input = "0")

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


