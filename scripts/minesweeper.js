const map = [];
var gameStarted = false;

function resetBoard() {
  let table_html = "";
  // fill in an empty map
  for (let i = 0; i < 10; i++) {
    map[i] = [];
    table_html += `<tr id=\"${i} _\">`;
    for (let j = 0; j < 10; j++) {
      map[i][j] = Math.random() < 0.15;
      table_html += `<th id=\"${i} ${j}\" onClick=\"handleClick(${i},${j})\" class=\"unknown\"></th>`;
    }
    table_html += `</tr>`;
  }
  document.getElementById("minesweeper").innerHTML = table_html;
}

window.onload = (_) => {
  resetBoard();
};

function handleClick(row, col) {
  if (!gameStarted) {
    map_window(row, col, (r, c) => (map[r][c] = false));
    gameStarted = true;
  }

  if (map[row][col]) {
    window.alert("Kaboom :(");
    resetBoard();
  } else {
    let i = 0;
    map_window(row, col, (r, c) => {
      if (map[r][c]) {
        i += 1;
      }
    });
    document.getElementById(`${row} ${col}`).innerText = i;
  }
}

function map_window(row, col, func) {
  for (let dr = -1; dr < 2; dr++) {
    let r = row + dr;
    if (r < 0 || r >= map.length) {
      continue;
    }
    for (let dc = -1; dc < 2; dc++) {
      let c = col + dc;
      if (c < 0 || c >= map.length) {
        continue;
      }
      func(r, c);
    }
  }
}
