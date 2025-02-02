let user_score = 0;
let AI_score = 0;
let draw = 0;
let total = 0;
let hight = localStorage.getItem("Highest score")
  ? parseInt(localStorage.getItem("Highest score"))
  : 0; // Highest score ko properly fetch kiya

const choices = document.querySelectorAll(".choice");

const msg = document.querySelector(".msg");
const userscore = document.querySelector("#user-score");
const AIscore = document.querySelector("#AI-score");
const drawscore = document.querySelector("#Draw-score");
const hightscore = document.querySelector("#highest-score");

// Highest score update function
const hightsc = () => {
  if (user_score > hight) {
    // Sirf tab update hoga jab user ka score high ho
    hight = user_score;
    hightscore.innerText = hight;
    localStorage.setItem("Highest score", hight);
  }
};

const totalmatch = () => {
  const totalmatch = document.querySelector("#Total");
  total++;
  totalmatch.innerText = total;
};

const drawgame = () => {
  totalmatch(); // Pehle total badhao
  draw++;
  drawscore.innerText = draw;
  msg.innerText = "Draw! Play Again";
  msg.style.background =
    "linear-gradient(90deg, rgb(165, 42, 128), rgb(237, 10, 146))";
};

const showwinner = (userwin) => {
  totalmatch(); // Har game pe total badhao
  if (userwin) {
    msg.innerText = "You Win!";
    msg.style.background =
      "linear-gradient(90deg, rgb(67, 165, 42), rgb(48, 237, 10))";
    user_score++;
    userscore.innerText = user_score;
    hightsc();
  } else {
    msg.innerText = "You Lose!";
    AI_score++;
    AIscore.innerText = AI_score;
    msg.style.background =
      "linear-gradient(90deg, rgb(165, 42, 42), rgb(237, 40, 10))";
  }
};

const gencomchoice = () => {
  const options = ["rock", "paper", "scissor"]; // Lowercase kiya taaki ID se match ho
  return options[Math.floor(Math.random() * 3)];
};

const playgame = (choiceid) => {
  const compchoice = gencomchoice();
  let userwin; // Variable define kar diya

  if (choiceid === compchoice) {
    drawgame();
  } else {
    if (choiceid === "rock") {
      userwin = compchoice === "paper" ? false : true;
    } else if (choiceid === "paper") {
      userwin = compchoice === "scissor" ? false : true;
    } else {
      userwin = compchoice === "rock" ? false : true;
    }
    showwinner(userwin);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const choiceid = choice.getAttribute("id").toLowerCase(); // Lowercase match fix
    playgame(choiceid);
  });
});

// Highest score ko UI pe set karna
hightscore.innerText = hight;
