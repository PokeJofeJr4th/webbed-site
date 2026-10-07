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
</script>

<div id="game"></div>
