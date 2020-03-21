/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const studentList = document.querySelectorAll('.student-item');
const numberPerPage = 10;

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
// function to show each page, passing in array of total students and page number to show
const showPage = (students, pageNumber) => {
    
    // set the starting index for first student on page
    const startIndex = (pageNumber * numberPerPage) - numberPerPage;
    // set the ending index for the last student on page
    const endIndex = (pageNumber * numberPerPage) - 1;
    
    // for each student in students
    for (let i = 0; i < students.length; i++) {
        // if the student's index is between the starting and ending indexes
        if (i >= startIndex && i <= endIndex) {
            // show that student
            students[i].style.display = '';
        // else if student's index is outside the starting and ending indexes
        } else if (i < startIndex || i > endIndex) {
            // hide that student
            students[i].style.display = 'none';
        }
    }
};


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = students => {
    const numberOfStudents = students.length;
    const numberOfPageLinks = Math.ceil(numberOfStudents / numberPerPage);
    const pageDiv = document.querySelector('.page');
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'pagination';
    const paginationUl = document.createElement('ul');
    
    for (let i = 1; i <= numberOfPageLinks; i++) {
        
        const paginationLi = document.createElement('li');
        
        const paginationA = document.createElement('a');
        paginationA.attributes.href = '#';
        paginationA.textContent = i;
        paginationA.addEventListener('click', (event) => {
            showPage(studentList, event.target.textContent);
            event.target.className = 'active';
        });
        
        paginationLi.appendChild(paginationA);
        paginationUl.appendChild(paginationLi);
    }
    
    paginationDiv.appendChild(paginationUl);
    
    showPage(students, 1);
    
    pageDiv.appendChild(paginationDiv);
    
};

document.addEventListener('DOMContentLoaded', appendPageLinks(studentList));

// Remember to delete the comments that came with this file, and replace them with your own code comments.