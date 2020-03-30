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
		const randomPhrase = this.getRandomPhrase();
		this.activePhrase = randomPhrase;
		// add activePhrase object to board display
		this.activePhrase.addPhraseToDisplay();
	}
	
	getRandomPhrase() {
		// get random phrase object from game.phrases and return it
		const phrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
		return phrase;
	}
	
	handleInteraction(event) {
		const button = event.target;
		// only if event.target is a button...
		if (button.tagName === button) {
			const array = Array.from(this.activePhrase.phrase);
			// if button's letter is in the activePhrase...
			if (array.includes(button.textContent)) {
				// disable selected letter button
				button.disabled = true;
				// add .chosen class to button
				button.classList.add('chosen');
				// call showMatchedLetter()
				this.activePhrase.showMatchedLetter();
				// call checkForWin()
				this.checkForWin();
				// if the game is won
					// call gameOver()
			}
			// if button's letter is NOT in the phrase
				// add .wrong class to button
				// call removeLife()
		}
		
	}
	
	removeLife() {
		// replace one liveHeart.png with lostHeart.png
		// increment this.missed by 1
		// if missed is at least 5...
			// call gameOver()
	}
	
	checkForWin() {
		// check to see if player has revealed all letters in this.activePhrase
	}
	
	gameOver() {
		// display original start screen overlay
		// update h1 to win or loss message and .start class to win or lose
	}
}