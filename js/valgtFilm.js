const poster = document.querySelector('.poster');
const desc = document.querySelector('.post-desc');
const video = document.querySelector('.video-source');
const postTitle = document.querySelector('.post-title');
newArray = JSON.parse(sessionStorage.getItem('newArray'));

function movieDesc(arr) {
        poster.src = `img/${arr.image}.jpg`;
        // ALT TAG
        //Description
        desc.innerHTML = arr.desc;
        postTitle.innerHTML = arr.image;
        // Trailer
        video.src = `mov/${arr.trailer}`;
}

movieDesc(newArray);


document.querySelector('#senior').addEventListener('click', () => { // Klik på button med id senior sætter seniorDiscount = true
        sessionStorage.setItem('seniorDiscount', true);
})

document.querySelector('#reg').addEventListener('click', () => { // Klik på button med id reg sætter seniorDiscount = false
        sessionStorage.setItem('seniorDiscount', false);
})