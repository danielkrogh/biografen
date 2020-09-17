const poster = document.querySelector('.poster');
const desc = document.querySelector('.post-desc');
const video = document.querySelector('.video-source')
const postTitle = document.querySelector('.post-title')
newArray = JSON.parse(sessionStorage.getItem('newArray'))
console.log(newArray)

function movieDesc(arr) {
        poster.src = `img/${arr.image}.jpg`;
        // ALT TAG
        //Description
        desc.innerHTML = arr.desc;
        postTitle.innerHTML = arr.image;
        // Trailer
        video.src = `mov/${arr.trailer}`;
        console.log(arr)
}

movieDesc(newArray)