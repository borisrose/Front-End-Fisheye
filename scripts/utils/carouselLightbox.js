
async function displayLightBox(photographerMedia, media, author){
    const carouselModal = document.querySelector('#carousel_modal');
    carouselModal.setAttribute('role', 'dialog');
    const mediaDiv = document.querySelector('.carousel-media-div');
    const rightArrow = document.querySelector('.fa-arrow-right')
    const leftArrow = document.querySelector('.fa-arrow-left');
    const lastIndex = photographerMedia.length - 1;
    authorFirstname = author.name.split(' ')[0];
    if(Array.from(authorFirstname).find(l => l === '-')){
        authorFirstname = authorFirstname.split('-').join(' ');
    }
    const picture = `assets/${authorFirstname}/${media.image}`;
    function urlPath(sufix){
        let prefix = picture.split('/');
        let url = prefix[0]+"/"+prefix[1]+"/"+sufix;
        return url ;
    }
   
   
  


    //statements
    carouselModal.style.display = "flex";

   
    //creations 
    const imageMediaDiv = document.createElement('div'); 
    imageMediaDiv.classList.add('image-media-div');
    console.log('media', media);


    if(media.image){

        const image = document.createElement('img');
        image.setAttribute('src', picture);
        imageMediaDiv.append(image);
        image.classList.add('img-slide');
    }
    else {
      
        const video = document.createElement('video');
        let videoSrc = `assets/${authorFirstname}/${media.video}`;
        video.setAttribute('src', videoSrc);
        imageMediaDiv.append(video);
        video.classList.add('video-slide');
    }


    const infoMediaDiv = document.createElement('div');
    infoMediaDiv.classList.add('info-media-div');
    infoMediaDiv.innerHTML = '<p>'+media.title+'</p>';



    //append
   
    mediaDiv.appendChild(imageMediaDiv);
    mediaDiv.appendChild(infoMediaDiv)



    //events
    let currentIndex = photographerMedia.findIndex(m => m.id === media.id);

    function arrowCallBack(direction, currentIndex, media, medias) {

        const imageMediaDiv = document.querySelector('.image-media-div');
        const infoMediaDiv = document.querySelector('.info-media-div')
        const elementType = media.image ? document.querySelector('.img-slide') : document.querySelector('.video-slide');

        function resetInnerHTML(currentType, newType, src, text){


            if(newType === currentType){
                elementType.removeAttribute('src');
                elementType.setAttribute('src', urlPath(src));
            }

            if(newType !== currentType){

                imageMediaDiv.innerHTML = "";
                let newElement = document.createElement(newType);
                if(newType === 'img'){
                    newElement.classList.add('img-slide');
                }
                else {
                    newElement.classList.add('video-slide');
                }
                newElement.setAttribute('src', urlPath(src));

                imageMediaDiv.appendChild(newElement);
        
            }
            
            infoMediaDiv.innerHTML = '<p>'+text+'</p>';
      


        }
      
        function updateClickIndex(newCurrentIndex){
           
            leftArrow.onclick = function(){arrowCallBack('left', newCurrentIndex, medias[newCurrentIndex], medias)};
            rightArrow.onclick = function(){arrowCallBack('right', newCurrentIndex, medias[newCurrentIndex], medias)};
        }

        if(direction === 'left'){

            if(currentIndex === 0){

                if(media.image){

                    if(medias[lastIndex].image){
                        resetInnerHTML('img','img',medias[lastIndex].image, medias[lastIndex].title);
                    }
                    else  {
                        resetInnerHTML('img','video',medias[lastIndex].video, medias[lastIndex].title);
                    }

                }

                if(media.video){

                    if(medias[lastIndex].video){
                        resetInnerHTML('video','video',medias[lastIndex].video, medias[lastIndex].title);
                    }
                    else  {
                        resetInnerHTML('video','img',medias[lastIndex].image, medias[lastIndex].title);
                    }


                }

                updateClickIndex(lastIndex);

            }
            else {

                let previousIndex = --currentIndex;
                if(media.image){

                    if(medias[previousIndex].image){
                       
                        console.log('medias[previousIndex].image =====>',medias[previousIndex].image);
                   
                       
                        console.log('medias[previousIndex].title =====>',medias[previousIndex].title)

                        resetInnerHTML('img','img',medias[previousIndex].image, medias[previousIndex].title);
                    }
                    else  {
                        resetInnerHTML('img','video',medias[previousIndex].video, medias[previousIndex].title);
                    }

                }

                if(media.video){

                    if(medias[previousIndex].video){
                        resetInnerHTML('video','video',medias[previousIndex].video, medias[previousIndex].title);
                    }
                    else  {
                        resetInnerHTML('video','img',medias[previousIndex].image, medias[previousIndex].title);
                    }


                }

                updateClickIndex(previousIndex);


            }



        }

        if(direction === 'right'){

            if(currentIndex === lastIndex){

                if(media.image){

                    if(medias[0].image){
                        resetInnerHTML('img','img',medias[0].image, medias[0].title);
                    }
                    else  {
                        resetInnerHTML('img','video',medias[0].video, medias[0].title);
                    }

                }

                if(media.video){

                    if(medias[0].video){
                        resetInnerHTML('video','video',medias[0].video, medias[0].title);
                    }
                    else  {
                        resetInnerHTML('video','img',medias[0].image, medias[0].title);
                    }


                }

                updateClickIndex(0);
            }
            else {

                let nextIndex = ++currentIndex;
                if(media.image){

                    if(medias[nextIndex].image){
                        resetInnerHTML('img','img',medias[nextIndex].image, medias[nextIndex].title);
                    }
                    else  {
                        resetInnerHTML('img','video',medias[nextIndex].video, medias[nextIndex].title);
                    }

                }

                if(media.video){

                    if(medias[nextIndex].video){
                        resetInnerHTML('video','video',medias[nextIndex].video, medias[nextIndex].title);
                    }
                    else  {
                        resetInnerHTML('video','img',medias[nextIndex].image, medias[nextIndex].title);
                    }


                }


                updateClickIndex(nextIndex);
            }

        }
       


    }

     
    leftArrow.onclick = function(){arrowCallBack('left', currentIndex, media, photographerMedia)};

    rightArrow.onclick = function(){arrowCallBack('right', currentIndex, media, photographerMedia)};
    





}

function closeLightBox() {
    const modal = document.getElementById("carousel_modal");
    modal.style.display = "none";
    const mediaDiv = document.querySelector('.carousel-media-div');
    mediaDiv.innerHTML = "";
    const rightArrow = document.querySelector('.fa-arrow-right');
    const leftArrow = document.querySelector('.fa-arrow-left');
    leftArrow.removeEventListener('click', function(){arrowCallBack('left', currentIndex, media, photographerMedia)});
    rightArrow.removeEventListener('click', function(){arrowCallBack('right', currentIndex, media, photographerMedia)});

   
}
