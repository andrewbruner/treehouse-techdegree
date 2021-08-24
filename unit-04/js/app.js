/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// global game variable
let game = null;

// event handler
const handleStartButtonClick = () => {
	
	// helper function
	const startNewGame = () => {
		game = new Game();
		game.startGame();
		console.log(`Through the Force, things you will see... "${game.activePhrase.phrase}"`);
	};
	
	// if first time playing...
	if (game === null) {
		
		// start new game
		startNewGame();
		
	// else if game is restarting...
	} else if (game !== null) {
		
		// remove phrase from screen display
		document.querySelector('#phrase')
			.querySelector('ul')
			.querySelectorAll('ul')
			.forEach(ul => ul.remove());

		// reset qwerty buttons
		document.querySelector('#qwerty')
			.querySelectorAll('button')
			.forEach(button => {
				button.disabled = false;
				button.classList.remove('chosen', 'wrong');
			});

		// reset scoreboard
		document.querySelector('#scoreboard')
			.querySelectorAll('img')
			.forEach(img => img.src = 'images/liveHeart.png');
		
		// start new game
		startNewGame();
	}
};

// event handler
const handleQwertyButtonClick = event => {
	if (event.target.tagName === 'BUTTON') {
		game.handleInteraction(event.target);
	}
};

// event handler
const handleKeyup = event => {
	
	// if overlay is displayed...
	if (document.querySelector('#overlay').style.display !== 'none') {
		
		// and if enter key was pressed...
		if (event.key === 'Enter') {
			
			// handle a start button click
			handleStartButtonClick();
		}
		
	// else if overlay is hidden...
	} else if (document.querySelector('#overlay').style.display === 'none') {
		
		// and if letter key was pressed...
		if (/[a-z]/i.test(event.key)) {
			
			// find the matching valid qwerty key...
			document.querySelectorAll('.key')
				.forEach(button => {
					if (button.textContent === event.key.toLowerCase()
						&& !button.className.includes('chosen')
						&& !button.className.includes('wrong')) {
						
							// and handle a qwerty button interaction
							game.handleInteraction(button);
					}
				});
		}
	}
};

// event listener for start button click
document.querySelector('#btn__reset')
	.addEventListener('click', handleStartButtonClick);

// event listener for qwerty button clicks
document.querySelector('#qwerty')
	.addEventListener('click', handleQwertyButtonClick);

// event listener for keyup events
document.addEventListener('keyup', handleKeyup);