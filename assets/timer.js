let timeLeft = 60 * 1000;

const timeDiv = document.querySelector("#time-div");
const startBtn = document.querySelector("#start-button");
var timerInterval;

function startGame(){
	if(word.length == 0) return;
	let main = document.querySelector("main");
	main.classList.remove("game-stopped");
	main.classList.add("game-running");
	startBtn.style.display = "none";
	timeDiv.style.display = "block";
	timerInterval = setInterval(countDown, 10);
}

function endGame(){
	// show all the letters if they haven't been guessed

	// show the definition of the word and usage

}

function countDown(){
	timeDiv.innerHTML = timeLeft / 10;
	if(timeLeft <= 0){
		clearInterval(timerInterval);
	}
	if(won(word, guessedLetters)){
		clearInterval(timerInterval);
		document.querySelector("#start-button").style.display = "block";
		timeDiv.innerHTML = "YOU WON!";
	}
	timeLeft -= 10;
}