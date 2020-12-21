// Two Player Game
// Inital Game state

let gameState = {
    players: ["x", "o"],
    board: [null, null, null, null, null, null, null, null, null],
  };
  let currentPlayer = gameState.players[0];
  let gameWon = false;
  
  $(".cell").click(function () {
    //disable click if the cell alreay has a value
    if ($(this).text().length > 0) return false;
    else {
      if (currentPlayer === "x") {
        $(this).text("x");
        gameState.board[$(this).attr("id")] = "x";
        validateClick("Player X");
        if (gameWon) {
          //$(this).text("x");
          setTimeout(function () {
            alert("Game won by " + gameState.players[0]);
          }, 1);
          resetGame();
        } else currentPlayer = gameState.players[1];
      } else {
        $(this).text("o");
        gameState.board[$(this).attr("id")] = "o";
        validateClick("Player O");
        if (gameWon) {
          //$(this).text("o");
          setTimeout(function () {
            alert("Game won by " + gameState.players[1]);
          }, 1);
          resetGame();
        } else currentPlayer = gameState.players[0];
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
  
  function validateClick(player) {
    // On click check gamestate.board
  
    if (checkForNotNulls(gameState.board).length <= 4) return false;
    else {
      winningArrays.map((winningCombo, index) => {
        if (
          (gameState.board[winningCombo[0]] !== null &&
            gameState.board[winningCombo[0]]) ===
            (gameState.board[winningCombo[1]] !== null &&
              gameState.board[winningCombo[1]]) &&
          (gameState.board[winningCombo[1]] !== null &&
            gameState.board[winningCombo[1]]) ===
            (gameState.board[winningCombo[2]] !== null &&
              gameState.board[winningCombo[2]])
        ) {
          gameWon = true;
          return gameWon;
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
  }
  
  // Helper funcitons
  
  const checkForNotNulls = (arr) => arr.filter((x) => x !== null);