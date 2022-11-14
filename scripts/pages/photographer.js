//Mettre le code JavaScript lié à la page photographer.html


let url = document.URL;
let photographerPath = new URL(url);
if(photographerPath.searchParams.has('id')){
let photographerID = photographerPath.searchParams.get('id');
let isSelectedOption = false


    async function getPhotographerInfoAndMedia(){

        const response = await fetch('../../data/photographers.json');

        const data = await response.json();
     
        //data on photographers
        const photographers = data.photographers
     
        //////data on THE PHOTOGRAPHER
        const photographer = photographers.filter(p => p.id == photographerID)[0];

        //data on  MEDIAS
        const medias = data.media;
        /////// data on THE MEDIAS
       
        let photographerMedia = medias.filter(m => m.photographerId == photographerID)

        ////
        return({
            photographer, photographerMedia
        })

    }

    async function displayPhotographerInfo(photographer) {

   


        const photographHeader = document.querySelector('.photograph-header');
        let headerChildrenArray = Array.from(photographHeader.childNodes);


       const photographModel = photographerFactory(photographer);
       const {photographerInfoArticle, photographerPhotoArticle } = photographModel.getPhotographerInfo();
       const contactButton = document.querySelector('.contact_button');
       const photographerContactArticle = document.createElement('article');
       photographerContactArticle.classList.add('contact-article')
       photographHeader.innerHTML = '';
        
       photographerContactArticle.append(contactButton);
       //appending
       photographHeader.appendChild(photographerInfoArticle);
       photographHeader.appendChild(photographerContactArticle);
       photographHeader.appendChild(photographerPhotoArticle);

       


       
    };

    async function displayContactModal(photographer){
        const modalDiv = document.querySelector('.modal');
        const contactHeader = modalDiv.firstChild.nextSibling.firstChild.nextSibling  
        contactHeader.innerHTML += '<br/>' + photographer.name; 
    }

    async function displaySortingMenu(photographerMedia, photographer){

        const sortingSection = document.querySelector('.sorting-section');
        const newLabel = document.createElement('label');
        newLabel.for = 'sorting-choice';
        newLabel.innerHTML = '<b>'+'Trier par '+'</b>';
        const newSelect = document.createElement('select');
        newSelect.labelledby = "Order by";
        newSelect.id = "sorting-choice";
        const popularityOption = document.createElement('option');
        popularityOption.value = "popularity";
        popularityOption.innerText = "Popularité";
        popularityOption.setAttribute('selected', true);
        console.log('get 1',  popularityOption.getAttribute('selected'));
        
        //making sure that at the very beginning the selected option which is popularity produces a proper sorting
        if (popularityOption.getAttribute('selected')){
     
            const popularitySortedMedia = photographerMedia.sort((a,b) => {
                return a.likes - b.likes;
            });
            const mediaSection = document.querySelector(".media-section");
            mediaSection.innerHTML = "";
            displayMedia(popularitySortedMedia, photographer); 
            isSelectedOption = true

        }
        const dateOption = document.createElement('option');
        dateOption.value = "date";

        dateOption.innerText = "Date";
        const titleOption = document.createElement('option');
        titleOption.value = "title";
        titleOption.innerText = "Titre";

        //placing a listener on the change event to know what option the user took on sorting media 
        newSelect.addEventListener('change', (e)=> {

            let sortedMedia = []

            //sorting by date
            if(e.target.value === "date"){
           
                const dateSortedMedia = photographerMedia.sort((a,b) => {
                    
                    let stringYearA = a.date.split('-')[0];
                    let stringMonthA = a.date.split('-')[1];
                    let stringDayA = a.date.split('-')[2];

                    let intYearA = parseInt(stringYearA, 10);
                    let intMonthA = parseInt(stringMonthA, 10);
                    let intDayA= parseInt(stringDayA, 10);

                    let stringYearB = b.date.split('-')[0];
                    let stringMonthB = b.date.split('-')[1];
                    let stringDayB = b.date.split('-')[2];
              
                    let intYearB = parseInt(stringYearB, 10);
                    let intMonthB = parseInt(stringMonthB, 10);
                    let intDayB = parseInt(stringDayB, 10);
                    
                    if(intYearA !== intYearB){
                        return intYearA - intYearB;
                    }
                    else {
                        if(intMonthA !== intMonthB){
                            return intMonthA - intMonthB;
                        }
                        else {
                            return intDayA - intDayB;
                        }

                    }

                })

  
                sortedMedia = dateSortedMedia;
            }
            //sorting by popularity
            if(e.target.value === "popularity"){
                const popularitySortedMedia = photographerMedia.sort((a,b) => {
                    return a.likes - b.likes
                })
                sortedMedia = popularitySortedMedia;
            }
            //sorting by title
            if(e.target.value === "title"){
                const titleSortedMedia = photographerMedia.sort(
                    (a, b) => a.title.localeCompare(b.title)
                )
            
                sortedMedia = titleSortedMedia;
            }
            const mediaSection = document.querySelector(".media-section");
            mediaSection.innerHTML = "";
            displayMedia(sortedMedia, photographer);   
        })


        newSelect.appendChild(popularityOption);
        newSelect.appendChild(dateOption);
        newSelect.appendChild(titleOption);


        sortingSection.appendChild(newLabel);
        sortingSection.appendChild(newSelect);
    }

    async function displayPriceLikeBanner(photographerMedia, photographer){
        let totalLikes = 0;
        photographerMedia.forEach((media) => {
            totalLikes += media.likes
        })


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
            const mediaModel = mediaFactory(photographerMedia,media, photographer);
            const mediaCardDOM = mediaModel.getMediaCardDOM();
            mediaSection.appendChild(mediaCardDOM);
        });
    };

    async function init(){

        const { photographer, photographerMedia } = await getPhotographerInfoAndMedia();
        displayPriceLikeBanner(photographerMedia, photographer);
        displayContactModal(photographer);
        displaySortingMenu(photographerMedia, photographer)
        if(!isSelectedOption){
            displayMedia(photographerMedia, photographer);    
        }
        displayPhotographerInfo(photographer);
               
        
    }

    init();
  
        

  
 
        

}