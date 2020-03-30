/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const startButton = document.querySelector('#btn__reset');

const game = new Game();

startButton.addEventListener('click', () => {
	game.startGame();
});