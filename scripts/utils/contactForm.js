const contactButton = document.getElementById('contact-button');
console.log('contact', contactButton);


document.addEventListener('DOMContentLoaded', ()=> {

    const modal = document.getElementById("contact_modal");
    document.addEventListener('keydown', e=> {
                
        if(modal.getAttribute('aria-hidden') == 'false' && e.code == 'Escape'){

          
            closeModal()
        }
    })

})

function displayModal() {
    const modal = document.getElementById("contact_modal");

    const main  = document.getElementById('main');

    //accessibily instructions 
   
    main.setAttribute('aria-hidden', true);
    modal.setAttribute('aria-hidden', false);
    //end of accessibility instructions 

    const submitButton = document.getElementById('contact-button');
    const modalForm = document.getElementById('modal-form');
    submitButton.setAttribute('disabled', true)
    submitButton.classList.add('forbidden-submit');

	modal.style.display = "flex";

    class Input {

        constructor(domEl,pattern, errorMessage, isValid){

            this.domEl = domEl;
            this.pattern = pattern;
            this.errorMessage = errorMessage;
            this.isValid = false;

        };

        displayErrorMessage = (specificErrorMessage, valid) => {
           
                let siblings = Array.from(this.domEl.parentNode.childNodes);
                let para = siblings.filter(n => n.nodeName === 'P')[0];     
                if(valid === true){
                    para.innerHTML = "";
                }
                else {
                    para.innerText = specificErrorMessage;
                }
              
          
        }

        displayColorMessage = (valid) => {
            if(valid === true){
                if(Array.from(this.domEl.classList).filter(c => c === 'non-valid').length > 0){
                    this.domEl.classList.remove('non-valid');
                }
                this.domEl.classList.add('valid');
            }
            else {
                if(Array.from(this.domEl.classList).filter(c => c === 'valid').length > 0){
                    this.domEl.classList.remove('valid');
                }
                this.domEl.classList.add('non-valid')
             
            }
           
        }

        allowFormSubmit = (inputsArray, isAllowed, modalForm) => {

            console.log('into allowFormSubmit');
            if(isAllowed === true){
                console.log('isAllowed === true');
                modalForm.addEventListener('submit', (e)=> {
                
                    e.preventDefault();
                    console.log({
                        prenom: inputsArray[0].domEl.value,
                        nom: inputsArray[1].domEl.value,
                        email: inputsArray[2].domEl.value,
                        message: inputsArray[3].domEl.value,

                    })
                   

                })

                console.log("contactButton", contactButton);
                contactButton.onkeydown = (e) => {
                    
                    if(e.code === 'Enter') {
                        
                        console.log({
                            prenom: inputsArray[0].domEl.value,
                            nom: inputsArray[1].domEl.value,
                            email: inputsArray[2].domEl.value,
                            message: inputsArray[3].domEl.value,
    
                        })

                       
                    }

                }


            }
        


        }

        formChecker = (inputsArray, modalForm) => {
            if(inputsArray.find(input => input.isValid === false)){
                submitButton.setAttribute('disabled', true)
                if(Array.from(submitButton.classList).find(c => c === 'allowed-submit')){
                    submitButton.classList.remove('allowed-submit');
                    
                }
                if(!Array.from(submitButton.classList).find(c => c === 'forbidden-submit')){
                    submitButton.classList.add('forbidden-submit');
                    
                }
            
            }
            else {
                submitButton.removeAttribute('disabled') 
                if(!Array.from(submitButton.classList).find(c => c === 'allowed-submit')){
                    submitButton.classList.add('allowed-submit');

                }
                if(Array.from(submitButton.classList).find(c => c === 'forbidden-submit')){
                    submitButton.classList.remove('forbidden-submit');
                }
                let isAllowed = true
                this.allowFormSubmit(inputsArray, isAllowed, modalForm);
            }
        }

        patternChecker = (inputsArray, modalForm) => {
            this.domEl.addEventListener('change', (e)=> {
                let valid = this.pattern.test(e.target.value)
                if(valid){  
                    this.displayColorMessage(valid)
                    this.displayErrorMessage("", valid);
                    this.isValid = true
                    this.formChecker(inputsArray, modalForm);
       
                } else {
                    if( (this.domEl.id === 'lastname' || this.domEl.id === 'firstname') && e.target.value.length < 2 && e.target.value.length > 0){
                        this.displayErrorMessage(this.errorMessage.invalidAnswer, valid);
                    }
                    else if((this.domEl.id === 'email' || this.domEl.id === 'message') && e.target.value.length > 0){
                        this.displayErrorMessage(this.errorMessage.invalidAnswer, valid)
                    }
                    else {
                        this.displayErrorMessage(this.errorMessage.noAnswer, valid);
                    }
                    this.displayColorMessage(valid)
                    this.isValid = false
                    this.formChecker(inputsArray, modalForm);
                }
             
            })
        }

    }


    const instancesToCheck = () => {



    return ({

        firstname : new Input(
            document.getElementById('firstname'),
            /^([a-zéèöà]{2,})((([-])([a-z]{2,}))?)$/i,
            {noAnswer: 'entrez une réponse', invalidAnswer:'deux caractères minimum'},     
        ),

        lastname : new Input(
            document.getElementById('lastname'),
            /^([a-z-àéèö]{2,})((([-])([a-z]{2,}))?)$/i,
            {noAnswer: 'entrez une réponse', invalidAnswer:'deux caractères minimum'},
            
        ),

        email : new Input(
            document.getElementById('email'),
            /^[a-z\.]{2,}[@]{1}[a-z0-9\-]{3,}[\.]{1}[a-z]{2,5}$/,
            {noAnswer: 'entrez une réponse', invalidAnswer:'email non valide'},    
        ),

        message : new Input(
            document.getElementById('message'),
            /^[\s\S-àèéö]{0,200}$/ig,
            {noAnswer: 'entrez une réponse', invalidAnswer:'message non valide'},    
        ),



        })
       

    }


    const {firstname, lastname, email, message } = instancesToCheck();

    const inputsArray = [firstname, lastname, email, message];

    for(let input of inputsArray){
   
        input.patternChecker(inputsArray, modalForm);
    

    }

  
 

}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    const main  = document.getElementById('main');

    //accessibily instructions 
    main.setAttribute('aria-hidden', false);
    modal.setAttribute('aria-hidden', true);
    //end of accessibility instructions 

    let firstname = document.getElementById('firstname');
    let lastname = document.getElementById('lastname');
    let email = document.getElementById('email');
    let message = document.getElementById('message');

    for(let el of [firstname, lastname, email, message]){;
        el.value = "";
    }

}
