console.log("Pragyanpath PWA ready");
// ===== CHESS ELO SYSTEM (Pragyanpath) =====

// Initial ELO (local storage)
let elo = localStorage.getItem("chessElo");
if (!elo) {
  elo = 800; // beginner rating
  localStorage.setItem("chessElo", elo);
}

// Show ELO on page
function showElo() {
  const el = document.getElementById("eloScore");
  if (el) el.innerText = elo;
}
showElo();

// Match result function
// result = "win" | "loss" | "draw"
function updateElo(result) {
  let change = 0;

  if (result === "win") change = 25;
  if (result === "loss") change = -15;
  if (result === "draw") change = 5;

  elo = parseInt(elo) + change;

  // Minimum limit
  if (elo < 400) elo = 400;

  localStorage.setItem("chessElo", elo);
  showElo();

  alert("Updated ELO: " + elo);
}
function getLevel(elo) {
  if (elo < 900) return "Beginner ♟️";
  if (elo < 1200) return "Intermediate 🔥";
  if (elo < 1500) return "Advanced 🚀";
  return "Master 👑";
}

function showLevel() {
  const levelEl = document.getElementById("chessLevel");
  if (levelEl) {
    levelEl.innerText = getLevel(elo);
  }
}

showLevel();
let players = JSON.parse(localStorage.getItem("players")) || [];

function savePlayer(name) {
  const existing = players.find(p => p.name === name);

  if (existing) {
    existing.elo = elo;
  } else {
    players.push({ name: name, elo: elo });
  }

  localStorage.setItem("players", JSON.stringify(players));
  showLeaderboard();
}

function showLeaderboard() {
  const list = document.getElementById("leaderboard");
  if (!list) return;

  list.innerHTML = "";
  players.sort((a, b) => b.elo - a.elo);

  players.forEach(p => {
    const li = document.createElement("li");
    li.innerText = `${p.name} – ELO ${p.elo}`;
    list.appendChild(li);
  });
}

showLeaderboard();
savePlayer("Student 1");
