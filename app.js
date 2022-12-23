
//https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/

const shuffleBtn = document.getElementById('shuffle-btn');





shuffleBtn.addEventListener('click', function() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then((response) => response.json())
        .then((data) => console.log(data));
})