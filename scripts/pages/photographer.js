//Mettre le code JavaScript lié à la page photographer.html


let url = document.URL;
let photographerPath = new URL(url);
if(photographerPath.searchParams.has('id')){

    let photographerID = photographerPath.searchParams.get('id');
    console.log('photographerID', photographerID);


    async function getPhotographerInfoAndMedia(){

        const response = await fetch('../../data/photographers.json');

        const data = await response.json();
        console.log('data', data);
        //data on photographers
        const photographers = data.photographers
        console.log(photographers);
        //////data on THE PHOTOGRAPHER
        const photographer = photographers.filter(p => p.id == photographerID)[0];
        console.log('photographer', photographer);
        //data on  MEDIAS
        const medias = data.media;
        /////// data on THE MEDIAS
        console.log('medias', medias)
        let photographerMedia = medias.filter(m => m.photographerId == photographerID)
        console.log('photographerMedia', photographerMedia);
        ////
        return({
            photographer, photographerMedia
        })

    }

    async function displayPhotographerInfo(photographer) {

        console.log('into displayPhotographerInfo');


        const photographHeader = document.querySelector('.photograph-header');
        let headerChildrenArray = Array.from(photographHeader.childNodes);


       const photographModel = photographerFactory(photographer);
       const {photographerInfoArticle, photographerPhotoArticle } = photographModel.getPhotographerInfo();
       const contactButton = document.querySelector('.contact_button');

       photographHeader.innerHTML = '';

       //appending
       photographHeader.appendChild(photographerInfoArticle);
       photographHeader.appendChild(contactButton);
       photographHeader.appendChild(photographerPhotoArticle);

       


       
    };

    async function displayPriceLikeBanner(photographerMedia, photographer){
        let totalLikes = 0;
        photographerMedia.forEach((media) => {
            totalLikes += media.likes
        })

        console.log(totalLikes);

        const main = document.querySelector('#main');
        const priceLikesDiv = document.createElement('div');
        priceLikesDiv.classList.add('price-likes-div');
        const numberLikesDiv = document.createElement('div')
        const spanLikesNumber = document.createElement('span');
        spanLikesNumber.classList.add('totalLikes');
        numberLikesDiv.appendChild(spanLikesNumber);
        spanLikesNumber.innerText = totalLikes
        const iconHeart = document.createElement('i');
        iconHeart.classList.add('fas', 'fa-heart'),
        numberLikesDiv.appendChild(iconHeart);
        numberLikesDiv.classList.add('banner-likes-div');
        const priceDiv = document.createElement('div');
        priceDiv.classList.add('banner-price-div');

        priceDiv.innerHTML = String(photographer.price) + '€ /jour';

        priceLikesDiv.appendChild(numberLikesDiv);
        priceLikesDiv.appendChild(priceDiv);
        main.appendChild(priceLikesDiv);

    }
  

    async function displayMedia(photographerMedia, photographer) {
        const mediaSection = document.querySelector(".media-section");

        photographerMedia.forEach((media) => {
            const mediaModel = mediaFactory(media, photographer);
            const mediaCardDOM = mediaModel.getMediaCardDOM();
            mediaSection.appendChild(mediaCardDOM);
        });
    };

    async function init(){

        const { photographer, photographerMedia } = await getPhotographerInfoAndMedia();
        displayPriceLikeBanner(photographerMedia, photographer);
        displayMedia(photographerMedia, photographer);
    
        displayPhotographerInfo(photographer);

    }

    init();
  
        

  
 
        

}