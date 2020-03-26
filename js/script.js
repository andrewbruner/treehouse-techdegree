// global function
const initializeRegistration = () => {
    
    // local helper functions
    const setDisplay = (element, value) => {
        element.style.display = value;
    };
    
    // local initialization functions
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
    
    const initializePaymentInfo = () => {};
    
    const initializeFormValidation = () => {};
    
    
    // initialization
    initializeBasicInfo();
    initializeTshirtInfo();
    initializeActivityRegistration();
    initializePaymentInfo();
    initializeFormValidation();
};

// global event listener
document.addEventListener('DOMContentLoaded', initializeRegistration);