$(document).ready(function() {

  var $submitInput = $("#user-submit");
  var $letterInput = $("input");
  var $hangmanStatus = $("#hangman");
  var $gameAnswer = $("#game-answer");
  var wordList = ["tree","dog","vehicle","bee","tomato","bread","random","hangman","awesome","sweet","telescope"];
  var userInput = [];
  var lifeCount = 6;



  var correctAnswer = wordList[Math.floor(Math.random() * wordList.length)];
  var answerByLetter = correctAnswer.split("");

    // Select a word at random from wordList
  var startGame = function() {
    for(var i = 0; i < answerByLetter.length; i++) {
      var $newListItem = $("<li>");
      $("#game-answer ul").append($newListItem.html($("<p>").text(answerByLetter[i])));
    }
  }

  var gameLogic = function() {
    var $userInputValue = $letterInput.val();
    var $listItems = $("#game-answer ul li p");

    if(userInput.indexOf($userInputValue, 0) !== -1) {
      alert("You've selected that letter already!");
      console.log(userInput);
      return;
    }


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

      // if($userInputValue === $singleItemText) {
      //   $singleItem.attr("style","visibility: visible");
      //   userInput.push($userInputValue);
      //   } else if (answerByLetter.indexOf($userInputValue, 0) === -1) {
      //   --lifeCount
      //   break;
      // }
    }

    checkHangManState();

    if(userInput.length === answerByLetter.length) {
      setTimeout(function(){ alert("You've won!"); }, 150);
      //startGame();
      } else if (lifeCount === 0) {
      setTimeout(function(){ alert("Aww man, you've lost!"); }, 150);
      //startGame();
    }
    $letterInput.val("");
  }

  var checkHangManState = function () {
    switch(lifeCount) {
      case 5:
        $("#hangman").css("background-color","red");
        break;
      case 4:
        $("#hangman").css("background-color","blue");
        break;
      case 3:
        $("#hangman").css("background-color","yellow");
        break;
      case 2:
        $("#hangman").css("background-color","black");
        break;
      case 1:
        $("#hangman").css("background-color","green");
        break;
      case 0:
        $("#hangman").css("background-color","gray");
    }
  }

  $submitInput.on("click", gameLogic);

  $letterInput.on("keydown", function(event){
    if(event.which === 13 && $letterInput.val() !== ""){
      gameLogic();
    }
  });

  startGame();
});


//Make array of guesses
//Check to see if user submitted letter matches one in array of guesses
// if it does alert the user that the letter has already been submitted
