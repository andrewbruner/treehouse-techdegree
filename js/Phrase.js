/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
	constructor(phrase) {
		this.phrase = phrase.toLowerCase();
	}

	// add phrase to the game display
	addPhraseToDisplay() {
		// local variable
		const phraseUl = document.querySelector('#phrase').querySelector('ul');		
		// for each word in the phrase... (phrase as array of words)
		this.phrase.split(' ').forEach((word, i, phrase) => {
			const ul = document.createElement('ul');
			// and for each letter in each word... (word as array of letters)
			[...word].forEach(letter => {
				// append a letter <li> to word <ul>
				const li = document.createElement('li');
				li.classList.add('hide', 'letter', letter);
				li.textContent = letter;
				ul.appendChild(li);
			});
			// append the word <ul> to phrase <ul>
			phraseUl.append(ul);
			// and if word is not last in phrase...
			if (i < phrase.length - 1) {
				// append a space <li> to phrase <ul>
				const li = document.createElement('li');
				li.classList.add('space');
				li.textContent = ' ';
				ul.appendChild(li);
			}
		});
	}
	
	// check if letter is in phrase and return true or false
	checkLetter(letter) {
		const phrase = this.phrase;
		return phrase.includes(letter) ? true : false;
	}
	
	// change matched letter <li> element's class from .hide to .show
	showMatchedLetter(letter) {
		const lis = document.querySelectorAll(`.${letter}`);
		lis.forEach(li => {
			li.classList.remove('hide');
			li.classList.add('show');
		});
	}
}