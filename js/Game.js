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
	
	handleInteraction() {}
	removeLife() {}
	checkForWin() {}
	gameOver() {}
}