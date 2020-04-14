// helper functions
const select = selector => document.querySelector(selector);

const selectAll = selector => document.querySelectorAll(selector);

const create = element => document.createElement(element);

const hideElement = element => {
	element.style.transition = '0s';
	element.style.visibility = 'hidden';
};

const showElement = element => {
	element.style.visibility = '';
	element.style.transition = '';
};

// global variable selection
const gallery = select('#gallery');

// global array declaration
let masterUsers = [];
let users = [];
let currentUserIndex = null;

const handleFormSubmit = (event) => {
	// prevent form submission
	if (event.type === 'submit') {
		event.preventDefault();
	}
	// reset gallery
	gallery.querySelectorAll('.card').forEach(card => card.remove());
	// reset users
	users = [];
	// set searchterm
	const searchInput = select('#search-input');
	const searchterm = searchInput.value.toLowerCase();
	// collect matching users
	masterUsers.forEach(user => {
		if (user.name.first.toLowerCase().includes(searchterm) || user.name.last.toLowerCase().includes(searchterm)) {
			users.push(user);
		}
	});
	// append matching users
	users.forEach((user, index) => appendUser(user, index));
};

const appendSearchbar = () => {
	// parent element selection
	const searchContainer = select('.search-container');
	// create form element
	const form = create('form');
	form.action = '#';
	form.method = 'get';
	form.addEventListener('submit', handleFormSubmit);
	// create search input
	const search = create('input');
	search.type = 'search';
	search.id = 'search-input';
	search.classList.add('search-input');
	search.placeholder = 'Search...';
	search.addEventListener('keyup', handleFormSubmit);
	// create submit input
	const submit = create('input');
	submit.type = 'submit';
	submit.id = 'search-submit';
	submit.classList.add('search-submit');
	// append all to searchContainer
	form.appendChild(search);
	form.appendChild(submit);
	searchContainer.appendChild(form);
};

const handleModalBtnClick = (event) => {
	// element selection
	const modalInfo = document.querySelector('.modal-info-container');
	const img = modalInfo.querySelector('img');
	const name = modalInfo.querySelector('h3');
	const info = modalInfo.querySelectorAll('p');
	const email = info[0];
	const city = info[1];
	const cell = info[2];
	const address = info[3];
	const birthday = info[4];
	// helper function
	const updateModalInfo = () => {
		const currentUser = users[currentUserIndex];
		img.src = currentUser.picture.large;
		name.id = `${currentUser.name.first.toLowerCase()}${currentUser.name.last}`;
		name.textContent = `${currentUser.name.first} ${currentUser.name.last}`;
		email.textContent = currentUser.email;
		city.textContent = currentUser.location.city;
		cell.textContent = currentUser.cell;
		address.textContent = `${currentUser.location.street.number} ${currentUser.location.street.name}, ${currentUser.location.city}, ${currentUser.location.state} ${currentUser.location.postcode}`;
		const birthdate = new Date(currentUser.dob.date);
		birthday.textContent = `${birthdate.getMonth() + 1}/${birthdate.getDate()}/${birthdate.getFullYear()}`;
	};
	// if close button click or escape key press...
	if (event.target.id === 'modal-close-btn' || event.target.textContent === 'X' || event.key === 'Esc' || event.key === 'Escape') {
		// remove modal from document
		document.body.lastElementChild.remove();
	// else if prev button click or left arrow press (and not showing first user)
	} else if (event.target.id === 'modal-prev' || (event.key === 'ArrowLeft' && currentUserIndex !== 0)) {
		// update currentUserIndex
		currentUserIndex--;
		// update modal information
		updateModalInfo();
		// if current user is first in list...
		if (currentUserIndex === 0) {
			// hide the prev button
			hideElement(document.querySelector('#modal-prev'));
			// show the next button
			showElement(document.querySelector('#modal-next'));
		// else make sure next button is shown
		} else {
			showElement(document.querySelector('#modal-next'));
		}
	// else if next button click or right arrow press (and not showing last user)
	} else if (event.target.id === 'modal-next' || (event.key === 'ArrowRight' && currentUserIndex !== users.length - 1)) {
		// update currentUserIndex
		currentUserIndex++;
		// update modal information
		updateModalInfo();
		// if current user is last in list...
		if (currentUserIndex === users.length - 1) {
			// hide the next button
			hideElement(document.querySelector('#modal-next'));
			// show the next button
			showElement(document.querySelector('#modal-prev'));
		// else make sure prev button is shown
		} else {
			showElement(document.querySelector('#modal-prev'));
		}
	}
};

const appendModal = (user, index) => {
	// update currentUserIndex
	currentUserIndex = Number(index);
	// create container
	const container = document.createElement('div');
	container.classList.add('modal-container');
		// create modal
		const modal = document.createElement('div');
		modal.classList.add('modal');
			// create close button
			const closeBtn = document.createElement('button');
			closeBtn.type = 'button';
			closeBtn.id = 'modal-close-btn';
			closeBtn.classList.add('modal-close-btn');
			closeBtn.addEventListener('click', handleModalBtnClick);
				// create/append close button's strong tag
				const strong = document.createElement('strong')
				strong.textContent = 'X';
				closeBtn.appendChild(strong);
			// append close button
			modal.appendChild(closeBtn);
			// create info container
			const infoContainer = document.createElement('div');
			infoContainer.classList.add('modal-info-container');
				// create/apend img
				const img = document.createElement('img');
				img.classList.add('modal-img');
				img.src = user.picture.large;
				img.alt = 'profile picture';
				infoContainer.appendChild(img);
				// create/append name
				const name = document.createElement('h3');
				name.id = `${user.name.first.toLowerCase()}${user.name.last}`;
				name.classList.add('modal-name', 'cap');
				name.textContent = `${user.name.first} ${user.name.last}`;
				infoContainer.appendChild(name);
				// create/append email
				const email = document.createElement('p');
				email.classList.add('modal-text');
				email.textContent = user.email;
				infoContainer.appendChild(email);
				// create/append city
				const city = document.createElement('p');
				city.classList.add('modal-text', 'cap');
				city.textContent = user.location.city;
				infoContainer.appendChild(city);
				// create/append hr
				const hr = document.createElement('hr');
				infoContainer.appendChild(hr);
				// create/append cell
				const cell = document.createElement('p');
				cell.classList.add('modal-text');
				cell.textContent = user.cell;
				infoContainer.appendChild(cell);
				// create/append address
				const address = document.createElement('p');
				address.classList.add('modal-text');
				address.textContent = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}`;
				infoContainer.appendChild(address);
				// create/append birthday
				const birthday = document.createElement('p');
				birthday.classList.add('modal-text');
				const birthdate = new Date(user.dob.date);
				birthday.textContent = `${birthdate.getMonth() + 1}/${birthdate.getDate()}/${birthdate.getFullYear()}`;
				infoContainer.appendChild(birthday);
			// append modal info container
			modal.appendChild(infoContainer);
		// append modal
		container.appendChild(modal);
		// only if more than one user...
		if (users.length > 1) {
			// create btn container
			const btnContainer = document.createElement('div');
			btnContainer.classList.add('modal-btn-container');
				// create prev button
				const prevBtn = document.createElement('button');
				prevBtn.type = 'button';
				prevBtn.id = 'modal-prev';
				prevBtn.classList.add('modal-prev', 'btn');
				prevBtn.textContent = 'Prev';
				prevBtn.addEventListener('click', handleModalBtnClick);
				// if current user is first in list...
				if (currentUserIndex === 0) {
					// hide prev button
					hideElement(prevBtn);
				}
				// append prev button
				btnContainer.appendChild(prevBtn);
				//create next button
				const nextBtn = document.createElement('button');
				nextBtn.type = 'button';
				nextBtn.id = 'modal-next';
				nextBtn.classList.add('modal-next', 'btn');
				nextBtn.textContent = 'Next';
				nextBtn.addEventListener('click', handleModalBtnClick);
				// if current user is last in list...
				if (currentUserIndex === users.length - 1) {
					// hide next button
					hideElement(nextBtn);
				}
				// append next button
				btnContainer.appendChild(nextBtn);
			// append btn container
			container.appendChild(btnContainer);
		}
	// append container
	document.body.appendChild(container);
};

const handleGalleryClick = event => {
	// if target is or is in a 'card'...
	if (event.target.className.includes('card')) {
		// use composedPath() to select the user's card id/index
		const cardIndex = event.composedPath()[event.composedPath().length - 6].id;
		// append user's modal to the page
		appendModal(users[cardIndex], cardIndex);
	}
};

const appendUser = (user, index) => {
	// create card
	const card = create('div');
	card.id = index;
	card.classList.add('card');
		// create imgContainer
		const imgContainer = create('div');
		imgContainer.classList.add('card-img-container');
			// create/append img
			const img = create('img');
			img.classList.add('card-img');
			img.src = user.picture.large;
			img.alt = 'profile picture';
			imgContainer.appendChild(img);
		// append imgContainer
		card.appendChild(imgContainer);
		// create infoContainer
		const infoContainer = create('div');
		infoContainer.classList.add('card-info-container');
			// create/append name
			const name = create('h3');
			name.id = `${user.name.first.toLowerCase()}${user.name.last}`;
			name.classList.add('card-name', 'cap');
			name.textContent = `${user.name.first} ${user.name.last}`;
			infoContainer.appendChild(name);
			// create/append email
			const email = create('p');
			email.classList.add('card-text');
			email.textContent = user.email;
			infoContainer.appendChild(email);
			// create/append location
			const location = create('p');
			location.classList.add('card-text', 'cap');
			location.textContent = `${user.location.city}, ${user.location.state}`;
			infoContainer.appendChild(location);
		// append infoContainer
		card.appendChild(infoContainer);
	// append card
	gallery.appendChild(card);
	gallery.addEventListener('click', handleGalleryClick);
};

// async function
const getUsers = async url => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		const message = document.createElement('p');
		message.style.color = 'white';
		message.textContent = `Sorry, there was an error: ${error.message}`;
		gallery.appendChild(message);
		console.error(error);
	}
};

const initiateDirectory = () => {
	getUsers('https://randomuser.me/api?nat=us&results=12')
		.then(data => {
			// append searchbar
			appendSearchbar();
			// add listener for keyboard functionality
			document.addEventListener('keyup', (event) => {
				// only if modal is displayed...
				if (document.body.lastElementChild.className === 'modal-container') {
					// and only if key is arrow left or right, or escape...
					if (event.key === 'ArrowLeft' ||
						event.key === 'ArrowRight' ||
						event.key === 'Esc' ||
						event.key === 'Escape') {
							// initiate modal button click event
							handleModalBtnClick(event);
					}
				}
			});
			// assign results to masterUsers array
			masterUsers = data.results;
			// populate the working user array
			masterUsers.forEach(user => users.push(user));
			// append users from working user array
			users.forEach((user, index) => appendUser(user, index));
		});
};

// fetch and append new list of users from API
document.addEventListener('DOMContentLoaded', initiateDirectory);

