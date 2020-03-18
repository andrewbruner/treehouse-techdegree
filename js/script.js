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
    },
    {
        quote: 'Whatever our souls are made of, his and mine are the same.',
        source: 'Emily Bronte',
        citation: 'Wuthering Heights',
        year: '1847'
    },
    {
        quote: 'But soft! What light through yonder window breaks? / It is the east, and Juliet is the sun.',
        source: 'William Shakespeare',
        citation: 'Romeo and Juliet',
        year: 'ca. 1591-1595'
    },
    {
        quote: 'Made weak by time and fate, but strong in will / To strive, to seek, to find, and not to yield.',
        source: 'Alfred, Lord Tennyson',
        citation: 'Ulysses',
        year: '1842'
    },
    {
        quote: 'Whenever you feel like criticizing anyone ... just remember that all the people in this world haven’t had the advantages that you’ve had.',
        source: 'F. Scott Fitzgerald',
        citation: 'The Great Gatsby',
        year: '1925'
    },
    {
        quote: 'Real courage is when you know you’re licked before you begin, but you begin anyway and see it through no matter what.',
        source: 'Harper Lee',
        citation: 'To Kill a Mockingbird',
        year: '1960'
    },
    {
        quote: 'We are such stuff as dreams are made on, and our little life is rounded with a sleep.',
        source: 'William Shakespeare',
        citation: 'The Tempest',
        year: 'ca. 1610-1611'
    },
    {
        quote: 'A bear, however hard he tries, grows tubby without exercise.',
        source: 'A.A. Milne',
        citation: 'When We Were Very Young',
        year: '1924'
    },
    {
        quote: 'Not all those who wander are lost.',
        source: 'J.R.R. Tolkein',
        citation: 'The Fellowship of the Ring',
        year: '1954'
    },
    {
        quote: 'The Answer to the ultimate question of Life, The Universe and Everything is... 42!',
        source: 'Douglas Adams',
        citation: 'The Hitchhiker’s Guide to the Galaxy',
        year: '1979'
    }
];


/***
 * `getRandomQuote` function
***/
const getRandomQuote = () => {
    const randomNumber = Math.floor(Math.random() * quotes.length);
    return quotes[randomNumber];
};


/***
 * `printQuote` function
***/
const printQuote = () => {
    // get random quote object from quote array
    const randomQuote = getRandomQuote();
    
    // build string of HTML and quote object properties
    let html = `<p class="quote">${randomQuote.quote}</p>
<p class="source">${randomQuote.source}`;
    if (randomQuote.citation) {
        html += `<span class="citation">${randomQuote.citation}</span>`;
    }
    if (randomQuote.year) {
        html += `<span class="year">${randomQuote.year}</span>`;
    }
    html += `</p>`;
    
    // use html string to display random quote in the browser
    document.querySelector('#quote-box').innerHTML = html;
};


/***
 * click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);