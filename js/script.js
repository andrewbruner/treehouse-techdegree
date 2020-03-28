// I) Global Function
const initializeRegistration = () => {
// A) Helper Functions Object
const app = {
// Function to Select Element
select: selector => document.querySelector(selector),
// Function to Build and Insert an Error Message
buildErrorMessage: (target, textContent, id) => {
const element = document.createElement('p');
element.textContent = textContent;
element.id = id;
element.style.color = 'firebrick';
app.hideElement(element);
target.parentElement.insertBefore(element, target);
return element;
},

// Function to Hide an Element
hideElement: element => element.style.display = 'none',

// Function to Show an Element
showElement: element => element.style.display = '',
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

// 1) Initialize Basic Info Section
const initializeBasicInfo = () => {

// Build Basic Info Section's Error Messages
const buildBasicInfoErrorMessages = () => {
app.buildErrorMessage(nameInput, 'Name field cannot be left blank', 'nameError');
app.buildErrorMessage(emailInput, 'Email field cannot be left blank', 'emailEmptyError');
app.buildErrorMessage(emailInput, 'Email field must contain a valid email address', 'emailInvalidError');
};

// Set Focus to #name Input
const initializeFocus = () => nameInput.focus();

// Initialize #title Select Element Functionality
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

// Call Above Functions
buildBasicInfoErrorMessages();
initializeFocus();
initializeTitleSelect();
};

// 2) Tshirt Info
const initializeTshirtInfo = () => {

// Initialize Tshirt Theme/Color Select Elements Functionality
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

// Call Above Function
initializeTshirtSelects();
};

// 3) Activity Registration
const initializeActivityRegistration = () => {

// Build Activity Registration Error Message
const buildActivityErrorMessage = () => app.buildErrorMessage(mainConferenceLabel,'You must register for at least one activity', 'activityError').style.margin = '0px 0px 16px';

// Build Total Cost Message for Registered Activities
const buildActivityCostMessage = () => {
const totalCostLabel = document.createElement('label');
totalCostLabel.id = 'totalCost';
totalCostLabel.style.fontWeight = 'bold';
totalCostLabel.marginTop = '1.5em';
app.hideElement(totalCostLabel);
activityFieldset.appendChild(totalCostLabel);
};

// Initialize Activity Registration Total Cost and Conflicts Functionality
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

// Call Above Functions
buildActivityErrorMessage();
buildActivityCostMessage();
initializeActivityCostAndConflict();
};

// 4) Payment Info
const initializePaymentInfo = () => {

// Build Credit Card Error Messages
const buildCreditCardErrorMessages = () => {

// Build Card Number Error Message
const buildCardNumberErrorMessage = () => app.buildErrorMessage(cardNumberInput, 'Card number must be 13-16 digits only', 'cardNumberError');

// Build Zip Code Error Message
const buildZipCodeErrorMessage = () => app.buildErrorMessage(zipCodeInput, '5 digits only', 'zipCodeError');

// Build CVV Error Message
const buildCvvErrorMessage = () => app.buildErrorMessage(cvvInput, '3 digits only', 'cvvError');

// Call Above Functions
buildCardNumberErrorMessage();
buildZipCodeErrorMessage();
buildCvvErrorMessage();
};

const initializePaymentSelect = () => {

// Select Credit Card Option
const removeDefaultOption = () => paymentSelect.firstElementChild.remove();

// Hide Paypal Div Element
const hidePaypalDiv = () => app.hideElement(paypalDiv);

// Hide Bitcoin Div Element
const hideBitcoinDiv = () => app.hideElement(bitcoinDiv);

// Handle Payment Select Element Change
const handlePaymentChange = () => {
if (paymentSelect.value === 'credit card') {
app.showElement(creditCardDiv);
app.hideElement(paypalDiv);
app.hideElement(bitcoinDiv);
} else if (paymentSelect.value === 'paypal') {
app.hideElement(creditCardDiv);
app.showElement(paypalDiv);
app.hideElement(bitcoinDiv);
} else if (paymentSelect.value === 'bitcoin') {
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

// Call Above Functions
buildCreditCardErrorMessages();
initializePaymentSelect();
};

const initializeSubmissionFooter = () => app.buildErrorMessage(submitButton, 'Please fix errors above before submission', 'generalError');

// Call Above Functions
initializeBasicInfo();
initializeTshirtInfo();
initializeActivityRegistration();
initializePaymentInfo();
initializeSubmissionFooter();
};

const initializeValidation = () => {

// Local Error Message Selection
const nameErrorMessage = app.select('#nameError');
const emailEmptyErrorMessage = app.select('#emailEmptyError');
const emailInvalidErrorMessage = app.select('#emailInvalidError');
const activityErrorMessage = app.select('#activityError');
const cardNumberErrorMessage = app.select('#cardNumberError');
const zipCodeErrorMessage = app.select('#zipCodeError');
const cvvErrorMessage = app.select('#cvvError');
const generalErrorMessage = app.select('#generalError');

// Local Error Tracker Booleans
let nameError = false;
let emailError = false;
let activityError = false;
let paymentError = false;
let cardNumberError = false;
let zipCodeError = false;
let cvvError = false;
let generalError = false;

// Regex
const emptyRegex = /^\s+$/;
const emailRegex = /^[^@]+@[a-z0-9\-]+\.[a-z]{2,}$/i;
const cardNumberRegex = /^\d{13,16}$/;
const zipCodeRegex = /^\d{5}$/;
const cvvRegex = /^\d{3}$/;

const validateName = () => {

// Error if Name Input Is Blank or Only Space Characters
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
const validateEmail = () => {

// Hold Error if just "Tabbing" from Previous Input Field
if (event.which !== 9) {
// Error if Email Input Is Blank or Only Space Characters
if (emailInput.value === '' || emptyRegex.test(emailInput.value)) {
emailError = true;
app.showElement(emailEmptyErrorMessage);
app.hideElement(emailEmptyErrorMessage);
emailInput.style.border = '2px solid firebrick';
} else {
// Error if Email Format is Invalid
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
const validateActivity = () => {

let activitiesRegistered = 0;
activityInputs.forEach(input => {
if (input.checked) {
activitiesRegistered++;
}
});
if (activitiesRegistered === 0) {
activityError = true;
app.showElement(activityErrorMessage);
} else {
activityError = false;
app.hideElement(activityErrorMessage);
}
};

const validatePayment = () => {

if (paymentSelect.value === 'credit card') {
if (!cardNumberRegex.test(cardNumberInput.value)) {
cardNumberError = true;
app.showElement(cardNumberErrorMessage);
} else {
cardNumberError = false;
app.hideElement(cardNumberErrorMessage);
}
if (!zipCodeRegex.test(zipCodeInput.value)) {
zipCodeError = true;
app.showElement(zipCodeErrorMessage);
} else {
zipCodeError = false;
app.hideElement(zipCodeErrorMessage);
}
if (!cvvRegex.test(cvvInput.value)) {
cvvError = true;
app.showElement(cvvErrorMessage);
} else {
cvvError = false;
app.hideElement(cvvErrorMessage);
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
app.hideElement(cardNumberErrorMessage);
app.hideElement(zipCodeErrorMessage);
app.hideElement(cvvErrorMessage);
}
};

// 1) Validate in Real Time
const validateInRealTime = () => {
// Validate Name Input in Real Time
nameInput.addEventListener('keyup', validateName);
// Validate Email Input
emailInput.addEventListener('keyup', validateEmail);
// Validate Activities Registration
activityInputs.forEach(input => input.addEventListener('change', validateActivity));
};

// 2) Validate on Submission
const validateOnSubmit = () => {

// Handle a Form Submission with Error Messages or Page Refresh
const handleFormSubmit = (event) => {
// Validate Name Input
validateName();
// Validate Email Input
validateEmail();
// Validate Activity Registration
validateActivity();
// validate credit card info
validatePayment();

// stop form from submitting and display general error if any errors
if (nameError || emailError || activityError || paymentError) {
event.preventDefault();
app.showElement(generalErrorMessage);
// add real time validation for duration of registration post submission-failure
cardNumberInput.addEventListener('keyup', validatePayment);
zipCodeInput.addEventListener('keyup', validatePayment);
cvvInput.addEventListener('keyup', validatePayment);
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
initializePage();
initializeValidation();
};

// II) Global Event Listener
document.addEventListener('DOMContentLoaded', initializeRegistration);
