const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// load

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


let apiQuotes = [];

// New quote 
function newQuote() {
    loading();

    // random quote from arr
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length )];
    if (quote.author == null) {
        authorText.textContent = 'Unknown';
    }
    else { 
        authorText.textContent = quote.author;
    }

    // lomg-boomgie-tall
    if (quote.text.length >= 100) {
        quoteText.classList.add('long-quote');
    }
    else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    complete();
}

// get quotes from api
async function getQuotes() {
    loading();

    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch (error) {
        // error handling here
    }
}


// tweet
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}


// buttons/event

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
