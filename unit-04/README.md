# Team Treehouse<br>Full Stack JavaScript Techdegree<br>Unit 04

## Object-Oriented Programming (OOP) Gameshow App

### Description

This project showcases a browser-based, word guessing game: "Phrase Hunter." Using JavaScript and OOP (Object-Oriented Programming) to select a random, hidden phrase, the player tries to guess it by clicking letters on an onscreen keyboard.

***If the player wishes to use the "Force of the Console," they may find phrases easier to hunt.***

### Project Expectations

- Use of a Phrase and Game class to help manage game logic

	#### Phrase Class Constructor Properties & Methods:
- `phrase`
- `addPhraseToDisplay()`
- `checkLetter()`
- `showMatchedLetter()`

	#### Game Class Constructor Properties & Methods:
- `missed`
- `phrases`
- `activePhrase`
- `startGame()`
- `getRandomPhrase()`
- `handleInteraction()`
- `checkForWin()`
- `removeLife()`
- `gameOver()`

	#### app.js Functionality
- Clicking 'Start Game' button creates a new Game object and starts a new game
- Clicking a button on the onscreen keyboard initiates a `handleInteraction()` call
- Clicking the spaces between the keyboard buttons does *not* initiate a `handleInteraction()` call
- After the game is either won or lost, player can start a new game from the Game Over screen

### Extra Credit Features

- Player can use a physical keyboard to initiate the `handleInteraction()` call

	#### Personalized App Styles:
- App font import changed to 'Poller One'
- Themed background-image added to start, main, win, and lose overlays
- Text color changed, and text-shadow/box-shadow added to title, game over message, and start button to help distinguish from new backgrounds
