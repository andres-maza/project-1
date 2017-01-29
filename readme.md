Overview
------
I built a simple game of Hangman using HTML, CSS and jQuery.

Approach Taken
------
My approach was to tackle the logic of the game first. I created a very simple HTML layout with all of the elements I knew a user would interact with while playing the game. Once I finished all the basic jQuery logic for the game, I cleaned up my layout a bit and added some styling. Finally, I made the site responsive and also added some additional functionality on jQuery.

User Stories
------
* As a user, I need a word to be selected at random when the game starts.
* As a user, I need to be able to input a letter to guess from the randomly selected word.
* As a user, if the guessed letter is correct, I need to be given another turn and the correct letter should be displayed.
* As a user, if the guessed letter is incorrect, I should see a piece of the hangman added.
* As a user, if I guess all the letters within the randomly selected word, I should win.
* As a user, if I guess six incorrect letters, the game should end.


Wireframes
------
![Wireframe](http://i.imgur.com/g7nMz0z.png)


How-to-use instructions
------
A word will be selected at random when the game starts. A user will enter a letter of the alphabet. If the letter is contained within the word, the user takes another turn guessing a letter. If the letter is not a part of the word, a portion of the hangman is added. Six incorrect letters and the user has lost. If the user guesses all the correct letters, the user wins.

Unsolved Problems
------
* Invalid characters can be entered and read by jQuery, costing the user a turn
* Store incorrect guesses into another array and display them on the page
* Adding a "Hint" functionality and making it so that it matches the randomly selected word
