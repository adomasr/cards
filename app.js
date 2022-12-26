//https://apis.scrimba.com/deckofcards/api/deck/<<deck_id>>/draw/?count=2


//variables

const shuffleBtn = document.getElementById('shuffle-btn');
const deal2  = document.getElementById('deal2');
const cardsContainer = document.getElementById('cards-container');
const outcomeH1 = document.getElementById('outcome-h1');




//Eventlisteners


shuffleBtn.addEventListener('click', shuffleCards);


deal2.addEventListener('click', deal2Cards);



//Functions


function shuffleCards() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then((response) => response.json())
        .then((data) => {
            const deckId = data.deck_id
            localStorage.setItem('deckId', JSON.stringify(deckId))
            console.log('shuffled! your deck id is ' + deckId);
        });
}



function deal2Cards() {
    const deckId = JSON.parse(localStorage.getItem('deckId'))
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then (res => res.json())
        .then (data => {
            //functions
            let htmlString = '';
            for (let element of data.cards) {
                htmlString += `<img src='${element.image}'/>`
            }
            cardsContainer.innerHTML = htmlString;
            //console.log(data.cards[0].value, data.cards[1].value);
            const cards = cardConverter(data.cards[0], data.cards[1]);
            const outcomeString = winDecider(cards[0], cards[1]);
            //console.log(outcomeString);
            outcomeH1.textContent = outcomeString;
        })  
}



function cardConverter(card1, card2) {

    const bigCardsValue = [
        {name : 'ACE', value : 13},
        {name :'KING', value : 12},
        {name :'QUEEN', value : 11},
        {name : 'JACK', value : 10}
    ]
    

    let value1 = card1.value;
    let value2 = card2.value;

    if (value1.length < 2 & value2.length < 2 ) {
        //console.log('both cards are small');
        value1 = Number(value1);
        value2 = Number(value2);
    }
    else if (value1.length > 1 & value2.length > 1) {
        //console.log('both cards are big');
        for ( let element of bigCardsValue) {
            if (element.name === value1 ) {
                value1 = element.value
            }
        }
        for ( let element of bigCardsValue) {
            if (element.name === value2 ) {
                value2 = element.value
            }
        }
    }
    else if (value1.length > 1) {
        //console.log('card1 is big');
        value2 = Number(value2);
        for ( let element of bigCardsValue) {
            if (element.name === value1 ) {
                value1 = element.value
            }
        }
    }
     else if (value2.length > 1) {
        //console.log('card2 is big');
        value1 = Number(value1);
        for ( let element of bigCardsValue) {
            if (element.name === value2 ) {
                value2 = element.value
            }
        }
    }
    
    return [value1, value2]
}



function winDecider(card1, card2) {
    if (card1 > card2) {
        console.log('card1 has the higher score!')
        return 'You lose!'
    }
    else if (card1 < card2) {
        console.log('card2 has the higher score!')
        return 'You won!'
    }
    else {
        console.log("it's a tie!")
        return "It's a tie!"
    }
}



//test

// card1 = {
//     value: 'ACE'
// }

// card2 = {
//     value: 'KING'
// }



// cardConverter(card1, card2);

