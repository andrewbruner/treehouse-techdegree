const gallery = document.querySelector('#gallery');

const fetchUser = () => {
	fetch('https://randomuser.me/api')
		.then(response => response.json())
		.then(data => {
			const user = data.results[0];
			const card = document.createElement('div');
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
		});
};

for (let i = 0; i < 12; i++) {
	fetchUser();
}
