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
        const punColorOptions = [colorSelect[0], colorSelect[1], colorSelect[2]];
        const heartColorOptions = [colorSelect[3], colorSelect[4], colorSelect[5]];
        
        const handleDesignSelectChange = (event) => {
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
    
    const initializeActivityRegistration = () => {};
    
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