const arrayOfCards = [
    {name: "QUEEN", id: 'card-1', class: 'a'},
    {name: "KING", id: 'card-2', class: 'b'}, 
    {name: "q", id: 'card-3', class: 'c'}, 
    {name: "w", id: 'card-4', class: 'd'}, 
    {name: "e", id: 'card-5', class: 'e'}, 
    {name: "r", id: 'card-6', class: 'f'}, 
    {name: "t", id: 'card-7', class: 'g'}, 
    {name: "y", id: 'card-8', class: 'h'}, 
    {name: "u", id: 'card-9', class: 'i'}, 
    {name: "i", id: 'card-10', class: 'j'}, 
    {name: "o", id: 'card-11', class: 'k'}, 
    {name: "KG", id: 'card-12', class: 'l'}, 
    {name: "Qb", id: 'card-13', class: 'a'},
    {name: "KIeeG", id: 'card-14', class: 'b'}, 
    {name: "QUrrEEN", id: 'card-15', class: 'c'}, 
    {name: "Kff", id: 'card-16', class: 'd'}, 
    {name: "QUNff", id: 'card-17', class: 'e'}, 
    {name: "BBB", id: 'card-18', class: 'f'}, 
    {name: "QQQQQQQ", id: 'card-19', class: 'g'}, 
    {name: "KKK", id: 'card-20', class: 'h'}, 
    {name: "QNEEEE", id: 'card-21', class: 'i'}, 
    {name: "OOO", id: 'card-22', class: 'j'}, 
    {name: "SSSS", id: 'card-23', class: 'k'}, 
    {name: "KWWWW", id: 'card-24', class: 'l'}, 
]

const shuffle = (arr) => arr.sort((a, b) => 0.5 - Math.random());

shuffle(arrayOfCards);

arrayOfCards.forEach(card => {
    const cardToInsert = document.createElement('div');
    const node = document.createTextNode(card.name); // this will be instead of img
    cardToInsert.classList.add('card');
    cardToInsert.classList.add(card.class);
    cardToInsert.setAttribute("id", card.id);
//     const img = document.createElement("img")
// img.setAttribute("src", "path to image")
// cardToInsert.appendChild(img)
    cardToInsert.appendChild(node);
    const element = document.getElementById("cards");
    element.appendChild(cardToInsert);
})


// popups, card holders and links created

let cardA = null;
// let cardB = null;


const displayPopup = (popupType) => {
    const popup = document.createElement('div');
    popup.setAttribute('id', 'popup');

    if(popupType === 'match') {
        popup.setAttribute('class', 'match');
        popup.innerText = "It's a match !";

    } else if (popupType === 'tryAgain') {
        popup.setAttribute('class', 'tryAgain');
        popup.innerText = "Try again !";

    } else if (popupType === 'win' ) {
        popup.setAttribute('class', 'win');
        popup.innerText = "You win !";

    } else if(popupType === 'gameOver' ){
        popup.setAttribute('class', 'gameOver');
        popup.innerText = "Game over!";
    }
    document.body.appendChild(popup);
    return popup;
}
   
    const displayButton = () => {
        const button = document.createElement('button');
         button.setAttribute('id', 'btn-PlayAgain');
         button.setAttribute('class', 'playAgain');
         button.innerText = "Play again !";
         document.body.appendChild(button);
 };
 
// hiding / showing cards and popups. Links to arrays.

  const hidePopup = (popupElement) => {
      return document.body.removeChild(popupElement);
  };

 const cards = document.querySelectorAll(".card");
 const cardDisplay = document.querySelectorAll(".card-display");
//  const lives = document.querySelectorAll(".life");
 let matchedCards = 0;
 let failedMatches = 0;

const showCard = (cardToShow) => {
    cardToShow.classList.add('flipped');
};

const hideCard = (cardToHide) => {
    cardToHide.classList.remove('flipped');
};



// the game

cards.forEach(card => {
    card.addEventListener("click", function() {

        showCard(this);
        // cardA has to be null or not have been clicked before !
        if(cardA === null) {
            
            cardA = this;
            return 
        }

        // } else if (cardB === null ) {

                // cardB = this;

            const classA = cardA.classList[1];
            const classB = this.classList[1];

            console.log(classA);
            console.log(classB);

            if(cardA.id === this.id) {
                return
            }

            if (classA === classB) {

                matchedCards += 1;

                if(matchedCards === 12) {
                    winTheGame()

                } else {
                    const popup =  displayPopup('match');
                    setTimeout(() => hidePopup(popup), 1000);
                    cardA = null;
                }

            } else { 

                    const popup = displayPopup('tryAgain');
                    failedMatches += 1;

                    console.log('failedMatches', failedMatches)

                    if (failedMatches % 3 === 0) {
                        loseALife();
                    }
                    setTimeout(() => {
                        hidePopup(popup)
                        hideCard(this)
                        hideCard(cardA)
                        cardA = null;
                    }, 1000);

                
            }; 
    })
}) 


// win / lose functions

const winTheGame = () => {

    displayPopup('win');
    displayButton('btn-PlayAgain');
}


const loseALife = () => {

    let livesDiv = document.getElementsByClassName('life')

    if(livesDiv.length === 1) {
        livesDiv[0].remove()

        console.log('GAME OVER')

    } else {
        livesDiv[0].remove()
    }


    console.log(livesDiv)
    // remove this div

};

const loseTheGame = () => {
    displayPopup('gameOver');
    displayButton('btn-PlayAgain');

};



// for (let i = cards.children.length; i >= 0; i--) {
//     cards.appendChild(cards.children[Math.random() * i | 0])
// }

