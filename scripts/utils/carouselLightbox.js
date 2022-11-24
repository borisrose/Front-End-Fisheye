document.addEventListener('DOMContentLoaded', ()=> {

    const carouselModal = document.querySelector('#carousel_modal');
    document.addEventListener('keydown', e=> {

        if(carouselModal.getAttribute('aria-hidden') == 'false' && e.code == 'Escape'){

       
            closeLightBox()
        }
    })

})



function closeLightBox() {
    const carouselModal = document.getElementById("carousel_modal");
 
    const main = document.getElementById('main');

    //handling accessibility issues
    carouselModal.setAttribute('aria-hidden', true);
    main.setAttribute('aria-hidden', false);


    carouselModal.style.display = "none";
    const mediaDiv = document.querySelector('.carousel-media-div');
    mediaDiv.innerHTML = "";
    const rightArrow = document.querySelector('.fa-arrow-right');
    const leftArrow = document.querySelector('.fa-arrow-left');
    leftArrow.onclick="";
    rightArrow.onclick="";

   
}





async function displayLightBox(photographerMedia, media, author){

    let updatedListener = false

    const carouselModal = document.querySelector('#carousel_modal');
  
    const main = document.getElementById('main');

    //handling accessibility issues
    carouselModal.setAttribute('aria-hidden', false);
    main.setAttribute('aria-hidden', true);
    carouselModal.setAttribute('role', 'dialog');
    carouselModal.setAttribute('aria-label', 'image closeup view');


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
        image.setAttribute('alt', media.title)
        imageMediaDiv.append(image);
        image.classList.add('img-slide');
        image.setAttribute("aria-labelledby", 'description')
        image.setAttribute("aria-describedby", 'description')
    
    }
    else {
      
        const video = document.createElement('video');
        let videoSrc = `assets/${authorFirstname}/${media.video}`;
        video.setAttribute('src', videoSrc);
        video.setAttribute('controls','');
        imageMediaDiv.append(video);
        video.classList.add('video-slide');
        video.setAttribute("aria-labelledby", 'description')
        video.setAttribute("aria-describedby", 'description')
    }


    const infoMediaDiv = document.createElement('div');
    infoMediaDiv.classList.add('info-media-div');
    infoMediaDiv.innerHTML = "<p id='description'>"+media.title+"</p>";



    //append
   
    mediaDiv.appendChild(imageMediaDiv);
    mediaDiv.appendChild(infoMediaDiv)



    //events
    let currentIndex = photographerMedia.findIndex(m => m.id === media.id);

    function arrowCallBack(direction, currentIndex, media, medias) {

        pressed = true
        const imageMediaDiv = document.querySelector('.image-media-div');
        const infoMediaDiv = document.querySelector('.info-media-div')
        const elementType = media.image ? document.querySelector('.img-slide') : document.querySelector('.video-slide');

        function resetInnerHTML(currentType, newType, src, text){


            if(newType === currentType){
                elementType.setAttribute('src', urlPath(src));

                if(newType === 'img'){
                    elementType.setAttribute('alt', text)
                }
            }

            

            if(newType !== currentType){

                imageMediaDiv.innerHTML = "";
                let newElement = document.createElement(newType);
                if(newType === 'img'){
                    newElement.classList.add('img-slide');
                    newElement.setAttribute('alt', text)
                }
                else {
                    newElement.classList.add('video-slide');
                    newElement.setAttribute('controls','');
                }
                newElement.setAttribute("aria-describedby", 'description')
                newElement.setAttribute("aria-labelledby", 'description')
                newElement.setAttribute('src', urlPath(src));

                imageMediaDiv.appendChild(newElement);
        
            }
            
            infoMediaDiv.innerHTML = "<p id='description'>"+text+"</p>";
      


        }
      
        function updateClickIndex(newCurrentIndex){
           
            leftArrow.onclick = function(){arrowCallBack('left', newCurrentIndex, medias[newCurrentIndex], medias)};
            rightArrow.onclick = function(){arrowCallBack('right', newCurrentIndex, medias[newCurrentIndex], medias)};

            //update keydown
            document.onkeydown = function(e){ e.code === 'ArrowLeft' ? arrowCallBack('left', newCurrentIndex, medias[newCurrentIndex], medias ) 
                                                             : e.code === 'ArrowRight' ? arrowCallBack('right', newCurrentIndex, medias[newCurrentIndex], medias) 
                                                             : '' }



    
 

            

           

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
    

    document.onkeydown = function(e){ e.code === 'ArrowLeft' ? arrowCallBack('left', currentIndex, media, photographerMedia) 
                                                             : e.code === 'ArrowRight' ? arrowCallBack('right', currentIndex, media, photographerMedia) 
                                                             : '' }



    
 
       


    
   


        
  
    
    
    


}


