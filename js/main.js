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
  for(var i = 0; i < answerByLetter.length; i++) {
    var $newListItem = $("<li>");
    $("#game-answer ul").append($newListItem.html($("<p>").text(answerByLetter[i])));
  }

  //

  var gameLogic = function() {
    var $userInputValue = $letterInput.val();
    var $listItems = $("#game-answer ul li p");

    for(var i = 0; i < answerByLetter.length; i++) {
      var $singleItem = $listItems.eq(i);
      var $singleItemText = $singleItem.text();

      console.log($singleItemText);

      if($userInputValue === $singleItemText) {
        $singleItem.attr("style","visibility: visible");
        userInput.push($userInputValue);
      } else if (answerByLetter.indexOf($userInputValue, 0) === -1){
        --lifeCount
        console.log(lifeCount);
        alert("Wrong One");
        break;
      }
    }
    checkHangManState();
    if(userInput.length === answerByLetter.length) {
      alert("You've won!");
    } else if (lifeCount === 0){
      alert("Aww, you've lost!");
    }
    $letterInput.val("");
  }

var checkHangManState = function () {
  if(lifeCount === 5){
    $("#hangman").css("background-color","red");
  } else if(lifeCount === 4){
    $("#hangman").css("background-color","blue");
  } else if(lifeCount === 3){
    $("#hangman").css("background-color","yellow");
  }
}



  $submitInput.on("click", gameLogic);

  });
