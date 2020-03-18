/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

// For assistance: 
  // Check the "Project Resources" section of the project instructions
  // Reach out in your Slack community - https://treehouse-fsjs-102.slack.com/app_redirect?channel=chit-chat

/*** 
 * `quotes` array 
***/
const quotes = [
    {
        quote: 'It is a far, far better thing that I do, than I have ever done; it is a far, far better rest I go to than I have ever known.',
        source: 'Charles Dickens',
        citation: 'A Tale of Two Cities',
        year: '1859'
    },
    {
        quote: 'All we have to decide is what to do with the time that is given us.',
        source: 'J.R.R. Tolkein',
        citation: 'The Fellowship of the Ring',
        year: '1954'
    },
    {
        quote: 'You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. You’re on your own. And you know what you know. And YOU are the one who’ll decide where to go...',
        source: 'Dr. Seuss',
        citation: 'Oh, the Places You’ll Go!',
        year: '1990'
    },
    {
        quote: 'It matters not what someone is born, but what they grow to be.',
        source: 'J.K. Rowling',
        citation: 'Harry Potter and the Goblet of Fire',
        year: '2000'
    },
    {
        quote: 'But I, being poor, have only my dreams; / I have spread my dreams under your feet; / Tread softly because you tread on my dreams.',
        source: 'W.B. Yeats',
        citation: 'He Wishes for the Cloths of Heaven',
        year: '1899'
    }
];

console.log(quotes);


/***
 * `getRandomQuote` function
***/



/***
 * `printQuote` function
***/



/***
 * click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);