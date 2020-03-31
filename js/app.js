/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const startButton = document.querySelector('#btn__reset');
const qwertyDiv = document.querySelector('#qwerty');
let game = '';

const startButtonClick = () => {
	// new game object
	game = new Game();
	
	// remove all phrase lis
	const phraseDiv = document.querySelector('#phrase');
	const ul = phraseDiv.querySelector('ul');
	const lis = ul.querySelectorAll('li');
	lis.forEach(li => li.remove());
	
	// reset letter buttons
	const letterButtons = qwertyDiv.querySelectorAll('button');
	letterButtons.forEach(button => {
		button.disabled = false;
		button.classList.remove('chosen', 'wrong');
		button.classList.add('key');
	});
	
	// reset hearts
	const scoreboard = document.querySelector('#scoreboard');
	const hearts = scoreboard.querySelectorAll('img');
	hearts.forEach(heart => heart.src = 'images/liveHeart.png');
	
	// start new game
	game.startGame();
	console.log(game.activePhrase);
};

startButton.addEventListener('click', startButtonClick);

// letter button listeners
qwertyDiv.addEventListener('click', (event) => {
	if (event.target.tagName === 'BUTTON') {
		game.handleInteraction(event.target);
	}
});

document.addEventListener('keyup', (event) => {
	const overlay = document.querySelector('#overlay');
	const letter = event.key.toLowerCase();
	const regex = /[a-z]/;
	
	if (overlay.style.display === 'none') {
		if (regex.test(letter)) {
			const buttons = document.querySelectorAll('.key');
			buttons.forEach(button => {
				if (button.textContent === letter && !button.className.includes('chosen') && !button.className.includes('wrong')) {
					game.handleInteraction(button);
				}
			});
		}
	} else {
		if (letter === 'enter') {
			startButtonClick();
		}
	}
});