function ageInDays(){
  var birthYear = prompt('whats your age motherfucker');
  var ageInDayss = (2020-birthYear)*365;
  var h1 = document.createElement('h1');
  var textAnswer = document.createTextNode('You are '+ ageInDayss +' days old');
  h1.setAttribute('id','ageInDays');
  h1.appendChild(textAnswer);
  document.getElementById('flex-box-result').appendChild(h1); 
  console.log(ageInDayss)
};
 function reset(){
     document.getElementById('ageInDays').remove();
 }
 function generateCat(){
     var image = document.createElement('img')
     var div = document.getElementById('flex-cat-gen');
     image.src = "android-logo.png";
    image.width ="150" ;
     image.height="150";
     div.appendChild(image);
 }

 // challange 3

 function rpsGame(yourChoice){
   console.log(yourChoice);
   var humanChoice, botChoice;
   humanChoice = yourChoice.id;
   botChoice = numberToChoice(randToRpsInt());
   //alert(botChoice);
   results = decideWinner(humanChoice,botChoice);
   console.log(results);
   message = finalMessage(results); 
   console.log(message);
   rpsFrontEnd(humanChoice,botChoice,message);
 }

 function randToRpsInt(){
   return Math.floor(Math.random()*3);
 }

 function numberToChoice(number){
   return['rock', 'paper','scissors'][number]
 }

 function decideWinner(myChoice, computerChoice){

  var rpsDatabase = {

    'rock': {'scissors': 1 ,'rock': 0.5 ,'paper': 0  },
    'paper': {'scissors': 0 ,'rock': 1 ,'paper': 0.5  },
    'scissors': {'scissors': 0.5 ,'rock': 0 ,'paper': 1  }
  }

  var myScore = rpsDatabase[myChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][myChoice];
  return[myScore,computerScore];
 }

 function finalMessage([myScore,computerScore]){

if (myScore == 0){
    return{'message': 'You lost','color':'red'};
  } else if(myScore == 0.5)
  return{'message': 'You tied','color':'yellow'};
  else{
    return{'message': 'You won','color':'green'};
  }
 }

 function rpsFrontEnd(humanImagechoice,botImagechoice,finaMessage){
   var imagesDatabase ={

    'rock':document.getElementById('rock').src,
    'paper':document.getElementById('paper').src,
    'scissors':document.getElementById('scissors').src
   }

   //removing images
   document.getElementById('rock').remove();
   document.getElementById('paper').remove();
   document.getElementById('scissors').remove();

   var humanDiv = document.createElement('div');
   var botDiv = document.createElement('div');
   var messageDiv = document.createElement('div');

   humanDiv.innerHTML = "<img src ='" + imagesDatabase[humanImagechoice] + "' height=150 width=150 '>"
   botDiv.innerHTML = "<img src ='" + imagesDatabase[botImagechoice] + "' height=150 width=150 '>"
   messageDiv.innerHTML = "<h1 style = 'color:'" + finaMessage['color'] + " ; font-size: 50px; padding: 30px; '> "+ finaMessage['message']+ "</h1"
   document.getElementById('flex-box-rps-div').appendChild(humanDiv);
   document.getElementById('flex-box-rps-div').appendChild(messageDiv);
   document.getElementById('flex-box-rps-div').appendChild(botDiv);
   
 }

 // challange 4 change the color of all buttons
 var all_buttons = document.getElementsByTagName('button');
 
 var copyAllButtons = [];
 for (let i=0; i < all_buttons.length; i++){
   copyAllButtons.push(all_buttons[i]);
 }
 function buttonChange(buttonThingy){
   if(buttonThingy.value == 'red'){
     buttonRed();
   }else if (buttonThingy.value == 'green'){
     buttonGreen();
   }else if (buttonThingy.value == 'reset'){
     buttonReset();
   }else if (buttonThingy.value == 'random'){
     randomColors();
   }
 }
 function buttonRed(){
   for(let i= 0 ;i < all_buttons.length; i++){
     all_buttons[i].classList.remove(all_buttons[i].classList[1]);
     all_buttons[i].classList.add('btn-danger')

   }
 }

 function buttonGreen(){
  for(let i= 0 ;i < all_buttons.length; i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success')
    
  }
}
function buttonReset(){
  for(let i= 0 ;i < all_buttons.length; i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
    
  }
}

function randomColors(){
  var choices =['btn-primary', 'btn-danger', 'btn-success','btn-warning'];

  for(let i= 0 ;i < all_buttons.length; i++){
    var randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
    
  }
}

// challange 5 Black jack
let blackjackGame ={
  'you': {'scoreSpan': '#your-blackjack-result','div' : '#your-box', 'score': 0 },
  'dealer': {'scoreSpan': '#dealer-blackjack-result','div' : '#dealer-box', 'score': 0 },
  'cards' : ['2','3','4','5','6','7','8','9','10','K','J', 'Q','A'],
  'cardsMap':{'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'10': 10,'K': 10,'J': 10,'Q': 10,'A': [1,11]}
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hitbtn').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-dealbtn').addEventListener('click',blackjackDeal);
document.querySelector('#blackjack-standbtn').addEventListener('click',dealerLogic);

function blackjackHit(){
  let card = randomCard();
  console.log(card);
  showCard(card,YOU);
  updateScore(card,YOU);
  showScore(YOU);
  

}


function showCard(card,activePlayer){
  if (activePlayer['score'] <= 21){
  let cardImage = document.createElement('img');
  cardImage.src = 'images/'+card+'.png';
  document.querySelector(activePlayer['div']).appendChild(cardImage);
  hitSound.play();
  }
}

function blackjackDeal(){
  showResult(computerWinner());
  let yourImages = document.querySelector('#your-box').querySelectorAll('img');
  let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
  for(i = 0 ; i < yourImages.length; i++){
    yourImages[i].remove();
  }

  for(i = 0 ; i < dealerImages.length; i++){
    dealerImages[i].remove();
  }
YOU['score']= 0;
DEALER['score'] =0;

document.querySelector('#your-blackjack-result').textContent = 0;
document.querySelector('#dealer-blackjack-result').textContent = 0;
document.querySelector('#your-blackjack-result').style.color = 'white';
document.querySelector('#dealer-blackjack-result').style.color = 'white';
}

function randomCard(){
  let randomIndex = Math.floor(Math.random()*13);
  return blackjackGame['cards'][randomIndex];
}

function updateScore(card,activePlayer){
  // id adding 11 keeps me below 21 add 11 else add 1
  if (card === "A"){

  if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
    activePlayer['score'] += blackjackGame['cardsMap'][card][1];
  }else{
    activePlayer['score'] += blackjackGame['cardsMap'][card][0];
  }
} else{
  activePlayer['score'] += blackjackGame['cardsMap'][card];
}
}
function showScore(activePlayer){
  if (activePlayer['score'] > 21){
  document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!'
  document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
} else{
document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}
}
function dealerLogic(){
let card = randomCard();
showCard(card,DEALER);
updateScore(card,DEALER);
showScore(DEALER);


}

function computerWinner(){
let winner;
//if (YOU['score']<= 21){
  // ur score higher than dealer or when delear is burst
  if(YOU['score'] > DEALER['score'] || (DEALER['score']> 21)) {

    console.log('You Won!');
    winner = YOU;
  }else if (YOU['score'] < DEALER['score'] ){
    console.log('You Lost!');
    winner = DEALER;
  }else if (YOU['score'] === DEALER['score']){
    console.log('You Drew!');
  }else if( YOU['score'] > 21 && DEALER['score'] <= 21 ){
    console.log('You Lost!');
    winner = DEALER;
  }else if(YOU['score'] > 21 && DEALER['score'] > 21){

    console.log('You Drew!');
  }

console.log('winner is ', winner)
return winner;
}

 function showResult(winner){
  let message,messageColor;

  if(winner === YOU){
    message = 'You Won';
    messageColor = 'green';
    winSound.play();
  }else if (winner === DEALER){
    message = 'You Lost';
    messageColor = 'red';
    lossSound.play();
  }else{
    message = 'You drew';
    messageColor = 'black';
  }
  document.querySelector('#blackjack-result').textContent = message;
  document.querySelector('#blackjack-result').style.color = messageColor;
}