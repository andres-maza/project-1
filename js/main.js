$(document).ready(function() {
  //alert("jQuery is working");
  var $submitInput = $("#user-submit");
  var $letterInput = $("input");
  var $hangmanStatus = $("#hangman");
  var $gameAnswer = $("#game-answer");
  var wordList = ["tree","dog","vehicle","bee","tomato","bread","random","hangman","awesome","sweet","telescope"];

  var newEntry = function() {
    correctAnswer = wordList[Math.floor(Math.random() * wordList.length)];
    var answerByLetter = correctAnswer.split("");
    var newListItem = $("<li>");

    for(var i = 0; i < answerByLetter.length; i++) {
      $("#game-answer ul").append(newListItem.text(answerByLetter[i]));

    }
  };

  newEntry();


});
