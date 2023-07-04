/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
	constructor() {
		this.missed = 0;
		this.phrases = [
			new Phrase('may the force be with you'),
			new Phrase('i have a bad feeling about this'),
			new Phrase('a long time ago in a galaxy far far away'),
			new Phrase('into the garbage chute flyboy'),
			new Phrase('size matters not')
		];
		this.activePhrase = null;
	}
	
	startGame() {
		// hide start screen overlay
		document.querySelector('#overlay').style.display = 'none';
		// get random phrase object and assign as active phrase
		this.activePhrase = this.getRandomPhrase();
		// add active phrase to board display
		this.activePhrase.addPhraseToDisplay();
	}
	
	getRandomPhrase() {
		// get random phrase object from phrases array and return it
		return this.phrases[Math.floor(Math.random() * this.phrases.length)];
	}
	
	handleInteraction(button) {
		// disable selected letter button
		button.disabled = true;

		// if button's letter is in active phrase...
		if (this.activePhrase.checkLetter(button.textContent)) {
			// add chosen class to button
			button.classList.add('chosen');
			// show matched letter on display
			this.activePhrase.showMatchedLetter(button.textContent);
			// if the game is won...
			if (this.checkForWin()) {
				// display win overlay
				this.gameOver('win');
			}
		// else if button's letter is not in active phrase...
		} else {
			// add wrong class to button
			button.classList.add('wrong');
			// lose one life
			this.removeLife();
		}
	}
	
	removeLife() {
		// replace last live heart with lost heart
		const liveHearts = document.querySelectorAll('[src="images/liveHeart.png"]');
		liveHearts[liveHearts.length - 1].src = "images/lostHeart.png";
		// increment game's missed attribute by 1
		this.missed++;
		// if missed attribute is 5...
			if (this.missed === 5) {
			// display lose overlay
				this.gameOver('lose');
			}
	}
	
	checkForWin() {
		// check if all letters have been revealed (true|false)
		return (document.querySelectorAll('.hide').length === 0) ? true : false;

	}
	
	gameOver(outcome) {
		// show overlay
		const overlayDiv = document.querySelector('#overlay');
		overlayDiv.style.display = '';
		// update h1 to win or loss message and .start class to win or lose
		const gameOverMessage = document.querySelector('#game-over-message');
		if (outcome === 'win') {
			gameOverMessage.textContent = 'The Force is strong with you.';
			overlayDiv.classList.remove('start', 'lose');
			overlayDiv.classList.add('win');
		} else if (outcome === 'lose') {
			gameOverMessage.textContent = 'Try not. Do, or do not. There is no try.';
			overlayDiv.classList.remove('start', 'win');
			overlayDiv.classList.add('lose');		}
	}
}