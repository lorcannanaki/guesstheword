// List of words
const wordList = [
    "Apple", "Beach", "Chair", "Dance", "Earth", "Fence", "Grape", "House", "Knife", "Lemon",
    "Maple", "Ocean", "Plant", "River", "Snake", "Tiger", "Water", "Arrow", "Brave", "Cloud",
    "Clock", "Brown", "Brush", "Clown", "Crash", "Flame", "Green", "Light", "Music", "Peach",
    "Quick", "Quiet", "Slide", "Solid", "Sound", "Space", "Sport", "Spoke", "Table", "Train",
    "Truck", "Watch", "White", "Black", "Blush", "Cedar", "Birth", "Brake", "Broil", "Broom",
    "Chess", "Blaze", "Brick", "Crisp", "Flood", "Swing", "Ruler", "Flute", "Smell", "Flash",
    "Juice", "Pearl", "Mound", "Chair", "Dance", "Fence", "Flame", "Fruit", "Grape", "Knife",
    "Lemon", "Maple", "Music", "Ocean", "Peach", "Light", "Snake", "Water", "Tiger", "Arrow",
    "Brave", "Cloud", "Clock", "Brown", "Brush", "Clown", "Crash", "Green", "Quick", "Quiet",
    "Slide", "Solid", "Sound", "Space", "Sport", "Spoke", "Table", "Train", "Truck", "Watch"
  ];
  
  // Function to get a random word from the word list, with a rare chance of returning "lettuce"
  function getRandomWord() {
    if (Math.random() < 0.005) {
      return "lettuce";
    } else {
      return wordList[Math.floor(Math.random() * wordList.length)];
    }
  }
  
  // Function to compare guessed word with the target word and provide feedback
  function compareWords(targetWord, guessedWord) {
    let feedback = '';
    let correctLetters = new Set();
    for (let i = 0; i < targetWord.length; i++) {
      if (targetWord[i] === guessedWord[i]) {
        correctLetters.add(targetWord[i].toUpperCase()); // Correct letter in correct position
      } else if (targetWord.includes(guessedWord[i])) {
        feedback += guessedWord[i].toLowerCase(); // Correct letter in wrong position
      } else {
        feedback += '_'; // Unknown letter
      }
    }
    correctLetters.forEach(letter => {
      feedback = feedback.replace(new RegExp(letter.toLowerCase(), 'g'), letter); // Replace lowercase with uppercase
    });
    return feedback;
  }
  
  // Main game function
  function playWordle() {
    const targetWord = getRandomWord().toLowerCase();
    let attempts = 0;
    let isRareWord = targetWord === "lettuce";
  
    console.log('Welcome to Wordle! Guess the 5-letter word.');
    console.log('Each correct letter will be shown once in uppercase.');
    console.log('Lowercase letters represent correct letters in wrong positions.');
    console.log('You have 6 attempts. Start guessing!\n');
  
    const rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    rl.on('line', input => {
      attempts++;
      const guessedWord = input.trim().toLowerCase();
      if (guessedWord === targetWord) {
        if (isRareWord) {
          console.log(`Congratulations! You got the rare word! It's 7 letters long.`);
        } else {
          console.log(`Congratulations! You guessed the word correctly in ${attempts} attempts.`);
        }
        rl.close();
      } else {
        if (attempts >= 6) {
          console.log(`Sorry, you're out of attempts. The word was "${targetWord}".`);
          rl.close();
        } else {
          const feedback = compareWords(targetWord, guessedWord);
          console.log(`Incorrect guess. Feedback: ${feedback}. Try again:`);
        }
      }
    });
  }
  
  // Call the main game function
  playWordle();
  