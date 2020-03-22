/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// global variables
const masterList = document.querySelectorAll('.student-item');
const itemsPerPage = 10;


// function to show each page, passing in array of items and page number to show
const showPage = (list, page) => {
    
    // set the starting/ending index for first/last item on page
    const start = (page * itemsPerPage) - itemsPerPage;
    const end = (page * itemsPerPage) - 1;
    
    // show only the list items in the starting/ending index range
    for (let i = 0; i < list.length; i++) {
        if (i < start || i > end) {
            list[i].style.display = 'none';
        } else {
            list[i].style.display = '';
        }
    }
};

// function to build, append and add functionality to page links
const appendPageLinks = list => {
    
    // local variables
    const numberOfitems = list.length;
    const numberOfPageLinks = Math.ceil(numberOfitems / itemsPerPage);
    const pageDiv = document.querySelector('.page');
    
    // create .pagination <div> and <ul> elements
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'pagination';
    const paginationUl = document.createElement('ul');
    
    // create .pagination <li> and <a> elements
    for (let i = 0; i < numberOfPageLinks; i++) {
        
        const paginationLi = document.createElement('li');
        paginationLi.style.cursor = 'pointer';
        
        const paginationA = document.createElement('a');
        paginationA.attributes.href = '#';
        paginationA.textContent = i + 1;
        if (i === 0) {
            paginationA.className = 'active';
        }
        
        // add functionality to <a> elements when clicked
        paginationA.addEventListener('click', (event) => {
            const array = document.querySelectorAll('.pagination a');
            const page = event.target.textContent;
            
            for (i = 0; i < numberOfPageLinks; i++) {
                if (i === page - 1) {
                    array[i].className = 'active';
                } else {
                    array[i].className = '';
                }
            }
            
            showPage(list, page);
        });
        
        // finish building .pagination <li> and <a> elements
        paginationLi.appendChild(paginationA);
        paginationUl.appendChild(paginationLi);
    }
    
    // finish building .pagination <div> and <ul> elements
    paginationDiv.appendChild(paginationUl);    
    pageDiv.appendChild(paginationDiv);
    
};

// on page load, show the first page of items and append page links
document.addEventListener('DOMContentLoaded', showPage(masterList, 1));
document.addEventListener('DOMContentLoaded', appendPageLinks(masterList));
