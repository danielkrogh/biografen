
const sliderContainer = document.querySelector('.sliderContainer')
const drama = document.querySelector('.drama')
const action = document.querySelector('.action')
const børn = document.querySelector('.børn')
const orderBtn = document.querySelector('.orderBtn')
const pickBio = document.querySelector('.input-bio')

//const portal = document.querySelector('.portal')


// Run first array => arrType(arr = images)
// hide first Btn
arrType()
/* action.style.backgroundColor = '#fff'
drama.style.backgroundColor = '#fff'
børn.style.backgroundColor = '#fff' */

action.addEventListener('click', () => {
    // Remove btn after click
    /* drama.style.backgroundColor = '#fff'
    action.style.backgroundColor = '#44a5bb'
    børn.style.backgroundColor = '#fff' */
    removeContainerChildren()
    arrType(arrAction, input)
    })
drama.addEventListener('click', () => {
    // Remove btn after click
   /* action.style.backgroundColor = '#fff'
   drama.style.backgroundColor = '#44a5bb'
   børn.style.backgroundColor = '#fff' */
   removeContainerChildren()
   arrType(arrDrama, input)
    })
børn.addEventListener('click', () => {
    // Remove btn after click
   /* action.style.backgroundColor = '#fff'
   drama.style.backgroundColor = '#fff'
   børn.style.backgroundColor = '#44a5bb' */
   removeContainerChildren()
   arrType(arrBørn, input)
    })

function removeContainerChildren() {
    document.querySelector('.productContainer')
    // Dom elementet container children slettet inden nu array bliver kaldt.
    // tager længden af children container indeholder(childNodes), hvorefter
    // antalt children(array items containere) fjernes
    for (let i = 0; i < sliderContainer.childNodes.length; i) {
        document.querySelector('.productContainer').remove()
    }
}

/*!!!!!!!!!!!!!!!!!!!!!!!! */
/*MAKE A HTML + arr loop => wrap a around => link to single page*/
/*!!!!!!!!!!!!!!!!!!!!!!!! */
let input = pickBio.value;
console.log(input)
arrType(arrAction, input)
// function call when arrFirst or arrLast event btn,
// arr bestemes af hvilken btn der trykkes
function arrType(arr = arrAction, input) {
    
    // filter method => create new array without editing the previous array 
    const filt = arr.filter(function(newArr){
        if (newArr.bio == input) {
            return newArr.bio
        }
    })
    console.log(filt)
    if(input == 0) { 
    for (element of arr) {
            test()
        }
    }else {
        for (element of filt) {
            test()
        }
    }
    
    function test() {
        /* create elements and add classes*/
        let productContainer = document.createElement('div')
        productContainer.classList.add('productContainer')
    
        let orderBtn = document.createElement('button');
        orderBtn.classList.add('orderBtn');
        // set id as array id
        // loops over.. 1 2 3 
        orderBtn.setAttribute('id',`${element.id}`)
        // get id and parse it to an int/number
        let btnId = parseInt(orderBtn.id)
    
        // orderBtn click => 
        // declare newArray and set it to the array with the same index as the btn
        orderBtn.onclick = function() { 
            console.log(btnId) // 
            console.log(arr[btnId])
            let newArray = arr[btnId]
            sessionStorage.setItem('newArray', JSON.stringify(newArray));
        };
    
        
    
        let anchor = document.createElement('a');
        anchor.classList.add('anchor')
        anchor.setAttribute('href', 'valgtfilm.html')
        anchor.innerHTML = 'Køb billet';
        let card = document.createElement('div')
        card.classList.add('card')
        
        /* Images array src => DOM */
        let img = document.createElement("img");
        img.classList.add('img')
        img.setAttribute("alt", element.alt)
        img.src = `img/${element.image}.jpg`
        /* Append elements to each other and finally to the container*/
        
        
        productContainer.appendChild(card)
        card.appendChild(img)
        orderBtn.appendChild(anchor)
        card.appendChild(orderBtn)
        sliderContainer.appendChild(productContainer)
}
}


