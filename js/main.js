$(document).ready(function() {

  var $submitInput = $("#user-submit");
  var $letterInput = $("input");
  var $hangmanStatus = $("#hangman");
  var $gameAnswer = $("#game-answer");
  var wordList = ["tree","dog","vehicle","bee","tomato","bread","random","hangman","awesome","sweet","telescope"];
  var userInput = [];
  var lifeCount = 4;


  var correctAnswer = wordList[Math.floor(Math.random() * wordList.length)];
  var answerByLetter = correctAnswer.split("");

  // Select a word at random from wordList
  for(var i = 0; i < answerByLetter.length; i++) {
    var $newListItem = $("<li>");
    $("#game-answer ul").append($newListItem.html($("<p>").text(answerByLetter[i])));
  }

  //

  var testFunc = function(){
    var $userInputValue = $letterInput.val();
    var $listItems = $("#game-answer ul li p");

    for(var i = 0; i < answerByLetter.length; i++) {
      var $singleItem = $listItems.eq(i);

      if($userInputValue === $singleItem.text()) {
        $singleItem.attr("style","visibility: visible");
        userInput.push($userInputValue);
      } else if ($userInputValue !== $singleItem.text()){
        console.log("Wrong one");
      }
    }
  }

  $submitInput.on("click", function() {

    if(userInput.length === answerByLetter.length){
      alert("You've won!");
    }
    $letterInput.val("");
  });



});
