# Team Treehouse<br>Full Stack JavaScript Techdegree<br>Unit 05

## Public API Requests

### Description

This project is an an app for a fictional company called Awesome Startup, a distributed company with remote employees working all over the world. They need a smart way for employees to share contact information with each other.

This app requests a JSON object from the Random User Generator API (https://randomuser.me) and parses the data so that 12 employees are listed in a grid with their thumbnail image, full name, email, and location. Clicking the employee’s image or name will open a modal window with more detailed information, such as the employee’s birthday and address.

Vanilla JavaScript is all that's used to build this project's logic. No frameworks, libraries or plugins have been utilized.


### Project Expectations

#### API Usage
- 12 random users are pulled from the API in a single request
- New random employee information displays each time the page refreshes

#### User Directory
- The directory displays 12 users from the Random User API, and includes the following for each user:
  - Employee Image
  - First and Last Name
  - Email
  - City or location

#### Modal Window
- Modal window displays at least the following details:
  - Employee image
  - Name
  - Email
  - City or location
  - Cell Number
  - Detailed Address, including street name and number, state or country, and post code
  - Birthday
- There is a way to close the modal window

### Extra Credit Features

#### User Directory
- Employees can be filtered by name with dynamically added search feature

#### Modal Window
- Functionality has been added to switch back and forth between employees when the detail modal window is open
- No errors in the console when the end or beginning of the list is reached

#### Structure, Style and CSS
- Background color of page body changed to "medium sea green" and font color of header changed to "white"

#### Keyboard Navigation
- Arrow keys and escape key work to navigate over and close open modal windows