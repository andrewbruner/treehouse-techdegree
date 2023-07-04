/*	SCRIPT OUTLINE
	I) Global Function
		A) Helper Functions Object
			1) select()
			2) buildErrorMessage()
			3) hideElement()
			4) showElement()
		B) Page Element Selection
		C) Initialize Page Content
			1) Basic Info Section
				a) buildBasicInfoErrorMessages()
				b) initializeFocus()
				c) initializeTitleSelect()
				d) Call Above Functions
			2) Tshirt Info Section
				a) initializeTshirtSelects()
				b) Call Above Function
			3) Activity Registration Section
				a) buildActivityErrorMessage()
				b) buildActivityCostMessage()
				c) initializeActivityCostAndConflict()
				d) Call Above Functions
			4) Payment Info Section
				a) buildCreditCardErrorMessages()
				b) initializePaymentSelect()
				c) Call Above Functions
			5) Footer Section
			6) Call Above Functions
		D) Initialize Validation Functionality
			1) Local Error Message Selection
			2) Local Error Tracker Booleans
			3) Regex
			4) validateName()
			5) validateEmail()
			6) validateActivity()
			7) validatePayment()
			8) validateInRealTime()
			9) validateOnSubmit()
			10 Call Functions 8 & 9
		E) Call Above Functions
	II) Global Event Listenr
*/

// I) Global Function
const initializeRegistration = () => {
	
	// A) Helper Functions Object
	const app = {
		
		// 1) Function to Select Element
		select: selector => document.querySelector(selector),
		
		// 2) Function to Build and Insert Error Message
		buildErrorMessage: (target, textContent, id) => {
			const element = document.createElement('p');
			element.textContent = textContent;
			element.id = id;
			element.style.color = 'firebrick';
			app.hideElement(element);
			target.parentElement.insertBefore(element, target);
			return element;
		},
		
		// 3) Function to Hide Element
		hideElement: element => element.style.display = 'none',
		
		// 4) Function to Show Element
		showElement: element => element.style.display = ''
	};
	
	// B) Page Element Selection
	// Header
	const form = app.select('form');
	// Basic Info Section
	const nameInput = app.select('#name');
	const emailInput = app.select('#mail');
	const titleSelect = app.select('#title');
	const otherTitleInput = app.select('#other-title');
	// Tshirt Info Section
	const designSelect = app.select('#design');
	const colorSelect = app.select('#color');
	// Activity Registration Section
	const activityFieldset = app.select('.activities');
	const activityInputs = activityFieldset.querySelectorAll('input');
	const mainConferenceLabel = app.select('.activities label');
	// Payment Info Section
	const paymentSelect = app.select('#payment');
	const creditCardDiv = app.select('#credit-card');
	const cardNumberInput = app.select('#cc-num');
	const zipCodeInput = app.select('#zip');
	const cvvInput = app.select('#cvv');
	const paypalDiv = app.select('#paypal');
	const bitcoinDiv = app.select('#bitcoin');
	// Footer
	const submitButton = app.select('button');
	
	// C) Initialize Page Content
	const initializePage = () => {
		
		// 1) Basic Info Section
		const initializeBasicInfo = () => {
			
			// a) Build Error Messages
			const buildBasicInfoErrorMessages = () => {
				app.buildErrorMessage(nameInput, 'Name field cannot be left blank', 'nameError');
				app.buildErrorMessage(emailInput, 'Email field cannot be left blank', 'emailEmptyError');
				app.buildErrorMessage(emailInput, 'Email field must contain a valid email address', 'emailInvalidError');
			};
			
			// b) Set Initial Input Focus
			const initializeFocus = () => nameInput.focus();
			
			// c) Initialize Responsive Functionality
			const initializeTitleSelect = () => {
				const handleTitleSelectChange = () => {
					if (titleSelect.value === 'other') {
						app.showElement(otherTitleInput);
					} else {
						app.hideElement(otherTitleInput);
					}
				};
				app.hideElement(otherTitleInput);
				titleSelect.addEventListener('change', handleTitleSelectChange);
			};
			
			// d) Call Above Functions
			buildBasicInfoErrorMessages();
			initializeFocus();
			initializeTitleSelect();
		};
		
		// 2) Tshirt Info Section
		const initializeTshirtInfo = () => {
			
			// a) Initialize Responsive Functionality
			const initializeTshirtSelects = () => {
				const handleDesignSelectChange = () => {
					const colorOptions = colorSelect.children;
					const punOptions = [colorOptions[0], colorOptions[1], colorOptions[2]];
					const heartOptions = [colorOptions[3], colorOptions[4], colorOptions[5]];
					if (designSelect.value === 'js puns') {
						app.showElement(colorSelect);
						punOptions.forEach(option => app.showElement(option));
						heartOptions.forEach(option => app.hideElement(option));
						colorSelect.selectedIndex = 0;
					} else if (designSelect.value === 'heart js') {
						app.showElement(colorSelect);
						punOptions.forEach(option => app.hideElement(option));
						heartOptions.forEach(option => app.showElement(option));
						colorSelect.selectedIndex = 3;
					} else {
						app.hideElement(colorSelect);
					}
				};
				app.hideElement(colorSelect);
				designSelect.addEventListener('change', handleDesignSelectChange);
			};
			
			// b) Call Above Function
			initializeTshirtSelects();
		};
    	
		// 3) Activity Registration Section
		const initializeActivityRegistration = () => {
			
			// a) Build Error Message
			const buildActivityErrorMessage = () => app.buildErrorMessage(mainConferenceLabel,'You must register for at least one activity', 'activityError').style.margin = '0px 0px 16px';
			
			// b) Build Total Cost Message
			const buildActivityCostMessage = () => {
				const totalCostLabel = document.createElement('label');
				totalCostLabel.id = 'totalCost';
				totalCostLabel.style.fontWeight = 'bold';
				totalCostLabel.marginTop = '1.5em';
				app.hideElement(totalCostLabel);
				activityFieldset.appendChild(totalCostLabel);
			};
			
			// c) Initialize Responsive Functionality
			const initializeActivityCostAndConflict = () => {
				// Helper Functions
				const disableInput = index => {
					activityInputs[index].disabled = true;
					activityInputs[index].parentElement.style.color = 'grey';
				};
				const enableInput = (index) => {
					activityInputs[index].disabled = false;
					activityInputs[index].parentElement.style.color = '';
				};
				// Local Variables
				const totalCostLabel = app.select('#totalCost');
				let totalCost = 0;
				// Handler Function
				const handleActivityInputChange = event => {
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
						app.showElement(totalCostLabel);
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
							app.hideElement(totalCostLabel);
						}
						totalCostLabel.textContent = `Total Cost: $${totalCost}`;
					}
				};
				// Event Listener
				activityFieldset.addEventListener('change', handleActivityInputChange);
			};
			
			// d) Call Above Functions
			buildActivityErrorMessage();
			buildActivityCostMessage();
			initializeActivityCostAndConflict();
		};
		
		// 4) Payment Info Section
		const initializePaymentInfo = () => {
			
			// a) Build Error Messages
			const buildCreditCardErrorMessages = () => {
				const buildCardNumberErrorMessage = () => app.buildErrorMessage(cardNumberInput, 'Card number must be 13-16 digits only', 'cardNumberError');
				const buildZipCodeErrorMessage = () => app.buildErrorMessage(zipCodeInput, '5 digits only', 'zipCodeError');
				const buildCvvErrorMessage = () => app.buildErrorMessage(cvvInput, '3 digits only', 'cvvError');
				buildCardNumberErrorMessage();
				buildZipCodeErrorMessage();
				buildCvvErrorMessage();
			};
			
			// b) Initialize Responsive Functionality
			const initializePaymentSelect = () => {
				const removeDefaultOption = () => paymentSelect.firstElementChild.remove();
				const hidePaypalDiv = () => app.hideElement(paypalDiv);
				const hideBitcoinDiv = () => app.hideElement(bitcoinDiv);
				const handlePaymentChange = () => {
					if (paymentSelect.value === 'credit card') {
						// Display Credit Card Div
						app.showElement(creditCardDiv);
						app.hideElement(paypalDiv);
						app.hideElement(bitcoinDiv);
					} else if (paymentSelect.value === 'paypal') {
						// Display Paypal Div
						app.hideElement(creditCardDiv);
						app.showElement(paypalDiv);
						app.hideElement(bitcoinDiv);
					} else if (paymentSelect.value === 'bitcoin') {
						// Dispaly Bitcoin Div
						app.hideElement(creditCardDiv);
						app.hideElement(paypalDiv);
						app.showElement(bitcoinDiv);
					}
				};
				removeDefaultOption();
				hidePaypalDiv();
				hideBitcoinDiv();
				paymentSelect.addEventListener('change', handlePaymentChange);
			};
			
			// c) Call Above Functions
			buildCreditCardErrorMessages();
			initializePaymentSelect();
		};
		
		// 5) Footer Section
		// Build Error Message
		const initializeSubmissionFooter = () => app.buildErrorMessage(submitButton, 'Please fix errors above before submission', 'generalError');
		
		// 6) Call Above Functions
		initializeBasicInfo();
		initializeTshirtInfo();
		initializeActivityRegistration();
		initializePaymentInfo();
		initializeSubmissionFooter();
	};
	
	// D) Initialize Validation Functionality
	const initializeValidation = () => {
		
		// 1) Local Error Message Selection
		const nameErrorMessage = app.select('#nameError');
		const emailEmptyErrorMessage = app.select('#emailEmptyError');
		const emailInvalidErrorMessage = app.select('#emailInvalidError');
		const activityErrorMessage = app.select('#activityError');
		const cardNumberErrorMessage = app.select('#cardNumberError');
		const zipCodeErrorMessage = app.select('#zipCodeError');
		const cvvErrorMessage = app.select('#cvvError');
		const generalErrorMessage = app.select('#generalError');
		
		// 2) Local Error Tracker Booleans
		let nameError = false;
		let emailError = false;
		let activityError = false;
		let paymentError = false;
		let cardNumberError = false;
		let zipCodeError = false;
		let cvvError = false;
		let generalError = false;
		
		// 3) Regex
		const emptyRegex = /^\s+$/;
		const emailRegex = /^[^@]+@[a-z0-9\-]+\.[a-z]{2,}$/i;
		const cardNumberRegex = /^\d{13,16}$/;
		const zipCodeRegex = /^\d{5}$/;
		const cvvRegex = /^\d{3}$/;
		
		// 4) Validate Name Input
		const validateName = () => {
			// Error on Empty Name Input
			if (nameInput.value === '' || emptyRegex.test(nameInput.value)) {
				nameError = true;
				app.showElement(nameErrorMessage);
				nameInput.style.border = '2px solid firebrick';
			} else {
				nameError = false;
				app.hideElement(nameErrorMessage);
				nameInput.style.border = '';
			}
		};
		
		// 5) Validate Email Input
		const validateEmail = (event) => {
			// Skip 'keyup' event validation if using 'Tab' key from previous input field
			if (event.which !== 9) {
			// Error on Empty Email Input
				if (emailInput.value === '' || emptyRegex.test(emailInput.value)) {
					emailError = true;
					app.showElement(emailEmptyErrorMessage);
					app.hideElement(emailInvalidErrorMessage);
					emailInput.style.border = '2px solid firebrick';
				} else {
					// Error on Invalid Email Format
					if (!emailRegex.test(emailInput.value)) {
						emailError = true;
						app.hideElement(emailEmptyErrorMessage);
						app.showElement(emailInvalidErrorMessage);
						emailInput.style.border = '2px solid firebrick';
					} else {
						emailError = false;
						app.hideElement(emailEmptyErrorMessage);
						app.hideElement(emailInvalidErrorMessage);
						emailInput.style.border = ''
					}
				}
			}
		};
		
		// 6) Validate Activity Inputs
		const validateActivity = () => {
			// Track Number of Registered Activities
			let activitiesRegistered = 0;
			activityInputs.forEach(input => {
				if (input.checked) {
					activitiesRegistered++;
				}
			});
			// Error on 0 Registered Activities
			if (activitiesRegistered === 0) {
				activityError = true;
				app.showElement(activityErrorMessage);
			} else {
				activityError = false;
				app.hideElement(activityErrorMessage);
			}
		};
		
		// 7) Validate Payment Inputs
		const validatePayment = () => {
			// Check if Credit Card Option is Selected
			if (paymentSelect.value === 'credit card') {
				// Error on Invalid Card Number
				if (!cardNumberRegex.test(cardNumberInput.value)) {
					cardNumberError = true;
					app.showElement(cardNumberErrorMessage);
					cardNumberInput.style.border = '2px solid firebrick';
				} else {
					cardNumberError = false;
					app.hideElement(cardNumberErrorMessage);
					cardNumberInput.style.border = '';
				}
				// Error on Invalid Zip Code
				if (!zipCodeRegex.test(zipCodeInput.value)) {
					zipCodeError = true;
					app.showElement(zipCodeErrorMessage);
					zipCodeInput.style.border = '2px solid firebrick';
				} else {
					zipCodeError = false;
					app.hideElement(zipCodeErrorMessage);
					zipCodeInput.style.border = '';
				}
				// Error on Invalid CVV
				if (!cvvRegex.test(cvvInput.value)) {
					cvvError = true;
					app.showElement(cvvErrorMessage);
					cvvInput.style.border = '2px solid firebrick';
				} else {
					cvvError = false;
					app.hideElement(cvvErrorMessage);
					cvvInput.style.border = '';
				}
				// General Payment Error on Any Above Sub-Payment Error
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
				app.hideElement(cardNumberErrorMessage);
				app.hideElement(zipCodeErrorMessage);
				app.hideElement(cvvErrorMessage);
			}
		};
		
		// 8) Validate in Real Time
		const validateInRealTime = () => {
			// Validate Name Input
			nameInput.addEventListener('keyup', validateName);
			// Validate Email Input
			emailInput.addEventListener('keyup', validateEmail);
			// Validate Activity Registration Inputs
			activityInputs.forEach(input => input.addEventListener('change', validateActivity));
		};
		
		// 9) Validate on Submission
		const validateOnSubmit = () => {
			const handleFormSubmit = (event) => {
				// Validate Name Input
				validateName();
				// Validate Email Input
				validateEmail(event);
				// Validate Activity Registration
				validateActivity();
				// Validate Payment Info
				validatePayment();
				// If Any Sub-Error...
				if (nameError || emailError || activityError || paymentError) {
					// Stop Form from Submitting
					event.preventDefault();
					// Show General Error Message
					app.showElement(generalErrorMessage);
					// Add real time payment validation for duration of registration (after submission failure)
					cardNumberInput.addEventListener('keyup', validatePayment);
					zipCodeInput.addEventListener('keyup', validatePayment);
					cvvInput.addEventListener('keyup', validatePayment);
				} else {
					// If No Errors, Reload the Page
					event.preventDefault();
					location.reload();
				}
			};
			// Event Listener
			form.addEventListener('submit', handleFormSubmit);
		};
		
		// 10) Call Above Functions
		validateInRealTime();
		validateOnSubmit();
	};
	
	// E) Call Above Functions
	initializePage();
	initializeValidation();
};

// II) Global Event Listener
document.addEventListener('DOMContentLoaded', initializeRegistration);
