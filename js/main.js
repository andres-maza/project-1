$(document).ready(function() {

  var $submitInput = $("#user-submit");
  var $letterInput = $("input");
  var $hangmanStatus = $("#hangman");
  var $gameAnswer = $("#game-answer");
  var wordList = ["tree","dog","vehicle","bee","tomato","bread","random","hangman","awesome","sweet","telescope", "seed", "premium", "harmony", "assembly", "momentous", "imperfect"];
  var userInput = [];
  var lifeCount = 6;
  // Get random word from wordList and split into new array of answerByLetter
  var correctAnswer = wordList[Math.floor(Math.random() * wordList.length)];
  var answerByLetter = correctAnswer.split("");

  // Create new li element per value in answerByLetter and set its text equal to each index
  var startGame = function() {
    for(var i = 0; i < answerByLetter.length; i++) {
      var $newListItem = $("<li>");
      $("#game-answer ul").append($newListItem.html($("<p>").text(answerByLetter[i])));
    }
  }

  // Game functionality
  var gameLogic = function() {
    // Get user input value and list items
    var $userInputValue = $letterInput.val();
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
      setTimeout(function() {
        alert("You've won!");
        window.location.reload(true);
      }, 150);
      } else if (lifeCount === 0) {
      setTimeout(function(){
        alert("Aww man, you've lost!");
        window.location.reload(true);
      }, 150);
      }
    $letterInput.val("");
  }

  // Switch statement to check value of lifeCount and display correct state of Hangman
  var checkHangManState = function () {
    switch(lifeCount) {
      case 5:
        $("#hangman").css("background-image","url(assets/state-5.png)");
        break;
      case 4:
        $("#hangman").css("background-image","url(assets/state-4.png)");
        break;
      case 3:
        $("#hangman").css("background-image","url(assets/state-3.png)");
        break;
      case 2:
        $("#hangman").css("background-image","url(assets/state-2.png)");
        break;
      case 1:
        $("#hangman").css("background-image","url(assets/state-1.png)");
        break;
      case 0:
        $("#hangman").css("background-image","url(assets/state-0.png)");
    }
  }

  // On click and keydown event listeners
  $submitInput.on("click", gameLogic);
  $letterInput.on("keydown", function(event) {
    if(event.which === 13 && $letterInput.val() !== ""){
      gameLogic();
    }
  });
  startGame();
});
