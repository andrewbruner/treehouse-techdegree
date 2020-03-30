/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
	constructor() {
		this.missed = 0;
		this.phrases = [
			{phrase: 'may the force be with you'},
			{phrase: 'i have a bad feeling about this'},
			{phrase: 'a long time ago in a galaxy far far away'},
			{phrase: 'into the garbage chute flyboy'},
			{phrase: 'size matters not'}
		];
		this.activePhrase = null;
	}
	
	startGame() {}
	getRandomPhrase() {}
	handleInteraction() {}
	removeLife() {}
	checkForWin() {}
	gameOver() {}
}