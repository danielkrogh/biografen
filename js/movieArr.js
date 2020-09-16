let aarAction = [
    { 
        image: "Poster-Citizenfour",
        time: "136",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    },
    {   
        image: "Poster-Trash",
        time: "116",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    },
    { 
        image: "Poster-Riot",
        time: "140",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    },
    { 
        image: "Poster-Citizenfour",
        time: "136",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    },
    {   
        image: "Poster-Trash",
        time: "116",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    },
    { 
        image: "Poster-Riot",
        time: "140",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    },
    { 
        image: "Poster-Citizenfour",
        time: "136",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    },
    {   
        image: "Poster-Trash",
        time: "116",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    },
    { 
        image: "Poster-Riot",
        time: "140",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    }
]
let arrDrama = [
    { 
        image: "Poster-Riot",
        time: "140",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias.",
        længde: '136'
    },
    { 
        image: "Poster-Riot",
        time: "140",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    },
    { 
        image: "Poster-Riot",
        time: "140",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    },
    { 
        image: "Poster-Riot",
        time: "140",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    },
    { 
        image: "Poster-Riot",
        time: "140",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    },
]
let arrBørn = [
    {   
        image: 'Poster-Trash',
        time: '116',
        bio: '1',
        cate: 'børn',
        desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias.' 
    },
    {   
        image: "Poster-Trash",
        time: "116",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    },
    {   
        image: "Poster-Trash",
        time: "116",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    },
    {   
        image: "Poster-Trash",
        time: "116",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    },
    {   
        image: "Poster-Trash",
        time: "116",
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, voluptatem ut? Officia et quidem alias." 
    }
];
const sliderContainer = document.querySelector('.sliderContainer')
const previous = document.querySelector('.previous')
const next = document.querySelector('.next')
const drama = document.querySelector('.drama')
const action = document.querySelector('.action')
const børn = document.querySelector('.børn')

// Run first array => arrType(arr = images)
// hide first Btn
arrType()
action.style.backgroundColor = '#fff'
drama.style.backgroundColor = '#fff'
børn.style.backgroundColor = '#fff'

action.addEventListener('click', () => {
    // Remove btn after click
    drama.style.backgroundColor = '#fff'
    action.style.backgroundColor = '#44a5bb'
    børn.style.backgroundColor = '#fff'
    removeContainerChildren()
    arrType(aarAction)
})
drama.addEventListener('click', () => {
    // Remove btn after click
   action.style.backgroundColor = '#fff'
   drama.style.backgroundColor = '#44a5bb'
   børn.style.backgroundColor = '#fff'
   removeContainerChildren()
   arrType(arrDrama)
})
børn.addEventListener('click', () => {
    // Remove btn after click
   action.style.backgroundColor = '#fff'
   drama.style.backgroundColor = '#fff'
   børn.style.backgroundColor = '#44a5bb'
   removeContainerChildren()
   arrType(arrBørn)
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
// function call when arrFirst or arrLast event btn,
// arr bestemes af hvilken btn der trykkes
function arrType(arr = aarAction) {
    for (element of arr) {
        /* create elements and add classes*/
    let productContainer = document.createElement('div')
    productContainer.classList.add('productContainer')
    let card = document.createElement('div')
    card.classList.add('card')
    let product = document.createElement("div")
    product.classList.add('product')
    let text = document.createElement("div")
    text.classList.add('text')
    /* array name/desc => DOM */
    let name = document.createElement("h3")
    name.innerHTML = `${element.image}`;
    let time = document.createElement("h4")
    time.innerHTML = `${element.time}min`;
    let desc = document.createElement("p")
    desc.innerHTML = element.desc;
    
    /* Images array src => DOM */
    let img = document.createElement("img");
    img.classList.add('img')
    img.setAttribute("alt", element.alt)
    img.src = `img/${element.image}.jpg`
    /* Append elements to each other and finally to the container*/
    productContainer.appendChild(card)
    card.appendChild(product)
    product.appendChild(img)
    card.appendChild(text)
    text.appendChild(name)
    text.appendChild(time)
    text.appendChild(desc)
    sliderContainer.appendChild(productContainer)
    }
}