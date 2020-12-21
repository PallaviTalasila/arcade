// One/Two Player Game

// Inital Game state
let gameState = {
  players: ["x", "o"],
  board: [null, null, null, null, null, null, null, null, null],
};
let currentPlayer = gameState.players[0];
let gameWon = false;

$(".score-panel #player-one").addClass("active");

$(".cell").click(function () {
  //disable click if the cell already has a value
  if ($(this).text().length > 0 || gameWon) return false;
  else {
    if (currentPlayer === "x") {
      let currPlayerName = $(".stats-container #playerx").val() || "Player One";
      // set values
      $(this).text("x");
      gameState.board[$(this).attr("id")] = "x";

      //Validate click for state
      validateClick();

      //After validating the click
      if (gameWon) {
        displayModal(currPlayerName, "win");
      } else if (checkForNotNulls(gameState.board).length === 9) {
        displayModal(currPlayerName, "tie");
      } else {
        playerTurn(1);
      }
    } else {
      let currPlayerName = $(".stats-container #playero").val() || "Player Two";
      // set values
      $(this).text("o");
      gameState.board[$(this).attr("id")] = "o";

      // Validate Game state
      validateClick();

      // After validating the click
      if (gameWon) {
        displayModal(currPlayerName, "win");
      } else if (checkForNotNulls(gameState.board).length === 9) {
        displayModal(currPlayerName, "tie");
      } else {
        playerTurn(0);
      }
    }
  }
});

const winningArrays = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function validateClick() {
  // On click check gamestate.board for winning move
  if (checkForNotNulls(gameState.board).length <= 4) return false;
  else {
    winningArrays.map((winningCombo) => {
      if (
        gameState.board[winningCombo[0]] !== null &&
        gameState.board[winningCombo[1]] !== null &&
        gameState.board[winningCombo[2]] !== null
      ) {
        if (
          gameState.board[winningCombo[0]] ===
            gameState.board[winningCombo[1]] &&
          gameState.board[winningCombo[1]] === gameState.board[winningCombo[2]]
        ) {
          gameWon = true;
          return gameWon;
        }
      }
    });
  }
}

function resetGame() {
  gameState = {
    players: ["x", "o"],
    board: [null, null, null, null, null, null, null, null, null],
  };
  currentPlayer = gameState.players[0];
  gameWon = false;
  $(".cell").html("");
  $(".score-panel #reset").removeClass("active");
}

function displayModal(playerName, winTie) {
  setTimeout(function () {
    $("#modal-container").removeAttr("class").addClass("win");
    $("body").addClass("modal-active");
  }, 10);
  $(".score-panel #player-two").removeClass("active");
  $(".score-panel #player-one").removeClass("active");
  $(".score-panel #reset").addClass("active");
  if (winTie === "win")
    $(".modal").html(
      "<h2>" + playerName + " Wins!</h2><p>Click Reset to Play Again.</p>"
    );
  else if (winTie === "tie")
    $(".modal").html("<h2>Game is a Tie</h2><p>Click Reset to Play Again.</p>");
}

function playerTurn(playerIndex) {
  if (playerIndex === 1) {
    currentPlayer = gameState.players[1];
    let currPlayerName = $(".stats-container #playero").val();
    if (currPlayerName === "Computer") {
      // Computer Play
      AIPlay();

      // Validate Game state
      validateClick();

      // After validating the click
      if (gameWon) {
        displayModal(currPlayerName, "win");
      } else if (checkForNotNulls(gameState.board).length === 9) {
        displayModal(currPlayerName, "tie");
      } else {
        playerTurn(0);
      }
    } else {
      $(".score-panel #player-one").removeClass("active");
      $(".score-panel #player-two").addClass("active");
    }
  } else {
    currentPlayer = gameState.players[0];
    $(".score-panel #player-two").removeClass("active");
    $(".score-panel #player-one").addClass("active");
  }
}

//GameFlow button clicks

$("#one-player").click(function () {
  $(".button-container").css({ display: "none" });
  $(".stats-container").css({ display: "grid" });
  $(".stats-container #playero").val("Computer").attr("disabled", true);
});

$("#two-player").click(function () {
  $(".button-container").css({ display: "none" });
  $(".stats-container").css({ display: "grid" });
});

$(".stats-container #start").click(function () {
  $(".board").css({ display: "grid" });
  $(".button-container").css({ display: "none" });
  $(".stats-container").css({ display: "none" });

  // Set player Names
  $(".score-panel #player-one").text(
    $(".stats-container #playerx").val() || "Player One"
  );

  $(".score-panel #player-two").text(
    $(".stats-container #playero").val() || "Player Two"
  );
  $(".score-panel").css({ display: "flex" });
});

$("#reset").click(function () {
  resetGame();
});

$(".button").click(function () {
  var buttonId = $(this).attr("id");
  $("#modal-container").removeAttr("class").addClass(buttonId);
  $("body").addClass("modal-active");
});

$("#modal-container").click(function () {
  $(this).addClass("out");
  $("body").removeClass("modal-active");
});

// Helper funcitons
const checkForNotNulls = (arr) => arr.filter((x) => x !== null);

//AI choosing a move
function AIPlay() {
  a1 = gameState.board[0];
  a2 = gameState.board[1];
  a3 = gameState.board[2];
  b1 = gameState.board[3];
  b2 = gameState.board[4];
  b3 = gameState.board[5];
  c1 = gameState.board[6];
  c2 = gameState.board[7];
  c3 = gameState.board[8];

  if (
    a1 === null &&
    ((a3 === "x" && a2 === "x") ||
      (c3 === "x" && b2 === "x") ||
      (c1 === "x" && b1 === "x"))
  ) {
    $("#0").text("o");
    gameState.board[$("#0").attr("id")] = "o";
  } else {
    if (
      a2 === null &&
      ((a1 === "x" && a3 === "x") || (c2 === "x" && b2 === "x"))
    ) {
      $("#1").text("o");
      gameState.board[$("#1").attr("id")] = "o";
    } else {
      if (
        a3 === null &&
        ((a1 === "x" && a2 === "x") ||
          (c1 === "x" && b2 === "x") ||
          (c3 === "x" && b3 === "x"))
      ) {
        $("#2").text("o");
        gameState.board[$("#2").attr("id")] = "o";
      } else {
        if (
          c3 === null &&
          ((c1 === "x" && c2 === "x") ||
            (a1 === "x" && b2 === "x") ||
            (a3 === "x" && b3 === "x"))
        ) {
          $("#8").text("o");
          gameState.board[$("#8").attr("id")] = "o";
        } else {
          if (
            c1 === null &&
            ((c3 === "x" && c2 === "x") ||
              (a3 === "x" && b2 === "x") ||
              (a1 === "x" && b1 === "x"))
          ) {
            $("#6").text("o");
            gameState.board[$("#6").attr("id")] = "o";
          } else {
            if (
              c2 === null &&
              ((c3 === "x" && c1 === "x") || (a2 === "x" && b2 === "x"))
            ) {
              $("#7").text("o");
              gameState.board[$("#7").attr("id")] = "o";
            } else {
              if (
                b1 === null &&
                ((b3 === "x" && b2 === "x") || (a1 === "x" && c1 === "x"))
              ) {
                $("#3").text("o");
                gameState.board[$("#3").attr("id")] = "o";
              } else {
                if (
                  b3 === null &&
                  ((a3 === "x" && c3 === "x") || (b2 === "x" && b1 === "x"))
                ) {
                  $("#5").text("o");
                  gameState.board[$("#5").attr("id")] = "o";
                } else {
                  if (
                    b2 === null &&
                    ((a3 === "x" && c1 === "x") ||
                      (c3 === "x" && a1 === "x") ||
                      (b3 === "x" && b1 === "x") ||
                      (c2 === "x" && a2 === "x"))
                  ) {
                    $("#4").text("o");
                    gameState.board[$("#4").attr("id")] = "o";
                  } else {
                    // IF NO OPP TO BLOCK A WIN, THEN PLAY IN ONE OF THESE SQUARES
                    if (b2 === null) {
                      $("#4").text("o");
                      gameState.board[$("#4").attr("id")] = "o";
                    } else {
                      if (a1 === null) {
                        $("#0").text("o");
                        gameState.board[$("#0").attr("id")] = "o";
                      } else {
                        if (c3 === null) {
                          $("#8").text("o");
                          gameState.board[$("#8").attr("id")] = "o";
                        } else {
                          if (c2 === null) {
                            $("#7").text("o");
                            gameState.board[$("#7").attr("id")] = "o";
                          } else {
                            if (b1 === null) {
                              $("#3").text("o");
                              gameState.board[$("#3").attr("id")] = "o";
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
