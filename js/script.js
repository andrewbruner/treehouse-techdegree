/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/**
 * global variables
 */
const masterList = document.querySelectorAll('.student-item');
const itemsPerPage = 10;


/**
 * function to build, append, and add functionality to searchbar
 */
const appendSearchbox = () => {

    // local variable
    const pageHeaderDiv = document.querySelector('.page-header');
    
    // local function to create an element and modify its properties
    const createElement = (name, property, value) => {
        const element = document.createElement(name);
        element[property] = value;
        return element;
    };
    
    // local function to run search and display results
    const runSearch = event => {
        const searchTerm = event.target.parentElement.querySelector('input').value;
        const searchList = [];
        
        masterList.forEach(item => {
            const itemTextContent = item.querySelector('h3').textContent;
            if (itemTextContent.includes(searchTerm)) {
                searchList.push(item);
            }
        });
        
        showPage(searchList, 1);
        appendPageLinks(searchList);
    };
    
    // build searchbox
    const searchDiv = createElement('div', 'className', 'student-search');
    const searchInput = createElement('input', 'placeholder', 'Search for students...');
    const searchButton = createElement('button', 'textContent', 'Search');
        
    // add listeners for `click` and `keyup` events
    searchButton.addEventListener('click', runSearch);
    searchInput.addEventListener('keyup', runSearch);
    
    // append searchbox
    searchDiv.appendChild(searchInput);
    searchDiv.appendChild(searchButton);
    pageHeaderDiv.appendChild(searchDiv);
}


/**
 * function to show each page, using array of items and page number as parameters
 */
const showPage = (list, page) => {    
    
    // set the starting/ending index for first/last item on page
    const start = (page * itemsPerPage) - itemsPerPage;
    const end = (page * itemsPerPage) - 1;
    
    // begin by hiding all masterList items
    masterList.forEach(item => {
        item.style.display = 'none';
    });
    
    // show only list items in the index range
    list.forEach((item, i) => {
        if (i >= start && i <= end) {
            item.style.display = '';
        }
    });
};


/**
 * function to build, append and add functionality to page links
 */
const appendPageLinks = list => {

    // local variables
    const numberOfitems = list.length;
    const numberOfPageLinks = Math.ceil(numberOfitems / itemsPerPage);
    const pageDiv = document.querySelector('.page');
    
    // if pagination links exist, remove them
    if (pageDiv.lastElementChild.className === 'pagination') {
        pageDiv.lastElementChild.remove();
    }

    // if error message exists, remove it
    if (pageDiv.children[1].className === 'page-header cf') {
        pageDiv.children[1].remove();
    }
    
    // build message to display on 0 search results
    const studentListDiv = document.querySelector('.student-list');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'page-header cf';
    const errorH2 = document.createElement('h2');
    errorH2.textContent = 'No results found';
    errorDiv.appendChild(errorH2);
    pageDiv.insertBefore(errorDiv, studentListDiv);
    if (list.length === 0) {
        errorDiv.style.display = '';
    } else {
        errorDiv.style.display = 'none';
    }
    
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


/**
 * on page load, show searchbar, the first page of items, and append page links
 */
document.addEventListener('DOMContentLoaded', appendSearchbox());
document.addEventListener('DOMContentLoaded', showPage(masterList, 1));
document.addEventListener('DOMContentLoaded', appendPageLinks(masterList));
