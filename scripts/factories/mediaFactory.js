function mediaFactory(media, author) {
    console.log('data', media);
    console.log('on entre dans la fonction mediaFactory');
    authorFirstname = author.name.split(' ')[0];
    if(Array.from(authorFirstname).find(l => l === '-')){
        authorFirstname = authorFirstname.split('-').join(' ');
    }

    console.log(authorFirstname);

    const totalLikes = document.querySelector('.totalLikes')
    console.log('totalLikes', totalLikes);

    function modifyNumberLikes(e){
     
        if(Array.from(e.target.classList).find(e => e === 'added-like')){
      
            e.target.classList.remove('added-like');
            media.likes--;
            console.log('VALUE',totalLikes.innerText)
            totalLikes.innerText--;
           
        }
        else {
            e.target.classList.add('added-like');
            media.likes++;
            console.log('VALUE',totalLikes.innerText)
            totalLikes.innerText++;
           
        }
        let parentDiv = e.target.closest('div');
        let parentChildren= Array.from(parentDiv.childNodes);
     
        let spanToModify = parentChildren[0];
        spanToModify.innerText = media.likes;
    }


    function getMediaCardDOM() {

        const mediaArticle = document.createElement('article');
        mediaArticle.classList.add('media-article')
        //
        if(media.image){
            const mediaArticleImgDiv = document.createElement('div');
            mediaArticleImgDiv.classList.add('media-article-img-div');
            const mediaArticleImg = document.createElement('img');
            mediaArticleImg.classList.add('media-article-img');
            mediaArticleImg.src = `assets/${authorFirstname}/${media.image}`;


            mediaArticle.appendChild(mediaArticleImgDiv);
            mediaArticleImgDiv.appendChild(mediaArticleImg);

        }
        else {
            const mediaArticleVideoDiv = document.createElement('div');
            mediaArticleVideoDiv.classList.add('media-article-video-div');
            const mediaArticleVideo = document.createElement('video');
            mediaArticleVideo.classList.add('media-article-video');
            mediaArticleVideo.src = `assets/${authorFirstname}/${media.video}`;

            mediaArticle.appendChild(mediaArticleVideoDiv);
            mediaArticleVideoDiv.appendChild(mediaArticleVideo);
        }
       
        //
        const mediaArticleInfoDiv= document.createElement('div');
        mediaArticleInfoDiv.classList.add('media-article-info-div');

        const imgOrVideoNamePara = document.createElement('p');
        imgOrVideoNamePara.classList.add('img-video-name-para');
        imgOrVideoNamePara.innerText = media.title;


        const heartDiv = document.createElement('div');
        heartDiv.classList.add('heart-div');
        const numberLikesSpan = document.createElement('span');
        numberLikesSpan.innerText = media.likes;
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fas', 'fa-heart');
        heartIcon.addEventListener('click', function(e) {modifyNumberLikes(e)})






       

        //appending
       
        
        mediaArticleInfoDiv.appendChild(imgOrVideoNamePara);
        mediaArticleInfoDiv.appendChild(heartDiv);
        heartDiv.appendChild(numberLikesSpan)
        heartDiv.appendChild(heartIcon);
        mediaArticle.appendChild(mediaArticleInfoDiv);


        

        return (mediaArticle);
    }
    

    return {getMediaCardDOM }
}