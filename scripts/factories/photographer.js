function photographerFactory(data) {
   
    const { name, portrait } = data;
   

    const picture = `assets/photographers/${portrait}`;




    function getPhotographerInfo(){


        //photographer info article 
        const photographerInfoArticle = document.createElement('article');
        const namePara = document.createElement('h1');
        namePara.innerText = name;
        const placePara = document.createElement('p');
        placePara.innerText =  data.city + ', '+data.country;
        const taglinePara = document.createElement('p');
        taglinePara.innerText = data.tagline;
        //photographer contact article 
     
     




        //photographer photo article 
        const photographerPhotoArticle = document.createElement('article');
        const photographerImg = document.createElement('img');

        photographerImg.setAttribute('src', picture);
        photographerImg.setAttribute('alt', '');
        //class addings
        photographerInfoArticle.classList.add('photographer-info-article');
        namePara.classList.add('name-para');
        placePara.classList.add('place-para');
        taglinePara.classList.add('tagline-para');
        photographerImg.classList.add('photographer-img');
        redimensionPhoto(photographerImg);
        photographerPhotoArticle.classList.add('photographer-photo-article');

        //appending

        //------
        photographerInfoArticle.appendChild(namePara);
        photographerInfoArticle.appendChild(placePara);
        photographerInfoArticle.appendChild(taglinePara);
        //--------
        photographerPhotoArticle.appendChild(photographerImg);
        return ({
            photographerInfoArticle,photographerPhotoArticle
        })
    }

    function redimensionPhoto(img){
        if(portrait.startsWith('Ellie')) {
       
            img.style.transform= 'scale(0.1) translateX(2%) translateY(10%)';
        }
        if(portrait.startsWith('Mimi')){
            img.style.transform= 'scale(0.09) translateX(1%) translateY(5%)';
        }
        if(portrait.startsWith('Tra')){
            img.style.transform= 'scale(0.09) translateX(4%) translateY(2%)';
        }
        if(portrait.startsWith('Nab')){
            img.style.transform= 'scale(0.08) translateX(2%) translateY(2%)';
        }
        if(portrait.startsWith('Rho')){
            img.style.transform= 'scale(0.08) translateX(2%) translateY(10%)';
        }
        if(portrait.startsWith('Mar')){
            img.style.transform= 'scale(0.08) translateX(0.6%) translateY(10%)';
        }

    }

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img-div');
        const img = document.createElement( 'img' );
        img.setAttribute('alt','');

        redimensionPhoto(img);

       
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;


        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info-div');
        const placePara = document.createElement('p');
        placePara.classList.add('place-para');
        placePara.innerText =  data.city + ', '+data.country;
        const taglinePara = document.createElement('p');
        taglinePara.classList.add('tagline-para');
        taglinePara.innerText = data.tagline;
        const pricePara = document.createElement('p');
        pricePara.classList.add('price-para');
        pricePara.innerText = String(data.price) + '€/jour';

        const linkToPhotographerPage = document.createElement('a');
        linkToPhotographerPage.setAttribute('href', `photographer.html?id=${data.id}`);
        linkToPhotographerPage.appendChild(imgDiv);
        linkToPhotographerPage.appendChild(h2);
        linkToPhotographerPage.classList.add('link-to-photographer-page');

        
        infoDiv.appendChild(placePara);
        infoDiv.appendChild(taglinePara);
        infoDiv.appendChild(pricePara);
        imgDiv.appendChild(img);
        article.appendChild(linkToPhotographerPage);
        article.appendChild(infoDiv)

        return (article);
    }


    return { name, picture, getUserCardDOM, getPhotographerInfo }
}