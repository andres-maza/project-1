$(document).ready(function() {

  var $submitInput = $("#user-submit");
  var $letterInput = $("input");
  var $hangmanStatus = $("#hangman");
  var $gameAnswer = $("#game-answer");

  var wordList = ["tree","dog","vehicle","bee","tomato","bread","random","hangman","awesome","sweet","telescope", "seed", "premium", "harmony", "assembly", "momentous", "imperfect"];

  var userInput = [];
  var lifeCount = 6;
  var answerByLetter;
  // Get random word from wordList and split into new array of answerByLetter
  var correctAnswer = wordList[Math.floor(Math.random() * wordList.length)];
  //ARUN: Attach array to variable instead of window object
  answerByLetter = correctAnswer.split("");

  // Create new li element per value in answerByLetter and set its text equal to each index
  var startGame = function() {
    answerByLetter.forEach(function(item){
      $("#game-answer ul").append($("<li>").append($("<p>").text(item)));
    });
  }

  // Game functionality
  var gameLogic = function() {
    // Get user input value and list items
    var $userInputValue = $letterInput.val().toLowerCase();
    var $listItems = $("#game-answer ul li p");
    // Check to see if the user's input is equal to an already guessed letter, if so alert "That letter has been selected"
    if(userInput.indexOf($userInputValue, 0) !== -1) {
      alert("You've selected that letter already!");
      $letterInput.val("");
      return; // If condition above is met, exit function
    }
    // If user input matches any index of answerByLetter, set li element visiblity to visible.
    // Else substract 1 from lifeCount and break out of the loop
    for(var i = 0; i < answerByLetter.length; i++) {
      var $singleItem = $listItems.eq(i);
      var $singleItemText = $singleItem.text();

      if ($userInputValue === $singleItemText) {
        $singleItem.attr("style","visibility: visible");
        userInput.push($userInputValue);
      } else if ($userInputValue === "") {
        alert("Ah! It doens't look like you entered any character. Please try again.");
        break;
      } else if (answerByLetter.indexOf($userInputValue, 0) === -1) {
        --lifeCount;
        break;
      }
    }
    // Check the value of lifeCount to and match it to case on switch statement below
    checkHangManState();
    // If array of correct guesses is equal to array of answerByLetter, then user has won the game
    // Else if lifeCount is equal to 0, user has lost the game
    // In either scenario, reload the window to start a new game
    if(userInput.length === answerByLetter.length) {
      setTimeout(function() {alert("Congrats! You've won!");});
      setTimeout(function(){gameRestart();},300);
    } else if (lifeCount === 0) {
      setTimeout(function(){alert("Aww, you've lost!");}, 150);
      setTimeout(function(){gameRestart();},300);
    }
    $letterInput.val("");
  }

  // Switch statement to check value of lifeCount and display correct state of Hangman
  var checkHangManState = function () {
    switch(lifeCount) {
      case 5:
      $hangmanStatus.css("background-image","url(assets/state-5.png)");
      break;
      case 4:
      $hangmanStatus.css("background-image","url(assets/state-4.png)");
      break;
      case 3:
      $hangmanStatus.css("background-image","url(assets/state-3.png)");
      break;
      case 2:
      $hangmanStatus.css("background-image","url(assets/state-2.png)");
      break;
      case 1:
      $hangmanStatus.css("background-image","url(assets/state-1.png)");
      break;
      case 0:
      $hangmanStatus.css("background-image","url(assets/state-0.png)");
    }
  }

  // Logic to restart the game after win/lose
  var gameRestart = function(){
    $("li").detach();
    //Use undefined to clear out variable instead of delete
    answerByLetter = [];
    userInput = [];
    lifeCount = 6;

    var correctAnswer = wordList[Math.floor(Math.random() * wordList.length)];
    answerByLetter = correctAnswer.split("");

    startGame();

    $letterInput.val("");
    $hangmanStatus.css("background-image","url(assets/default.png)");
  }

  //ARUN: Better to put this in the HTML since the below HTML is not dynamic
  var modalInstr = function() {
    var $overlayBox = $("<div>", {id: "overlay"});
    var $instrBox = $("<div>", {id: "instructions"});
    var $closeBox = $("<button>", {id: "close-btn"}).text("x");
    var $instrTxt = $("<p>", {id: "instr-txt"}).text(
      `Select a letter of the alphabet.
      If the letter is contained in the word,
      take another turn guessing a letter.
      If the letter is not a part of the word,
      a portion of the hangman is added.
      Six incorrect letters and you've lost.
      Guess all the correct letters to win!`
    );

    $("body").prepend($overlayBox);
    $overlayBox.append($instrBox);
    $instrBox.append($instrTxt);
    $instrBox.append($closeBox);

    $("#overlay").on("click", function closeOverlay() {
      $("#overlay").fadeOut();
    });

    $("close-btn").on("click", closeOverlay());
  }

  // On click and keydown event listeners
  $("#instrBtn").on("click", modalInstr);
  $submitInput.on("click", gameLogic);
  $letterInput.on("keydown", function(event) {
    if(event.which === 13 && $letterInput.val() !== ""){
      gameLogic();
    }
  });
  startGame();

});


// For line 45, I looked at line 55 here: https://github.com/StretchProjects/hangman/blob/gh-pages/js/hangman.js
// I saw this referenced across some other Hangman examples but did not fully understand exactly what indexOf was
// Therefore I looked at http://www.w3schools.com/jsref/jsref_indexof.asp to get a better understanding of this particular method.
