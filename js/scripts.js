const gallery = document.querySelector('#gallery');

let users = [];

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

const appendModal = user => {
	const modalContainerDiv = document.createElement('div');
	modalContainerDiv.classList.add('modal-container');
	const modalDiv = document.createElement('div');
	modalDiv.classList.add('modal');

	// modal close button
	const modalCloseBtn = document.createElement('button');
	modalCloseBtn.type = 'button';
	modalCloseBtn.id = 'modal-close-btn';
	modalCloseBtn.classList.add('modal-close-btn');
	const modalCloseBtnStrong = document.createElement('strong');
	modalCloseBtnStrong.textContent = 'X';
	modalCloseBtn.appendChild(modalCloseBtnStrong);
	modalDiv.appendChild(modalCloseBtn);

	// modal info container
	const modalInfoContainerDiv = document.createElement('div');
	const modalImg = document.createElement('img');
	modalImg.classList.add('modal-img');
	modalImg.src = user.picture.large;
	modalImg.alt = 'profile picture';
	modalInfoContainerDiv.appendChild(modalImg);
	const modalNameH3 = document.createElement('h3');
	modalNameH3.id = `${user.name.first.toLowerCase()}${user.name.last}`;
	modalNameH3.classList.add('modal-name', 'cap');
	modalNameH3.textContent = `${user.name.first} ${user.name.last}`;
	modalInfoContainerDiv.appendChild(modalNameH3);
	const emailP = document.createElement('p');
	emailP.classList.add('modal-text');
	emailP.textContent = user.email;
	modalInfoContainerDiv.appendChild(emailP);
	const cityP = document.createElement('p');
	cityP.classList.add('modal-text', 'cap');
	cityP.textContent = user.location.city;
	modalInfoContainerDiv.appendChild(cityP);
	const modalHr = document.createElement('hr');
	modalInfoContainerDiv.appendChild(modalHr);
	const cellP = document.createElement('p');
	cellP.classList.add('modal-text');
	cellP.textContent = user.cell;
	modalInfoContainerDiv.appendChild(cellP);
	const addressP = document.createElement('p');
	addressP.classList.add('modal-text');
	addressP.textContent = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}`;
	modalInfoContainerDiv.appendChild(addressP);
	const birthdayP = document.createElement('p');
	birthdayP.classList.add('modal-text');
	const birthdate = new Date(user.dob.date);
	birthdayP.textContent = `${birthdate.getMonth() + 1}/${birthdate.getDate()}/${birthdate.getFullYear()}`;
	modalInfoContainerDiv.appendChild(birthdayP);

	modalDiv.appendChild(modalInfoContainerDiv);

	// append modal to container to body
	modalContainerDiv.appendChild(modalDiv);
	document.body.appendChild(modalContainerDiv);
};

const handleGalleryClick = event => {
	// if target is/is in a 'card'...
	if (event.target.className.includes('card')) {
		// log the card's h3's id (user's name) and) index number of user card
		console.log(event.composedPath()[event.composedPath().length - 6].lastElementChild.firstElementChild.id);
		console.log(event.composedPath()[event.composedPath().length - 6].id);
		// append their modal to the page
		appendModal(users[event.composedPath()[event.composedPath().length - 6].id]);
	}
};

const fetchUsers = () => {
	fetch('https://randomuser.me/api?nat=us&results=12')
		.then(response => response.json())
		.then(data => {
			users = data.results;
			users.forEach((user, index) => appendUser(user, index));
		});
};

fetchUsers();
gallery.addEventListener('click', handleGalleryClick);
