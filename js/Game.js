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
		const overlayDiv = document.querySelector('#overlay');
		overlayDiv.style.display = 'none';
		// get random phrase object and assign to game.activePhrase
		this.activePhrase = this.getRandomPhrase();
		// add activePhrase object to board display
		this.activePhrase.addPhraseToDisplay();
	}
	
	getRandomPhrase() {
		// get random phrase object from game.phrases and return it
		return this.phrases[Math.floor(Math.random() * this.phrases.length)];
	}
	
	handleInteraction(button) {
		// disable selected letter button
		button.disabled = true;

		const letter = button.textContent;
		// if button's letter is in the active phrase...
		if (this.activePhrase.checkLetter(letter)) {
			// add .chosen class to button
			button.classList.add('chosen');
			// call showMatchedLetter()
			this.activePhrase.showMatchedLetter(letter);
			// call checkForWin()
			// if the game is won
			if (this.checkForWin()) {
				// call gameOver()
				this.gameOver('win');
			}
			// if button's letter is NOT in the phrase
		} else {
			// add .wrong class to button
			button.classList.add('wrong');
			// call removeLife()
			this.removeLife();
		}
	}
	
	removeLife() {
		// replace one liveHeart.png with lostHeart.png
		const liveHearts = document.querySelectorAll('[src="images/liveHeart.png"]');
		liveHearts[liveHearts.length - 1].src = "images/lostHeart.png";
		// increment this.missed by 1
		this.missed++;
		// if missed is at least 5...
			if (this.missed >= 5) {
			// call gameOver()
				this.gameOver('lose');
			}
	}
	
	checkForWin() {
		// check to see if player has revealed all letters in this.activePhrase
		const hiddenLetters = document.querySelectorAll('.hide');
		return (hiddenLetters.length === 0) ? true : false;

	}
	
	gameOver(outcome) {
		// display original start screen overlay
		const overlayDiv = document.querySelector('#overlay');
		overlayDiv.style.display = '';
		// update h1 to win or loss message and .start class to win or lose
		const gameOverMessage = document.querySelector('#game-over-message');
		if (outcome === 'win') {
			gameOverMessage.textContent = 'The Force is strong with you. You win!';
			overlayDiv.classList.remove('start', 'lose');
			overlayDiv.classList.add('win');
		} else if (outcome === 'lose') {
			gameOverMessage.textContent = 'The Emperor does not share your optimistic appraisal of the situation. Try again?';
			overlayDiv.classList.remove('start', 'win');
			overlayDiv.classList.add('lose');		}
	}
}