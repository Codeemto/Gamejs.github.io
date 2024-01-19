//get the score from localStorage//
const finalScore = localStorage.getItem('finalScore');

//display the score in the span element//
document.getElementById('scoreVal').textContent = finalScore;

//clear the score from localStorage to avoid displaying it again on page reload//
localStorage.removeItem('finalScore');

//function to replay the game//
function playAgain() {
    //reset game variables//
    currentQuestion = 0;
    score = 0;
    gameStarted = false;

    window.location.href = "https://codeemto.github.io//index.html";
}
function playlevel1Again(){

    window.location.href = "https://codeemto.github.io/level2.html";

}
