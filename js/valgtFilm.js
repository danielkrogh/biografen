const poster = document.querySelector('.poster');
const desc = document.querySelector('.post-desc');
const trailerTitle = document.querySelector('.trailer-title');
const video = document.querySelector('.video-source');
const postTitle = document.querySelector('.post-title');
newArray = JSON.parse(sessionStorage.getItem('newArray'));

function movieDesc(arr) {
        poster.src = `img/${arr.image}.jpg`;
        // ALT TAG
        //Description
        desc.innerHTML = arr.desc;
        postTitle.innerHTML = arr.image.slice(7);
        // Trailer
        video.src = `mov/${arr.trailer}`;
        console.log(arr.image)
        if(arr.image.slice(7) == "Trash") {
                postTitle.style.color = "yellow"
        }
        function myFunction(x) {
                if (x.matches) { // If media query matches
                document.querySelector('.overlay').style.backgroundImage = `url("img/${arr.image}.jpg")`;
                } else {
                        document.querySelector('.overlay').style.backgroundImage = `url("")`;
                }
              }
              
              var x = window.matchMedia("(max-width: 900px)")
              myFunction(x) // Call listener function at run time
              x.addListener(myFunction)
}

movieDesc(newArray);


document.querySelector('#senior').addEventListener('click', () => { // Klik på button med id senior sætter seniorDiscount = true
        sessionStorage.setItem('seniorDiscount', true);
})

document.querySelector('#reg').addEventListener('click', () => { // Klik på button med id reg sætter seniorDiscount = false
        sessionStorage.setItem('seniorDiscount', false);
})