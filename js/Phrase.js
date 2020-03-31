/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
	constructor(phrase) {
		this.phrase = phrase.toLowerCase();
	}

	addPhraseToDisplay() {
		const div = document.querySelector('#phrase');
		const ul = div.querySelector('ul');
		
		const array = Array.from(this.phrase);
		let word = [];
		
		array.forEach(character => {
			if (character !== ' ') {
				word.push(character);
			} else if (character === ' ') {
				const wordUl = document.createElement('ul');
				word.forEach(letter => {
					const li = document.createElement('li');
					li.classList.add('hide', 'letter', letter);
					li.textContent = letter;
					wordUl.appendChild(li);
				});
				word = [];
				ul.appendChild(wordUl);
				
				const li = document.createElement('li');
				li.classList.add('space');
				li.textContent = ' ';
				ul.appendChild(li);
			}
		});
		
		const wordUl = document.createElement('ul');
		word.forEach(letter => {
			const li = document.createElement('li');
			li.classList.add('hide', 'letter', letter);
			li.textContent = letter;
			wordUl.appendChild(li);
		});
		word = [];
		ul.appendChild(wordUl);		
	}
	
	// check if letter is in phrase and return true or false
	checkLetter(letter) {
		const phrase = this.phrase;
		return phrase.includes(letter) ? true : false;
	}
	
	// change all li elements' classes whose class matches letter from hide to show
	showMatchedLetter(letter) {
		const lis = document.querySelectorAll(`.${letter}`);
		lis.forEach(li => {
			li.classList.remove('hide');
			li.classList.add('show');
		});
	}
}