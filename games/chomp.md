---
layout: default
modules: game_chomp
title: Chomp
description:
sectionClassName: center
---

<style>
    #game .cell {
        margin:2px;
        min-width:2em;
        min-height:2em;
        max-width:2em;
        min-width:2em;
    }

    #game .row {
        display: flex;
        flex-direction: row;
        justify-content:center;
    }
</style>

<script type="module">
    import { chomp } from "/scripts/game_chomp.js";
    const gameElement = document.getElementById("game");
    chomp.squares = [];
    for (let i=0;i<chomp.SIZE;i++) {
        let row = [];
        let rowElement = document.createElement("div");
        rowElement.className = "row";
        for (let j=0;j<chomp.SIZE;j++) {
            let element = document.createElement("div");
            element.className = "cell";
            element.style.backgroundColor = "black";
            element.addEventListener('click', () => chomp.click(chomp.SIZE-1-i,j));
            row.push(element);
            rowElement.appendChild(element);
        }
        gameElement.appendChild(rowElement);
        chomp.squares.push(row);
    }
    chomp.squares.reverse();
    chomp.squares[0][0].style.backgroundColor = "darkgreen";
</script>

<dialog id="game-info" closedby="any">
    <h3>How to Play</h3>

<p>Chomp is played on a grid of squares. Click on a square to remove it and all squares above and to the right of it. You can't click the bottom left square.</p>

<p>The last player to move wins. Your opponent plays perfectly. If you make any mistakes, you will lose.</p>

<button commandfor="game-info" command="close">Close</button>

</dialog>
<div className="center">
<button onclick="document.getElementById('game-info').showModal()" style="aspect-ratio:1;font-size:1em;border-radius:100%;width:2em;height:2em">ⓘ</button>
</div>

<div id="game"></div>
