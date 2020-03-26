// global function
const initializeRegistration = () => {
    
    // local helper functions
    const setDisplay = (element, value) => {
        element.style.display = value;
    };
    
    
    
    
    // BASIC INFO SECTION
    const initializeBasicInfo = () => {    
        const initializeFocus = () => {
            const firstTextField = document.querySelector('input[type=text]');
            firstTextField.focus();
        };
        const initializeJobRole = () => {
            const titleSelect = document.querySelector('#title');
            const otherTitleInput = document.querySelector('#other-title');  
            const handleTitleChange = (event) => {
                if (event.target.value === 'other') {
                    setDisplay(otherTitleInput, '');
                } else {
                    setDisplay(otherTitleInput, 'none');
                    otherTitleInput.value = '';
                }
            };
            setDisplay(otherTitleInput,'none');
            titleSelect.addEventListener('change', handleTitleChange);
        };
        initializeFocus();
        initializeJobRole();
    };
    
    
    
    // TSHIRT INFO SECTION
    const initializeTshirtInfo = () => {
        const designSelect = document.querySelector('#design');
        const colorSelect = document.querySelector('#color');
        const handleDesignSelectChange = () => {
            const punColorOptions = [colorSelect[0], colorSelect[1], colorSelect[2]];
            const heartColorOptions = [colorSelect[3], colorSelect[4], colorSelect[5]];
            // if default design option
            if (designSelect.value === 'Select Theme') {
                // hide color selection
                setDisplay(colorSelect, 'none');
            // if pun design option
            } else if (designSelect.value === 'js puns') {
                // show color selection
                setDisplay(colorSelect, '');
                // hide heart color options
                heartColorOptions.forEach(option => setDisplay(option, 'none'));
                // show pun color options
                punColorOptions.forEach(option => setDisplay(option, ''));
                // select first pun color option
                colorSelect.selectedIndex = '0';
            } else if (designSelect.value === 'heart js') {
                // show color selection
                setDisplay(colorSelect, '');
                // hide pun color options
                punColorOptions.forEach(option => setDisplay(option, 'none'));
                // show heart color options
                heartColorOptions.forEach(option => setDisplay(option, ''));
                // select first pun color option
                colorSelect.selectedIndex = '3';
            }
        };
        setDisplay(colorSelect, 'none')
        designSelect.addEventListener('change', handleDesignSelectChange);
    };
    
    
    
    // ACTIVITIES REGISTRATION SECTION
    const initializeActivityRegistration = () => {
        const activitiesFieldset = document.querySelector('.activities');
        const activitiesInputs = document.querySelectorAll('.activities input');
        let totalCost = 0;
        const handleActivitiesInputChange = (event) => {
            const input = event.target;
            if (input === activitiesInputs[1]) {
                if (input.checked) {
                    activitiesInputs[3].disabled = true;
                    activitiesInputs[3].parentElement.style.color = 'grey';
                } else {
                    activitiesInputs[3].disabled = false;
                    activitiesInputs[3].parentElement.style.color = '';
                }
            } else if (input === activitiesInputs[3]) {
                if (input.checked) {
                    activitiesInputs[1].disabled = true;
                    activitiesInputs[1].parentElement.style.color = 'grey';
                } else {
                    activitiesInputs[1].disabled = false;
                    activitiesInputs[1].parentElement.style.color = '';
                }
            } else if (input === activitiesInputs[2]) {
                if (input.checked) {
                    activitiesInputs[4].disabled = true;
                    activitiesInputs[4].parentElement.style.color = 'grey';
                } else {
                    activitiesInputs[4].disabled = false;
                    activitiesInputs[4].parentElement.style.color = '';
                }
            } else if (input === activitiesInputs[4]) {
                if (input.checked) {
                    activitiesInputs[2].disabled = true;
                    activitiesInputs[2].parentElement.style.color = 'grey';
                } else {
                    activitiesInputs[2].disabled = false;
                    activitiesInputs[2].parentElement.style.color = '';
                }
            }
            if (input.checked) {
                totalCost += Number(input.dataset.cost);
            } else {
                totalCost -= Number(input.dataset.cost);
            }
            const totalCostLabel = document.createElement('label');
            totalCostLabel.id = 'totalCost';
            totalCostLabel.style.fontWeight = 'bold';
            totalCostLabel.style.marginTop = '1.5em';
            totalCostLabel.textContent = `Total Cost: $${totalCost}`;
            if (activitiesFieldset.lastElementChild.id === 'totalCost') {
                activitiesFieldset.lastElementChild.remove();
            }
            if (totalCost !== 0) {
                activitiesFieldset.appendChild(totalCostLabel);
            }
        };
        activitiesFieldset.addEventListener('change', handleActivitiesInputChange);
    };
    
    
    
    // PAYMENT INFO SECTION
    const initializePaymentInfo = () => {
        const paymentSelect = document.querySelector('#payment');
        const creditCardDiv = document.querySelector('#credit-card');
        const paypalDiv = document.querySelector('#paypal');
        const bitcoinDiv = document.querySelector('#bitcoin');
        
        paymentSelect.firstElementChild.remove();
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
        
        const handlePaymentSelectChange = () => {
            if (paymentSelect.value === 'credit card') {
                creditCardDiv.style.display = '';
                paypalDiv.style.display = 'none';
                bitcoinDiv.style.display = 'none';
            } else if (paymentSelect.value === 'paypal') {
                creditCardDiv.style.display = 'none';
                paypalDiv.style.display = '';
                bitcoinDiv.style.display = 'none';
            } else if (paymentSelect.value === 'bitcoin') {
                creditCardDiv.style.display = 'none';
                paypalDiv.style.display = 'none';
                bitcoinDiv.style.display = '';
            }
        }
        
        paymentSelect.addEventListener('change', handlePaymentSelectChange);
    };
    
    
    
    // VALIDATION SECTION
    const initializeFormValidation = () => {
        const nameInput = document.querySelector('#name');
        const nameErrorMessage = document.createElement('p');
        nameErrorMessage.textContent = 'Name field cannot be left blank';
        nameErrorMessage.style.color = 'firebrick';
        nameInput.parentElement.insertBefore(nameErrorMessage, nameInput)
        nameErrorMessage.style.display = 'none';
        
        const emailInput = document.querySelector('#mail');
        const emailEmptyErrorMessage = document.createElement('p');  
        emailEmptyErrorMessage.textContent = 'Email field cannot be left blank';
        emailEmptyErrorMessage.style.color = 'firebrick';
        emailInput.parentElement.insertBefore(emailEmptyErrorMessage, emailInput)
        emailEmptyErrorMessage.style.display = 'none';
        const emailInvalidErrorMessage = document.createElement('p');  
        emailInvalidErrorMessage.textContent = 'Email field must contain a valid email address';
        emailInvalidErrorMessage.style.color = 'firebrick';
        emailInput.parentElement.insertBefore(emailInvalidErrorMessage, emailInput)
        emailInvalidErrorMessage.style.display = 'none';
        
        const activitiesFieldset = document.querySelector('.activities');
        const activitiesErrorMessage = document.createElement('p');
        activitiesErrorMessage.textContent = 'You must register for at least one activity';
        activitiesErrorMessage.style.color = 'firebrick';
        activitiesErrorMessage.style.margin = '0px 0px 16px 0px';
        activitiesFieldset.insertBefore(activitiesErrorMessage, activitiesFieldset.children[1])
        activitiesErrorMessage.style.display = 'none';
        
        const paymentSelect = document.querySelector('.payment');
        const cardNumberInput = document.querySelector('#cc-num');
        const zipCodeInput = document.querySelector('#zip');
        const cvvInput = document.querySelector('#cvv');
        const cardNumberErrorMessage = document.createElement('p');
        cardNumberErrorMessage.textContent = 'Card number must be 13-16 digits only';
        cardNumberErrorMessage.style.color = 'firebrick';
        cardNumberInput.parentElement.insertBefore(cardNumberErrorMessage, cardNumberInput)
        cardNumberErrorMessage.style.display = 'none';
        const zipCodeErrorMessage = document.createElement('p');
        zipCodeErrorMessage.textContent = '5 digits only';
        zipCodeErrorMessage.style.color = 'firebrick';
        zipCodeInput.parentElement.insertBefore(zipCodeErrorMessage, zipCodeInput)
        zipCodeErrorMessage.style.display = 'none';
        const cvvErrorMessage = document.createElement('p');
        cvvErrorMessage.textContent = '3 digits only';
        cvvErrorMessage.style.color = 'firebrick';
        cvvInput.parentElement.insertBefore(cvvErrorMessage, cvvInput)
        cvvErrorMessage.style.display = 'none';
        
        const submitButton = document.querySelector('button');
        const generalErrorMessage = document.createElement('p');
        generalErrorMessage.textContent = 'Please fix errors above before submitting form';
        generalErrorMessage.style.color = 'firebrick';
        generalErrorMessage.style.margin = '16px 0px 0px 0px';
        submitButton.parentElement.insertBefore(generalErrorMessage, submitButton)
        generalErrorMessage.style.display = 'none';
        
        let nameError = false;
        let emailError = false;
        let activitiesError = false;
        let creditCardError = false;

        //validateName
        const validateName = () => {
            const regex = /^\s+$/;
            if (nameInput.value === '' || regex.test(nameInput.value)) {
                nameError = true;
                nameErrorMessage.style.display = '';
                nameInput.style.border = '2px solid firebrick';
            } else {
                nameError = false;
                nameErrorMessage.style.display = 'none';
                nameInput.style.border = '';
            }
        };
        nameInput.addEventListener('keyup', validateName);
        nameInput.addEventListener('blur', validateName);

        //validateEmail
        const validateEmail = (event) => {
            const regex1 = /^\s+$/;
            const regex2 = /^[^@]+@[a-z0-9\-]+\.[a-z]{2,}$/i;
            if (event.which !== 9) {
                if (emailInput.value === '' || regex1.test(emailInput.value)) {
                    emailError = true;
                    emailEmptyErrorMessage.style.display = '';
                    emailInvalidErrorMessage.style.display = 'none';
                    emailInput.style.border = '2px solid firebrick';
                } else {
                    if (!regex2.test(emailInput.value)) {
                        emailError = true;
                        emailEmptyErrorMessage.style.display = 'none'
                        emailInvalidErrorMessage.style.display = '';
                        emailInput.style.border = '2px solid firebrick';
                    } else {
                        emailError = false;
                        emailEmptyErrorMessage.style.display = 'none'
                        emailInvalidErrorMessage.style.display = 'none';
                        emailInput.style.border = ''
                    }
                }
            }
        };
        emailInput.addEventListener('keyup', validateEmail);
        emailInput.addEventListener('blur', validateEmail);
        
         //validateActivities
        const validateActivities = () => {
            const activitiesInputs = document.querySelectorAll('.activities input');
            let activitiesRegistered = 0;
            activitiesInputs.forEach(input => {
                if (input.checked) {
                    activitiesRegistered++;
                }
            });
            if (activitiesRegistered === 0) {
                activitiesError = true;
                activitiesErrorMessage.style.display = '';
            } else {
                activitiesError = false;
                activitiesErrorMessage.style.display = 'none';
            }
        };
        
        //validateCreditCard
        const validateCreditCard = () => {
            
            const paymentSelect = document.querySelector('#payment');
            
            const cardNumberRegex = /^\d{13,16}$/;
            let cardNumberError = false;
            const zipCodeRegex = /^\d{5}$/;
            let zipCodeError = false;
            const cvvRegex = /^\d{3}$/;
            let cvvError = false;
            
            if (paymentSelect.value === 'credit card') {
                if (!cardNumberRegex.test(cardNumberInput.value)) {
                    cardNumberError = true;
                    cardNumberErrorMessage.style.display = '';
                } else {
                    cardNumberError = false;
                    cardNumberErrorMessage.style.display = 'none';
                }
                if (!zipCodeRegex.test(zipCodeInput.value)) {
                    zipCodeError = true;
                    zipCodeErrorMessage.style.display = '';
                } else {
                    zipCodeError = false;
                    zipCodeErrorMessage.style.display = 'none';
                }
                if (!cvvRegex.test(cvvInput.value)) {
                    cvvError = true;
                    cvvErrorMessage.style.display = '';
                } else {
                    cvvError = false;
                    cvvErrorMessage.style.display = 'none';
                }
                if (cardNumberError || zipCodeError || cvvError) {
                    creditCardError = true;
                } else {
                    creditCardError = false;
                }
            }
        };
        
        //handleFormSubmit
        const handleFormSubmit = (event) => {

            //validateForm
            const validateForm = (event) => {

                if (nameError || emailError || activitiesError || creditCardError) {
                    event.preventDefault();
                    generalErrorMessage.style.display = '';
                }
                validateName();
                validateEmail(event);
                validateActivities();
                validateCreditCard();
            };
            
            validateForm(event);
        };
    
        document.querySelector('form').addEventListener('submit', handleFormSubmit);
    };
    
    
    
    
    // initialization
    initializeBasicInfo();
    initializeTshirtInfo();
    initializeActivityRegistration();
    initializePaymentInfo();
    initializeFormValidation();
};

// global event listener
document.addEventListener('DOMContentLoaded', initializeRegistration);