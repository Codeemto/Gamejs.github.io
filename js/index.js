//counter variable to keep track of button clicks
let counter = 0;

//event listener for the button click using jQuery
$("#btn").on("click", function () {
    counter++;
    $("span").html("&nbsp" + counter);
    if (counter > 0 && counter <= 15) {
        //get the audio element by its id
        var aud = document.getElementById('audio-element');
        aud.play();
    }
});

//function to redirect to the levels page when the game starts
function playGame() {
    window.location.href = "https://codeemto.github.io/Gamejs.github.io/levels.html";
}

//array of fruits
var fruits = [
    { name: "Apple", image: "apple.png", options: ["A", "B", "C"] },
    { name: "Banana", image: "banana.png", options: ["B", "C", "D"] },
    { name: "Cherry", image: "cherry.png", options: ["C", "D", "E"] },
    { name: "Grape", image: "grape.png", options: ["G", "H", "I"] },
    { name: "Kiwi", image: "kiwi.png", options: ["K", "L", "M"] }
];

//variables to keep track of the game
var currentQuestion = 0;
var score = 0;
var gameStarted = false;
var timer;

//DOM elements
var fruitImage = document.getElementById("fruit-img");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var scoreElement = document.getElementById("scoreVal");
var startButton = document.getElementById("startBtn");
var timerElement = document.getElementById("timer");

// Shuffle an array and ensure the correct answer is included
function shuffleArrayWithCorrectAnswer(array, correctAnswer) {
    var shuffledArray = array.slice(); // Create a copy of the original array

    // Ensure correct answer is in the shuffled array
    if (!shuffledArray.includes(correctAnswer)) {
        var randomIndex = Math.floor(Math.random() * shuffledArray.length);
        shuffledArray[randomIndex] = correctAnswer;
    }

    // Perform Fisher-Yates shuffle for the rest of the elements
    var currentIndex = shuffledArray.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = shuffledArray[currentIndex];
        shuffledArray[currentIndex] = shuffledArray[randomIndex];
        shuffledArray[randomIndex] = temporaryValue;
    }

    return shuffledArray;
}

//function to load a new question
function loadQuestion() {
    //check if there are more questions in the array
    if (currentQuestion < fruits.length) {
        var fruit = fruits[currentQuestion];

        // Shuffle the options array with correct answer
        var shuffledOptions = shuffleArrayWithCorrectAnswer(fruit.options, fruit.options[0]);

        //to set the fruit image and shuffled options
        fruitImage.src = "images/" + fruit.image;
        option1.textContent = shuffledOptions[0];
        option2.textContent = shuffledOptions[1];
        option3.textContent = shuffledOptions[2];

        //start the timer for the questions
        startTimer();
    } else {
        finishQuiz();
    }
}


//finish the quiz and redirect to the final score page
function finishQuiz() {
    localStorage.setItem('finalScore', score);

    timerElement.style.display = "none";
    window.location.href = "https://codeemto.github.io/Gamejs.github.io/finalscore.html";
}

//function to display the question and start the timer
function displayQuestion(fruit) {
    fruitImage.src = "images/" + fruit.image;
    option1.textContent = fruit.options[0];
    option2.textContent = fruit.options[1];
    option3.textContent = fruit.options[2];
    startTimer();
}

//function to check the selected answer
function checkAnswer(selectedOption) {
    clearTimeout(timer);

    var fruit = fruits[currentQuestion];

    //check if the selected option is correct
    if (selectedOption === fruit.options[0]) {
        //play the sound when the user scores
        var aud = document.getElementById('audio-element');
        aud.play();

        //keep track of the users score
        score++;
    }

    //move to the next question
    currentQuestion++;
    scoreElement.textContent = score;

    loadQuestion();
}

//function to start the timer for each question
function startTimer() {
    //reset the timer for the next question
    clearTimeout(timer);
    var timeLeft = 15;

    //function to update the timer
    function updateTimer() {
        //display the remaining time
        timerElement.textContent = `Timer: ${timeLeft}`;

        //check if time is up
        if (timeLeft === 0) {
            // move to the next question
            currentQuestion++;
            loadQuestion();
        } else {
            timeLeft--;
            timer = setTimeout(updateTimer, 1000);
        }
    }

    updateTimer();
}

//function to start the game
function startGame() {
    //check if the game has not started
    if (!gameStarted) {
        gameStarted = true;

        //disable the start button
        startButton.disabled = true;

        //enable the answer options
        option1.disabled = false;
        option2.disabled = false;
        option3.disabled = false;

        //hide the start button
        startButton.style.display = "none";

        //for loop to display questions with a time delay
        for (let i = 0; i < fruits.length; i++) {
            setTimeout(() => {
                currentQuestion = i;
                loadQuestion();
            }, i * 15000);
        }
    }
}

//event listeners for the start button and answer options
startButton.addEventListener("click", startGame);
option1.addEventListener("click", () => checkAnswer(option1.textContent));
option2.addEventListener("click", () => checkAnswer(option2.textContent));
option3.addEventListener("click", () => checkAnswer(option3.textContent));
