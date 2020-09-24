function valForm(clickId) {
    let message = document.getElementById('message'); // Success besked

    removeErrorMessage(); // Ryd fejl besked
    message.innerHTML = ''; // Ryd success besked

    let inputs = [ // Inputs vi vil tjekke
        {item: document.getElementById('input-first-name'), errorMessage: ['Indtast venligst dit fornavn.']},
        {item: document.getElementById('input-last-name'), errorMessage: ['Indtast venligst dit efternavn.']},
        {item: document.getElementById('full-name'), errorMessage: ['Indtast venligst dit navn.']},
        {item: document.getElementById('email-address'), errorMessage: ['Indtast venligst din e-mailadresse.', 'Indtast venligst en korrekt e-mailadresse.'], type: 'email-address'},
        {item: document.getElementById('input-phone'), errorMessage: ['Indtast venligst dit telefonnummer.']},
        {item: document.getElementById('password'), errorMessage: ['Indtast venligst et kodeord.']},
        {item: document.getElementById('form-message'), errorMessage: ['Indtast venligst din besked.']},
    ]

    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].item !== null && !inputs[i].item.value) { // Tjekker om element findes og validerer at noget er indtastet
            addErrorMessage(inputs[i].item.id, inputs[i].errorMessage[0])
            return false;
        } else if (inputs[i].type == 'email-address' && validateEmail(inputs[i].item.value) == false) { // Tjekker at typen er 'email-address' og validerer om det er en email der er indtastet
            addErrorMessage(inputs[i].item.id, inputs[i].errorMessage[1])
            return false;
        }
    }

    // Hvis alt er valideret
    if (clickId == 'send-contact-btn') {
        message.innerHTML = 'Tak for din besked.';
        return true;
    } else if (clickId == 'send-senior-btn') {
        message.innerHTML = 'Tak for tilmeldingen.';
        return true;
    } else if (clickId == 'order-btn') {
        window.location.href = './thanks.html';
        return true;
    }
}

// Fjern fejl besked
function removeErrorMessage() {
    let errorMessage = document.getElementById('error');
    if (errorMessage) {
        errorMessage.remove();
    }
}   

// Tilføj fejl besked
function addErrorMessage(id, string) {
    let fullNameElement = document.getElementById(`${id}`);
    fullNameElement.insertAdjacentHTML('afterend', `<p id="error">${string}</p>`)
    fullNameElement.focus();
}

// Valider e-mail
function validateEmail(emailAddress) {
    let regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(emailAddress);
}

// Kald valForm() ved klik på knap med '#send-contact-btn'
let sendContactBtn = document.querySelector('#send-contact-btn');
if (sendContactBtn !== null) {
    sendContactBtn.addEventListener('click', () => {
        valForm(event.target.id);
    })
}

// Kald valForm() ved klik på knap med '#send-btn'
let sendSeniorBtn = document.querySelector('#send-senior-btn');
if (sendSeniorBtn !== null) {
    sendSeniorBtn.addEventListener('click', () => {
        valForm(event.target.id);
    })
}

// Kald valForm() ved klik på knap med '#order-btn'
let orderBtn = document.querySelector('#order-btn');
if (orderBtn !== null) {
    orderBtn.addEventListener('click', () => {
        valForm(event.target.id);
    })
}