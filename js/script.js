// I) Global Function (Helper Functions, Initialize Page Content, Initialize Validation)
const initializeRegistration = () => {
    
    // A) Helper Functions
    
    // Function to select element
    const select = (selector) => {
        return document.querySelector(selector);
    };
    
    // Function to build and insert an error message
    const buildErrorMessage = (target, textContent, id) => {
        const element = document.createElement('p');
        element.textContent = textContent;
        element.id = id;
        element.style.color = 'firebrick';
        hideElement(element);
        target.parentElement.insertBefore(element, target);
        return element;
    };
    
    // Function to hide an element
    const hideElement = (element) => {
        element.style.display = 'none';
    };
    
    // Function to show an element
    const showElement = (element) => {
        element.style.display = '';
    };
    
    // B) Function to Build Initial Page Content (Basic Info, Tshirt Info, Activity Registration, Payment Info)
    const initializePageContent = () => {
    
        // 1) Basic Info
        const initializeBasicInfo = () => {
            
            // Set Focus to First Text Field on Page
            const initializeFocus = () => {
                const firstTextField = select('input[type=text]');
                firstTextField.focus();
            };
            
            // Build Basic Info Section's Error Messages (Hidden)
            const buildBasicInfoErrorMessages = () => {
                const nameInput = select('#name');
                const emailInput = select('#mail');
                buildErrorMessage(nameInput, 'Name field cannot be left blank', 'nameError');
                buildErrorMessage(emailInput, 'Email field cannot be left blank', 'emailEmptyError');
                buildErrorMessage(emailInput, 'Email field must contain a valid email address', 'emailInvalidError');
            };
            
            // Initialize Job Role Select Element (Show/Hide "Other Title" Input))
            const initializeTitleSelect = () => {
                const titleSelect = select('#title');
                const otherTitleInput = select('#other-title');
                const handleTitleSelectChange = () => {
                    if (titleSelect.value === 'other') {
                        showElement(otherTitleInput);
                    } else {
                        hideElement(otherTitleInput);
                    }
                };
                // Hide Input
                hideElement(otherTitleInput);
                titleSelect.addEventListener('change', handleTitleSelectChange);
                
            };
            
            // Call Above Functions
            initializeFocus();
            buildBasicInfoErrorMessages();
            initializeTitleSelect();
        };
        
        // 2) Tshirt Info
        const initializeTshirtInfo = () => {
            
            // Initialize Tshirt Theme/Color Select Elements Functionality
            const initializeTshirtSelects = () => {
                const designSelect = select('#design');
                const colorSelect = select('#color');
                const colorOptions = colorSelect.children;
                const punOptions = [colorOptions[0], colorOptions[1], colorOptions[2]];
                const heartOptions = [colorOptions[3], colorOptions[4], colorOptions[5]];
                const handleDesignSelectChange = () => {
                    if (designSelect.value === 'js puns') {
                        showElement(colorSelect);
                        punOptions.forEach(option => showElement(option));
                        heartOptions.forEach(option => hideElement(option));
                        colorSelect.selectedIndex = 0;
                    } else if (designSelect.value === 'heart js') {
                        showElement(colorSelect);
                        punOptions.forEach(option => hideElement(option));
                        heartOptions.forEach(option => showElement(option));
                        colorSelect.selectedIndex = 3;
                    } else {
                        hideElement(colorSelect);
                    }
                };
                hideElement(colorSelect);
                designSelect.addEventListener('change', handleDesignSelectChange);
            };
            
            // Call Above Function
            initializeTshirtSelects();
        };
        
        // 3) Activity Registration
        const initializeActivityRegistration = () => {
            
            // Build Activity Registration Error Message (Hidden)
            const buildActivityRegistrationErrorMessage = () => {
                const messageTarget = select('.activities').querySelector('label');
                const errorMessage = buildErrorMessage(messageTarget,'You must register for at least one activity', 'activityError');
                errorMessage.style.margin = '0px 0px 16px';
            };       
            
            // Build Total Cost Message for Registered Activities (Hidden)
            const buildActivityRegistrationTotalCostMessage = () => {
                const activitiesFieldset = select('.activities');
                const totalCostLabel = document.createElement('label');
                totalCostLabel.id = 'totalCost';
                totalCostLabel.style.fontWeight = 'bold';
                totalCostLabel.marginTop = '1.5em';
                hideElement(totalCostLabel);
                activitiesFieldset.appendChild(totalCostLabel);
            };
            
            // Initialize Activity Registration Total Cost and Conflicts Functionality
            const initializeActivityRegistrationCostAndConflict = () => {
                
                // Local Variables
                const activityFieldset = select('.activities');
                const activityInputs = activityFieldset.querySelectorAll('input');
                const totalCostLabel = select('#totalCost');
                let totalCost = 0;
                
                // Helper Functions
                const disableInput = (index) => {
                    activityInputs[index].disabled = true;
                    activityInputs[index].parentElement.style.color = 'grey';
                };
                const enableInput = (index) => {
                    activityInputs[index].disabled = false;
                    activityInputs[index].parentElement.style.color = '';
                };
                
                // Handler Function
                const handleActivityInputChange = (event) => {
                    const input = event.target;
                    if (input.checked) {
                        // Handle Time Conflicts
                        if (input.name === 'js-frameworks') {
                            disableInput(3);
                        } else if (input.name === 'express') {
                            disableInput(1);
                        } else if (input.name === 'js-libs') {
                            disableInput(4);
                        } else if (input.name === 'node') {
                            disableInput(2);
                        }
                        // Handle Total Cost Update
                        totalCost += Number(input.dataset.cost);
                        showElement(totalCostLabel);
                        totalCostLabel.textContent = `Total Cost: $${totalCost}`;
                    } else {
                        // Handle Time Conflicts
                        if (input.name === 'js-frameworks') {
                            enableInput(3);
                        } else if (input.name === 'express') {
                            enableInput(1);
                        } else if (input.name === 'js-libs') {
                            enableInput(4);
                        } else if (input.name === 'node') {
                            enableInput(2);
                        }
                        // Handle Total Cost Update
                        totalCost -= Number(input.dataset.cost);
                        if (totalCost === 0) {
                            hideElement(totalCostLabel);
                        }
                        totalCostLabel.textContent = `Total Cost: $${totalCost}`;
                    }
                };
                
                // Event Listener
                activityFieldset.addEventListener('change', handleActivityInputChange);
                
            };

            // Call Above Functions
            buildActivityRegistrationErrorMessage();
            buildActivityRegistrationTotalCostMessage();
            initializeActivityRegistrationCostAndConflict();
        };
        
        // 4) Payment Info
        const initializePaymentInfo = () => {
            
            // Build Credit Card Error Messages
            const buildCreditCardErrorMessages = () => {
                
                // Build Card Number Error Message
                const buildCardNumberErrorMessage = () => {
                    const cardNumberInput = select('#cc-num');
                    buildErrorMessage(cardNumberInput, 'Card number must be 13-16 digits only', 'cardNumberError');
                };
                
                // Build Zip Code Error Message
                const buildZipCodeErrorMessage = () => {
                    const zipCodeInput = select('#zip');
                    buildErrorMessage(zipCodeInput, '5 digits only', 'zipCodeError');
                };
                
                // Build CVV Error Message
                const buildCvvErrorMessage = () => {
                    const cvvInput = select('#cvv');
                    buildErrorMessage(cvvInput, '3 digits only', 'cvvError');
                };
                
                // Call Above Functions
                buildCardNumberErrorMessage();
                buildZipCodeErrorMessage();
                buildCvvErrorMessage();
            };
            
            const initializePaymentSelect = () => {
                const paymentSelect = select('#payment');
                const creditCardDiv = select('#credit-card');
                const paypalDiv = select('#paypal');
                const bitcoinDiv = select('#bitcoin');
                // Select Credit Card Option
                const selectCreditCardOption = () => {
                    paymentSelect.firstElementChild.remove();
                };

                // Hide Paypal Div Element
                const hidePaypalDiv = () => {
                    hideElement(paypalDiv);
                };

                // Hide Bitcoin Div Element
                const hideBitcoinDiv = () => {
                    hideElement(bitcoinDiv);
                };
                
                const handlePaymentChange = () => {
                    if (paymentSelect.value === 'credit card') {
                        showElement(creditCardDiv);
                        hideElement(paypalDiv);
                        hideElement(bitcoinDiv);
                    } else if (paymentSelect.value === 'paypal') {
                        hideElement(creditCardDiv);
                        showElement(paypalDiv);
                        hideElement(bitcoinDiv);
                    } else if (paymentSelect.value === 'bitcoin') {
                        hideElement(creditCardDiv);
                        hideElement(paypalDiv);
                        showElement(bitcoinDiv);
                    }
                };
                
                selectCreditCardOption();
                hidePaypalDiv();
                hideBitcoinDiv();
                paymentSelect.addEventListener('change', handlePaymentChange);
            };
            
            // Call Above Functions
            buildCreditCardErrorMessages();
            initializePaymentSelect();
            
        };
        
        // Call Above Functions
        initializeBasicInfo();
        initializeTshirtInfo();
        initializeActivityRegistration();
        initializePaymentInfo();
        const button = select('button');
        buildErrorMessage(button, 'Please fix errors above before submission', 'generalError');

    };
    
    // C) Function to Validate Form in Real Time and on Submission
    const initializeValidation = () => {
    
        // Local Variables
        const nameInput = select('#name');
        const emailInput = select('#mail');
        const activitiesInputs = document.querySelectorAll('.activities input');
        const creditCardDiv = select('#credit-card');
        const paymentSelect = select('#payment');


        // Local Error Tracker Booleans
        let nameError = false;
        let emailError = false;
        let activityError = false;
        let paymentError = false;
        
        
        // Validation Functions (Used for Both Real Time and Submission Validation)
        const validateName = () => {
            const nameErrorMessage = select('#nameError');
            const regex = /^\s+$/;
            // Error if Name Input Is Blank or Only Space Characters
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
        const validateEmail = () => {
            const emailEmptyErrorMessage = select('#emailEmptyError');
            const emailInvalidErrorMessage = select('#emailInvalidError');
            const regex1 = /^\s+$/;
            const regex2 = /^[^@]+@[a-z0-9\-]+\.[a-z]{2,}$/i;
            // Hold Error if just "Tabbing" from Previous Input Field
            if (event.which !== 9) {
                // Error if Email Input Is Blank or Only Space Characters
                if (emailInput.value === '' || regex1.test(emailInput.value)) {
                    emailError = true;
                    emailEmptyErrorMessage.style.display = '';
                    emailInvalidErrorMessage.style.display = 'none';
                    emailInput.style.border = '2px solid firebrick';
                } else {
                    // Error if Email Format is Invalid
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
        const validateActivities = () => {
            const activityErrorMessage = select('#activityError');
            let activitiesRegistered = 0;
            activitiesInputs.forEach(input => {
                if (input.checked) {
                    activitiesRegistered++;
                }
            });
            if (activitiesRegistered === 0) {
                activityError = true;
                activityErrorMessage.style.display = '';
            } else {
                activityError = false;
                activityErrorMessage.style.display = 'none';
            }
        };
        const validatePayment = () => {
            const cardNumberInput = select('#cc-num');
            const zipCodeInput = select('#zip');
            const cvvInput= select('#cvv');
            const cardNumberErrorMessage = select('#cardNumberError');
            const zipCodeErrorMessage = select('#zipCodeError');
            const cvvErrorMessage = select('#cvvError');
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
                    paymentError = true;
                } else {
                    paymentError = false;
                }
            } else {
                cardNumberError = false;
                zipCodeError = false;
                cvvError = false;
                paymentError = false;
            }
        };
                
        // 1) Validate in Real Time
        const validateInRealTime = () => {
            // Validate Name Input in Real Time
            nameInput.addEventListener('keyup', validateName);
            // Validate Email Input
            emailInput.addEventListener('keyup', validateEmail);
            // Validate Activities Registration
            activitiesInputs.forEach(input => input.addEventListener('change', validateActivities));
            
        };
        
        // 2) Validate on Submission
        const validateOnSubmit = () => {
            const form = select('form');
            const button = select('button');
            const generalErrorMessage = select('#generalError');
            // Handle a Form Submission with Error Messages or Page Refresh
            const handleFormSubmit = (event) => {
                // Validate Name Input
                validateName();
                // Validate Email Input
                validateEmail();
                // Validate Activity Registration
                validateActivities();
                // validate credit card info
                validatePayment();
                // stop form from submitting and display general error if any errors
                if (nameError || emailError || activityError || paymentError) {
                    event.preventDefault();
                    showElement(generalErrorMessage);
                } else {
                    event.preventDefault();
                    location.reload();
                }
            };
            form.addEventListener('submit', handleFormSubmit);
        };
        
        // Call Above Functions
        validateInRealTime();
        validateOnSubmit();
    };
    
    // Call Above Functions
    initializePageContent();
    initializeValidation();
};
    
// II) Global Event Listener
document.addEventListener('DOMContentLoaded', initializeRegistration);
