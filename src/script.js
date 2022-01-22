const cards = document.querySelectorAll(".card");
const img = document.querySelectorAll(".img");

const shuffle = (arr) => arr.sort((a, b) => 0.5 - Math.random());

shuffle(arrayOfCards);

arrayOfCards.forEach(card => {
    const cardToInsert = document.createElement('div');
    
    cardToInsert.classList.add('card');
    cardToInsert.classList.add(card.class);
    cardToInsert.setAttribute('id', card.id);
    const img = document.createElement('class', card.img);
    img.setAttribute('src', 'path to image');
    cardToInsert.appendChild(img);
    const element = document.getElementById('cards');
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
         button.setAttribute('class', 'button');
         button.setAttribute('class', 'playAgain');
         button.innerText = "Play again !";
         document.body.appendChild(button);
 };
 
// hiding / showing cards and popups. Links to arrays.

  const hidePopup = (popupElement) => {
      return document.body.removeChild(popupElement);
  };

//  const lives = document.querySelectorAll(".life");
 let matchedCards = 0;
 let failedMatches = 0;

const showCard = (card) => {
    card.classList.add('flipped');
};

const hideCard = (card) => {
    card.classList.remove('flipped');
};
//  console.log(classList);

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
