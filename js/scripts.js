const searchContainer = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');

let masterUsers = []
let users = [];
let currentUserIndex = null;

const hideElement = element => {element.style.transition = '0s'; element.style.visibility = 'hidden';};

const showElement = element => {element.style.visibility = ''; element.style.transition = '';};

const handleFormSubmit = (event) => {
	event.preventDefault();
	const searchterm = event.target.firstElementChild.value.toLowerCase();
	users = [];
	masterUsers.forEach(user => {
		if (user.name.first.toLowerCase().includes(searchterm) || user.name.last.toLowerCase().includes(searchterm)) {
			users.push(user);
		}
	});
	gallery.querySelectorAll('.card').forEach(card => card.remove());
	users.forEach((user, index) => appendUser(user, index));
};

const appendSearchbar = () => {
	const form = document.createElement('form');
	form.addEventListener('submit', handleFormSubmit);
	form.action = '#';
	form.method = 'get';
	const search = document.createElement('input');
	search.type = 'search';
	search.id = 'search-input';
	search.classList.add('search-input');
	search.placeholder = 'Search...';
	const submit = document.createElement('input');
	submit.type = 'submit';
	submit.id = 'search-submit';
	submit.classList.add('search-submit');
	form.appendChild(search);
	form.appendChild(submit);
	searchContainer.appendChild(form);
};

const appendUser = (user, index) => {
	const card = document.createElement('div');
	card.id = index;
	card.classList.add('card');
	const cardImgContainer = document.createElement('div');
	cardImgContainer.classList.add('card-img-container');
	const cardImg = document.createElement('img');
	cardImg.classList.add('card-img');
	cardImg.src = user.picture.large;
	cardImg.alt = 'profile picture';
	cardImgContainer.appendChild(cardImg);
	card.appendChild(cardImgContainer);
	const cardInfoContainer = document.createElement('div');
	cardInfoContainer.classList.add('card-info-container');
	const name = document.createElement('h3');
	name.id = `${user.name.first.toLowerCase()}${user.name.last}`;
	name.classList.add('card-name', 'cap');
	name.textContent = `${user.name.first} ${user.name.last}`;
	cardInfoContainer.appendChild(name);
	const email = document.createElement('p');
	email.classList.add('card-text');
	email.textContent = user.email;
	cardInfoContainer.appendChild(email);
	const location = document.createElement('p');
	location.classList.add('card-text', 'cap');
	location.textContent = `${user.location.city}, ${user.location.state}`;
	cardInfoContainer.appendChild(location);
	card.appendChild(cardInfoContainer);
	gallery.appendChild(card);
};

const handleModalBtnClick = (event) => {
	if (event.target.id === 'modal-close-btn' || event.target.textContent === 'X') {
		document.body.lastElementChild.remove();
	} else if (event.target.id === 'modal-prev') {
		currentUserIndex--;
		if (currentUserIndex === 0) {
			hideElement(event.target);
			showElement(event.target.nextElementSibling);
		} else if (currentUserIndex === users.length - 2) {
			showElement(event.target.nextElementSibling);
		}

		const modalInfo = document.querySelector('.modal-info-container');
		const img = modalInfo.querySelector('img');
		const name = modalInfo.querySelector('h3');
		const info = modalInfo.querySelectorAll('p');
		const email = info[0];
		const city = info[1];
		const cell = info[2];
		const address = info[3];
		const birthday = info[4];

		img.src = users[currentUserIndex].picture.large;
		name.id = `${users[currentUserIndex].name.first.toLowerCase()}${users[currentUserIndex].name.last}`;
		name.textContent = `${users[currentUserIndex].name.first} ${users[currentUserIndex].name.last}`;
		email.textContent = users[currentUserIndex].email;
		city.textContent = users[currentUserIndex].location.city;
		cell.textContent = users[currentUserIndex].cell;
		address.textContent = `${users[currentUserIndex].location.street.number} ${users[currentUserIndex].location.street.name}, ${users[currentUserIndex].location.city}, ${users[currentUserIndex].location.state} ${users[currentUserIndex].location.postcode}`;
		const birthdate = new Date(users[currentUserIndex].dob.date);
		birthday.textContent = `${birthdate.getMonth() + 1}/${birthdate.getDate()}/${birthdate.getFullYear()}`;


	} else if (event.target.id === 'modal-next') {
		currentUserIndex++;
		if (currentUserIndex === users.length - 1) {
			hideElement(event.target);
			showElement(event.target.previousElementSibling);
		} else if (currentUserIndex === 1) {
			showElement(event.target.previousElementSibling);
		}

		const modalInfo = document.querySelector('.modal-info-container');
		const img = modalInfo.querySelector('img');
		const name = modalInfo.querySelector('h3');
		const info = modalInfo.querySelectorAll('p');
		const email = info[0];
		const city = info[1];
		const cell = info[2];
		const address = info[3];
		const birthday = info[4];

		img.src = users[currentUserIndex].picture.large;
		name.id = `${users[currentUserIndex].name.first.toLowerCase()}${users[currentUserIndex].name.last}`;
		name.textContent = `${users[currentUserIndex].name.first} ${users[currentUserIndex].name.last}`;
		email.textContent = users[currentUserIndex].email;
		city.textContent = users[currentUserIndex].location.city;
		cell.textContent = users[currentUserIndex].cell;
		address.textContent = `${users[currentUserIndex].location.street.number} ${users[currentUserIndex].location.street.name}, ${users[currentUserIndex].location.city}, ${users[currentUserIndex].location.state} ${users[currentUserIndex].location.postcode}`;
		const birthdate = new Date(users[currentUserIndex].dob.date);
		birthday.textContent = `${birthdate.getMonth() + 1}/${birthdate.getDate()}/${birthdate.getFullYear()}`;

	}
};

const appendModal = (user, index) => {
	// update currentUserIndex
	currentUserIndex = Number(index);

	// modal container
	const modalContainerDiv = document.createElement('div');
	modalContainerDiv.classList.add('modal-container');
	// modal
	const modalDiv = document.createElement('div');
	modalDiv.classList.add('modal');
	// modal close button
	const modalCloseBtn = document.createElement('button');
	modalCloseBtn.type = 'button';
	modalCloseBtn.id = 'modal-close-btn';
	modalCloseBtn.classList.add('modal-close-btn');
	modalCloseBtn.addEventListener('click', handleModalBtnClick);
	const modalCloseBtnStrong = document.createElement('strong');
	modalCloseBtnStrong.textContent = 'X';
	modalCloseBtn.appendChild(modalCloseBtnStrong);
	modalDiv.appendChild(modalCloseBtn);
	// modal info container
	const modalInfoContainerDiv = document.createElement('div');
	modalInfoContainerDiv.classList.add('modal-info-container');
	// modal img
	const modalImg = document.createElement('img');
	modalImg.classList.add('modal-img');
	modalImg.src = user.picture.large;
	modalImg.alt = 'profile picture';
	modalInfoContainerDiv.appendChild(modalImg);
	// modal name
	const modalNameH3 = document.createElement('h3');
	modalNameH3.id = `${user.name.first.toLowerCase()}${user.name.last}`;
	modalNameH3.classList.add('modal-name', 'cap');
	modalNameH3.textContent = `${user.name.first} ${user.name.last}`;
	modalInfoContainerDiv.appendChild(modalNameH3);
	// modal email
	const emailP = document.createElement('p');
	emailP.classList.add('modal-text');
	emailP.textContent = user.email;
	modalInfoContainerDiv.appendChild(emailP);
	// modal city
	const cityP = document.createElement('p');
	cityP.classList.add('modal-text', 'cap');
	cityP.textContent = user.location.city;
	modalInfoContainerDiv.appendChild(cityP);
	// modal hr
	const modalHr = document.createElement('hr');
	modalInfoContainerDiv.appendChild(modalHr);
	// modal cell
	const cellP = document.createElement('p');
	cellP.classList.add('modal-text');
	cellP.textContent = user.cell;
	modalInfoContainerDiv.appendChild(cellP);
	// modal address
	const addressP = document.createElement('p');
	addressP.classList.add('modal-text');
	addressP.textContent = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}`;
	modalInfoContainerDiv.appendChild(addressP);
	// modal birthday
	const birthdayP = document.createElement('p');
	birthdayP.classList.add('modal-text');
	const birthdate = new Date(user.dob.date);
	birthdayP.textContent = `${birthdate.getMonth() + 1}/${birthdate.getDate()}/${birthdate.getFullYear()}`;
	modalInfoContainerDiv.appendChild(birthdayP);

	// append modal info container to modal
	modalDiv.appendChild(modalInfoContainerDiv);

	// append modal to modal container
	modalContainerDiv.appendChild(modalDiv);

	if (users.length > 1) {
		// modal btn container
		const modalBtnContainerDiv = document.createElement('div');
		modalBtnContainerDiv.classList.add('modal-btn-container');
		const modalPrevBtn = document.createElement('button');
		modalPrevBtn.type = 'button';
		modalPrevBtn.id = 'modal-prev';
		modalPrevBtn.classList.add('modal-prev', 'btn');
		modalPrevBtn.textContent = 'Prev';
		modalPrevBtn.addEventListener('click', handleModalBtnClick);
		if (currentUserIndex === 0) {
			hideElement(modalPrevBtn);
		}
		modalBtnContainerDiv.appendChild(modalPrevBtn);
		const modalNextBtn = document.createElement('button');
		modalNextBtn.type = 'button';
		modalNextBtn.id = 'modal-next';
		modalNextBtn.classList.add('modal-next', 'btn');
		modalNextBtn.textContent = 'Next';
		modalNextBtn.addEventListener('click', handleModalBtnClick);
		if (currentUserIndex === users.length - 1) {
			hideElement(modalNextBtn);
		}
		modalBtnContainerDiv.appendChild(modalNextBtn);
	
		// append modal btn container to modal container
		modalContainerDiv.appendChild(modalBtnContainerDiv);
	}

	// append modal container to body
	document.body.appendChild(modalContainerDiv);
};

const handleGalleryClick = event => {
	// if target is/is in a 'card'...
	if (event.target.className.includes('card')) {
		// append their modal to the page
		appendModal(users[event.composedPath()[event.composedPath().length - 6].id],
			    event.composedPath()[event.composedPath().length - 6].id);
	}
};

const fetchUsers = () => {
	fetch('https://randomuser.me/api?nat=us&results=12')
		.then(response => response.json())
		.then(data => {
			masterUsers = data.results;
			masterUsers.forEach(user => users.push(user));
			users.forEach((user, index) => appendUser(user, index));
		});
};

appendSearchbar();
fetchUsers();
gallery.addEventListener('click', handleGalleryClick);
