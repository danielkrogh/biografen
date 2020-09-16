const poster = document.querySelector('.poster');
const desc = document.querySelector('.post-desc');
const poster = document.querySelector('.poster');

newArray = JSON.parse(sessionStorage.getItem('newArray'))


function movieDesc(arr) {
        poster.src = `img/${arr.image}.jpg`;
        // ALT TAG

        desc.innerHTML = arr.desc;
        DataTransferItemList.innerHTML = element.image;
        console.log(arr)
        console.log(element)
}

movieDesc(newArray)