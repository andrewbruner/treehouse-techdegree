# Team Treehouse<br>Full Stack JavaScript Techdegree<br>Unit 03

## Interactive Form

### Description

This project uses JavaScript to enhance an interactive registration form for a fictional conference called "FullStack Conf."

Using the supplied HTML and CSS files, the included JavaScript file makes the form more user-friendly by:

- adding customized and conditional behavior and interactivity
- validating user input and providing helpful error messages when the user enters invalid information into the form fields

### Project Expectations

#### Page Display/Functionality
- Form initially sets focus on the Name input field
- 'Your Job Role' input field only displays when 'Other' is selected from the Job Role dropdown
- Tshirt color options are updated corresponding with which design is selected
- User cannot select two activities that are scheduled for the same time
- The total cost of all registered activities is displayed below the Activities section
- The 'Credit Card' payment option is selected by default
- The page display updates with which payment option is selected
- When JavaScript is disabled, all form fields/information are displayed to the user

#### Page Validation
- Form can only be submitted if all of the following are true:
	- Name input is not blank
	- Email is present and of valid format e.g. `name@example.com`
	- At least one activity input is checked
	- If 'Credit Card' is selected, fields contain a 13-16 digit card number, 5 digit zip code, and 3 digit CVV
- On submission, form displays error messages indicating which of the above requirements is not met.

### Extra Credit Features

- **Tshirt Selection:** Color option dropdown is hidden until a Tshirt theme is selected
- **Real-time Error Message:** Form provides name, email and activity error messages in real-time
- **Conditional Error Message:** Email error message(s) change depending on which error has occurred