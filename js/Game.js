/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
	constructor() {
		this.missed = 0;
		this.phrases = this.createPhrases();
		this.activePhrase = null;
	}
	/**
	* Creates phrases for use in game
	* @return {array} An array of phrases that could be used in the game
	*/
	createPhrases() {
		const phrases = [];
		const phrase1 = {phrase: 'may the force be with you'};
		const phrase2 = {phrase: 'i have a bad feeling about this'};
		const phrase3 = {phrase: 'a long time ago in a galaxy far far away'};
		const phrase4 = {phrase: 'into the garbage chute flyboy'};
		const phrase5 = {phrase: 'size matters not'};
		phrases.push(phrase1);
		phrases.push(phrase2);
		phrases.push(phrase3);
		phrases.push(phrase4);
		phrases.push(phrase5);
		return phrases;
	}
}