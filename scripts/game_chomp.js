import random from "/scripts/random.js";

const rand = random.fromSeed(new Date().toLocaleDateString("en-US"));

const SIZE = 6;

let locked = false;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function boardToString(board) {
  return [...board].toSorted().join(";");
}

/**
 * @param {[number, number] | string} move
 * @returns {[number, number]}
 */
function parseMove(move) {
  if (typeof move == "string") {
    move = move.split(",");
    return [parseInt(move[0]), parseInt(move[1])];
  } else return move;
}

/**
 * Given a Chomp board `G`, return the set of subgames `G'` for which the next player to move loses.
 *
 * Each position is represented as a `;`-delimited list of positions.
 *
 * @param {Set<string>} board
 * @returns {Set<string>} P-positions
 */
function solve(board) {
  let p_positions = new Set([""]);
  let n_positions = new Set();

  /**
   * @param {Set<string>} board
   * @returns
   */
  function solve_helper(board) {
    let board_str = boardToString(board);
    if (p_positions.has(board_str) || n_positions.has(board_str)) return;
    for (let move of board) {
      let next = makeMove(board, move);
      solve_helper(next);
      let next_str = boardToString(next);
      if (p_positions.has(next_str)) n_positions.add(board_str);
    }
    if (!n_positions.has(board_str)) p_positions.add(board_str);
  }

  solve_helper(board);

  return p_positions;
}

/**
 * Returns the state of the board after the specified move is made.
 *
 * Assumes the move is legal on the board.
 *
 * @param {Set<string>} board
 * @param {[number,number] | string} move
 * @returns {Set<string>}
 */
function makeMove(board, move) {
  move = parseMove(move);
  return board.difference(
    new Set(
      board.keys().filter((v) => {
        const [i, j] = v.split(",");
        return parseInt(i) >= move[0] && parseInt(j) >= move[1];
      }),
    ),
  );
}

/**
 * Update the style of relevant squares based on a move being made
 * @param {string|[number,number]} move
 */
function updateBoard(move) {
  move = parseMove(move);
  for (let i = move[0]; i < SIZE; i++)
    for (let j = move[1]; j < SIZE; j++)
      chomp.squares[i][j].style.backgroundColor = "#fff8ee";
}

/**
 * The set of positions currently on the board. Each position is represented as a string "x,y". (0,0) is omitted.
 */
let full_board = new Set(
  Array.from(
    { length: SIZE * SIZE - 1 },
    (_, i) => `${Math.floor((i + 1) / SIZE)},${(i + 1) % SIZE}`,
  ),
);

/**
 * The set of board states that result in a win for the player moving into them.
 */
let p_positions = solve(full_board);
let attemptNumber = 1;
let currentMove = 0;
let blundered = false;
let board;

while (true) {
  board = new Set(full_board);
  // start with a rectangle that's off by one from a square
  if (rand() > 0.5) board = makeMove(board, [SIZE - 1, 0]);
  else board = makeMove(board, [0, SIZE - 1]);
  // make two random moves on the board
  for (let i = 0; i < 2; i++) {
    board = makeMove(board, [
      Math.floor(rand() * (SIZE - 1)),
      Math.floor(rand() * (SIZE - 1)),
    ]);
  }
  // reject boards that are trivial or are N-positions
  if (
    board.has("0,1") &&
    board.has("1,0") &&
    !p_positions.has(boardToString(board))
  )
    break;
}

full_board = new Set(board);

const chomp = {
  SIZE,
  squares: [],
  blunders: [],
  init: () => {
    // set the background color for missing squares
    for (let i = 0; i < SIZE; i++)
      for (let j = 0; j < SIZE; j++)
        if (!board.has(`${i},${j}`))
          chomp.squares[i][j].style.backgroundColor = "#fff8ee";
  },
  click: async (i, j) => {
    // prevent invalid moves
    if (!board.has(`${i},${j}`)) return;

    // prevent concurrent user actions
    if (locked) return;
    locked = true;

    board = makeMove(board, [i, j]);
    updateBoard([i, j]);
    // check for a first player win
    if (board.size == 0) {
      await delay(500);
      chomp.onWin?.(attemptNumber, chomp.blunders, currentMove);
      locked = false;
      return;
    }
    currentMove += 1;
    // check for a blunder
    if (!p_positions.has(boardToString(board)) && !blundered) {
      blundered = true;
      chomp.blunders.push(currentMove);
    }

    await delay(500);

    // pick opponent's move; try to move to a P-position
    for (let move of board) {
      let next = makeMove(board, move);
      let next_str = boardToString(next);
      if (p_positions.has(next_str)) {
        board = makeMove(board, move);
        updateBoard(move);
        // check for game loss
        if (board.size == 0) {
          await delay(500);
          chomp.try_again();
        }
        locked = false;
        return;
      }
    }
    // pick opponent's move that leaves the most squares
    let move;
    let next_board;
    let max_size = 0;
    for (const m of board) {
      let next = makeMove(board, m);
      if (next.size > max_size) {
        move = m;
        next_board = next;
        max_size = next.size;
      }
    }
    board = next_board;
    updateBoard(move);
    locked = false;
  },
  try_again: () => {
    chomp.onLose?.();
    board = new Set(full_board);
    attemptNumber += 1;
    blundered = false;
    currentMove = 0;
    for (const move of [...board]) {
      const [i, j] = parseMove(move);
      chomp.squares[i][j].style.backgroundColor = "black";
    }
  },
};

export default chomp;
