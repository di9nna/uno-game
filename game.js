let Game = {
    deck: null,    
    players: {},
    playersTurn: null,
    turnDirection: 1, 
    topCard: null, 
    topCardColor:null,
    topCardValue:null,
}

function makeNewCards(){
    const cards = [
        'red_0',
        'red_1', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6', 'red_7', 'red_8', 'red_9',
        'red_1', 'red_2', 'red_3', 'red_4', 'red_5', 'red_6', 'red_7', 'red_8', 'red_9',
        'red_skip', 'red_reverse', 'red_draw_two',
        'red_skip', 'red_reverse', 'red_draw_two',
        
        'green_0',
        'green_1', 'green_2', 'green_3', 'green_4', 'green_5', 'green_6', 'green_7', 'green_8', 'green_9',
        'green_1', 'green_2', 'green_3', 'green_4', 'green_5', 'green_6', 'green_7', 'green_8', 'green_9',
        'green_skip', 'green_reverse', 'green_draw_two',
        'green_skip', 'green_reverse', 'green_draw_two',
        
        'blue_0',
        'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'blue_7', 'blue_8', 'blue_9',
        'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'blue_7', 'blue_8', 'blue_9',
        'blue_skip', 'blue_reverse', 'blue_draw_two',
        'blue_skip', 'blue_reverse', 'blue_draw_two',
        
        'yellow_0',
        'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5', 'yellow_6', 'yellow_7', 'yellow_8', 'yellow_9',
        'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5', 'yellow_6', 'yellow_7', 'yellow_8', 'yellow_9',
        'yellow_skip', 'yellow_reverse', 'yellow_draw_two',
        'yellow_skip', 'yellow_reverse', 'yellow_draw_two',
        
        'wild_draw_four','wild_draw_four', 'wild', 'wild',
        'wild_draw_four','wild_draw_four', 'wild', 'wild',
    ]    
    
    return cards
}

// create a function that takes an array of cards 
// and returns a new array of shuffled cards
function shuffle( cards ){
    // create an array to hold the shuffled cards
    const deck = [ ]
    // algorithm to shuffle a deck of cards
    // as long as there are cards in the cards array
    while (cards.length > 0) {
        // pick a random number between 0 and the length of the cards array
        let randomNumber = Math.floor(Math.random() * cards.length)
        // then use that number to pick a card
        let card = cards[randomNumber]
        // console.log('card is '+card)
        // push that card onto the new deck
        deck.push(card)
        // remove the card from the original deck
        cards.splice(randomNumber, 1)        
    }
    return deck
}

function dealCard(deck){
    return deck.shift()
}

function startNewGame(){
    // create a new set of cards 
    let cards = makeNewCards()
    // shuffle those cards
    let deck = shuffle(cards)
    // and attach them to the Game object
    Game.deck = deck
    
    // add up to four players to the Game object
    //                        0           1           2           3 
    const playerNames = ["Kimberlina", "Ismael", "Albertito", "Jeremy" ]
    const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    for (let i = 0; i < playerNames.length; i++) {
        // get the player name 
        let name = playerNames[i]
        let id = ALPHABET[i]
        let player = createNewPlayer(name, id)
        Game.players[id] = player
    }
    
    // flip the top on the deck over to start the game
    let discard = dealCard(Game.deck)
    Game.topCard = discard
    
    let color = getCardColor(discard)
    let val = getCardValue(discard)
    Game.topCardColor = color
    Game.topColorValue = val
    
    let topCard = document.querySelector('#deck')
    topCard.setAttribute('src', 'images/'+discard+'.png')
    
    Game.playersTurn = 'A'
    
    showGameObject()
}

function createNewPlayer( playerName, id ){
    // every player has to have a name
    // cards
    // points
    let player = {
        id: id,
        name: playerName,
        cards: [ ],
        points: 0
    }
    
    
    // runs 7 times and deals the player
    // a card into 
    for (let i = 0; i < 7; i++){
        let card = dealCard(Game.deck)
        player.cards.push(card)
    }
    
    return player
}

function showGameObject(){
    var codeSection = document.querySelector('#game-object')
    codeSection.innerHTML = JSON.stringify(Game, null, 2)
}
//ex. 'blue_7'
//ex. 'yellow_9'
//ex. 'green_draw_two'
// ex. 'wild' or 'wild_draw_four'
function getCardColor(cardName){
    // take the string cardName and .split the word at ('_')
    const splitCard = cardName.split('_') // ['blue_7']
    // then... grab the first item of the array 
    const color = splitCard[0] // 'blue'
    // return the color
    return color 
}
//ex. 'blue_7'
//ex. 'blue_7'
//ex. 'yellow_9'
//ex. 'green_draw_two'
// ex. 'wild' or 'wild_draw_four'
function getCardValue(cardName){
    // first, .split the cardName at '_'
    let splitCard = cardName.split('_') // ['blue_7']
    // next, grab the value at the 1st index
    let val = splitCard [1]
    //
    // if the lengthh of the split card array is 3 
    // then grab the value at index 2 
    // add concatenate it onto the end of the val variable
    if (splitCard.length === 3) {
        val+='_'+splitCard[2]
       
    }
    // then return the value 
    return val
}
function changePlayerTurn(){
    //get the Alphabet
    const ALPHABET = Object.keys(Game.players)
    //get the id of whos turn it is
    const currentPlayerId = Game.playersTurn
    //get which direction the turn it's going
    const currentDirection = Game.turnDirection
    //move the curent player's turn one position in which direction it's supposed to move in.
        //first, get the index of the player's turn in the alphabet
    const index = ALPHABET.indexOf(currentPlayerId)
        //change that index by the direction number
    let newIndex = index + currentDirection
        //if index is less then 0, set it to the idex of the last player's id
    const keys = Object.keys(Game.players)
    const numPlayers = keys.length
    if(newIndex < 0){
        //get number of players playing
        newIndex = ALPHABET.length - 1
        //get the index of the last player's id
    }
        //if ...
    if(newIndex >= ALPHABET.length){
        newIndex = 0
    }
        //then get the id of the new index in the alphabet array
    const newPlayersTurn = ALPHABET[newIndex]
    Game.playersTurn = newPlayersTurn
    //change the Game.playerTurn to the next player's turn
}
function playCard(playerId, cardName){
   // get the card color 
  let color = getCardColor(cardName)
  // get the card value
  let val = getCardValue(cardName)
  // check to see if card is playable
  let isCardPlayable = cardIsPlayable(color, val)
}

function playerDrawCard(playerId) {
   //it should draw one card
   let card = dealCard(Game.deck)
   let player = Game.players[playerId]
   player.cards.push(card)
   //off the top of the deck 
   // and put them into the players hand
}
function skipTurn(){ 
    changePlayerTurn()
}
function playerDrawTwo(playerId){ 
    // it should draw two cards off the top of the deck and put them in the player's hand
    playerDrawCard(playerId)
    playerDrawCard(playerId)
}
function playerDrawFour(playerId) { 
    playerDrawCard(playerId)
    playerDrawCard(playerId)
    playerDrawCard(playerId)
    playerDrawCard(playerId)
}
function reverseTurn(){ 
    Game.turnDirection = Game.turnDirection * -1
}
function playWildCard(playerId){ 
    let card = playCard(Game.deck)
    let player = Game.players[playerId]
    
}
function cardIsPlayable(cardColor, cardValue) { 
    if (cardIsPlayable) {
         if ( cardValue === 'skip' ) {
        return skipTurn()
    }
    if ( cardValue === 'draw two') {
        return playerDrawTwo()
    }
    if ( cardValue === 'draw four'){
        return playerDrawFour()
    }
    if ( cardValue === 'wild card') {
        return playWildCard()
    }
    if ( cardValue === 'reverse turn') {
        return reverseTurn()
    }
    if ( cardValue === 'draw card'){
        return playerDrawCard()
    }
  }
}
function endTurn(){ 
    
}