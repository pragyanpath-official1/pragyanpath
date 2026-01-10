// ===== Chess Mini-Game =====
let chessBoard = document.getElementById("chessBoard");
let chessLevel = document.querySelectorAll("#chessLevel");
let eloScore = document.getElementById("eloScore");
let leaderboard = document.getElementById("leaderboard");

let elo = 800; // initial ELO
let level = 1;

function createChessBoard() {
  chessBoard.innerHTML = "";
  let isWhite = true;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      let square = document.createElement("div");
      square.className = "square " + (isWhite ? "white" : "black");
      chessBoard.appendChild(square);
      isWhite = !isWhite;
    }
    isWhite = !isWhite;
  }
}

function updateElo(result) {
  if(result === 'win') elo += 10;
  else if(result === 'loss') elo -= 10;
  // draw no change
  eloScore.innerText = elo;
  updateLevel();
  updateLeaderboard();
}

function updateLevel(){
  if(elo < 900) level = "Beginner";
  else if(elo < 1100) level = "Intermediate";
  else if(elo < 1300) level = "Advanced";
  else level = "Master";

  chessLevel.forEach(e => e.innerText = level);
}

function updateLeaderboard(){
  leaderboard.innerHTML = `
    <li>Player1 - 1200</li>
    <li>You - ${elo}</li>
    <li>Player3 - 1100</li>
  `;
}

function answerQuiz(correct){
  const result = document.getElementById("quizResult");
  if(correct) result.innerText = "Correct!";
  else result.innerText = "Try Again!";
}

function startNewGame(){
  alert("Starting a new chess game...");
  createChessBoard();
}

createChessBoard();
updateLevel();
updateLeaderboard();
