

    // VARIABLES
    // ==========================================================================

    // The array of words for our hangman game.
    var words = ["chocolate", "polearm", "noose", "coding", "trash", "simulate", "project", "javascript", "dice", "dungeon", "dragon", "sword", "spear","noose", "goblin", "kobold", "beholder", "cleric", "fighter", "wizard"];
    // all possible accepted keypresses
    var alphabet = [ "a", "b", "c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z" ];
    // We start the game with a score of 0.
    var score = 0;
    // Variable to hold the index of current word.
    var wordIndex = 0;
    // Variable to hold the currently selected word
    var wordSelected = "";
    // Variable to hold the currently selected word
    var wordLength = 0;
    // Variable to hold the currently selected word
    var lettersGuessedCorrectly = 0;
    // Variable to hold the current displayed version of the word
    var wordDisplayed = [];
    // Variable to store the correct number of guesses a player gets
    var numofguesses = 0;
    // Array of guessed letters
    var guessedLetters = [];
    // variable for the index of the last word chosen to prevent duplicate words
    var lastWordIndex = 999999999999;
    // Variable that stores the number of words guessed
    var wordsGuessed = 0;
    // var to check for completion of a word
    var lettersGuessedCorrectly = 0;

    // FUNCTIONS
    // ==============================================================================

    // Function that updates the score and guesses...
    function updateScore() {
      document.querySelector("#score").innerHTML = "Score: " + score;
      document.querySelector("#guessesRemaining").innerHTML = "Guesses remaining: " + numofguesses;
      document.querySelector("#guessed").innerHTML = "Letters guessed: " + guessedLetters;
      
    }

    // Function to render questions.
    function getNewWord() {
      // set a value for the variable containing the selected word
      wordIndex = Math.floor(Math.random() * Math.floor(words.length));
      if (wordIndex === lastWordIndex) {
        wordIndex = Math.floor(Math.random() * Math.floor(words.length));
      } 
        
      // If there are still more unplayed words, render the next one.
      if (wordsGuessed != words.length && lastWordIndex != wordIndex) {
        // Set the last word index
        lastWordIndex = wordIndex;
        // Get the new word in the selected variable
        wordSelected = words[wordIndex];
        // clear the array and number of letters guessed for word displayed 
        wordDisplayed.length = 0;
        lettersGuessedCorrectly = 0;
        guessedLetters.length = 0;
        // Set the number of guesses for this word, 4 minimum
        numofguesses = 7;
        // Set the word length to track correct number of letters guessed
        wordLength = wordSelected.length;
        // Set variable wordDisplayed to show the correct number of underscores for the word length
        for (i = 0; i <= wordSelected.length -1; i++) {
          wordDisplayed.push("_");  
        }
        //console log the results of the previous section
        //update the displayed word on screen to hide the characters
        document.querySelector("#wordToGuess").innerHTML = wordDisplayed.join(" ");
        // Update the number of guesses for the displayed word
        document.querySelector("#guessesRemaining").innerHTML = "Guesses remaining: " + numofguesses;
        updateScore();
      } else {
        alert("You have emptied the dictionary! WELL DONE!!!");
      }
    }

    function resetScore() {
      score = 0;
      wordsGuessed = 0;
      document.querySelector("#score").innerHTML = "Score: " + score;
      document.querySelector("#verification").innerHTML = "Pick a letter!";
    }

    //function that checks word completion and number of guesses
    function checkCompletion() {
      // If you've guessed all the letters in a word
      if (lettersGuessedCorrectly === wordLength) {
        document.querySelector("#verification").innerHTML = "You have guessed "+ wordSelected +"!";
        wordsGuessed ++;
        getNewWord();
      }
      if (numofguesses === 0) {
        alert("No more guesses! You lose!");  
        getNewWord();
        resetScore();
        return;
      }
    }

    // MAIN PROCESS
    // ==============================================================================

    // Calling functions to start the game.
    getNewWord();
    updateScore();
    
    // When the user presses a key, it will run the following function...
    document.onkeyup = function(event) {
      // Determine which key was pressed, make it lowercase, and set it to the userInput variable.
      var userInput = event.key.toLowerCase();
      
      if (alphabet.indexOf(userInput) >=0) {
        // add the guessed letter to the guessed letter array
        if (guessedLetters.indexOf(userInput) <= 0) {
          guessedLetters.push(userInput);
          // if the letter is in the word then
          if (wordSelected.indexOf(userInput) > -1) {    
            // Find the indexes for letters in the selectedWord variable
            var letterPositions = [];
            var instances = wordSelected.indexOf(userInput);
            while (instances != -1) {
                letterPositions.push(instances);
                instances = wordSelected.indexOf(userInput, instances + 1);
            }
            console.log("Letter found in positions: " + letterPositions);
            for (i=0; i < letterPositions.length; i++) {
              var showLetter = letterPositions[i];
              lettersGuessedCorrectly++;
              wordDisplayed[showLetter] = wordSelected[showLetter];
            }
            document.querySelector("#wordToGuess").innerHTML = wordDisplayed.join(" ");
            document.querySelector("#verification").innerHTML = "Correct!";
            score++;
            // If the letter is not in the word
          } else {
            document.querySelector("#verification").innerHTML = "Incorrect guess!";
            numofguesses--;
            score--;
          }
          updateScore();
          checkCompletion();
        } else {
          document.querySelector("#verification").innerHTML = "You have already guessed "+ userInput +"!";
        }
      } else {
        document.querySelector("#verification").innerHTML = "Alphabetical keys only!";
      }

    }     