let app;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.SORTABLE_CHILDREN = true;
import GameManager from './gameManager.js';

let board;
let keys = {};

let gameManager;

let keysDiv;
let gameDiv;

window.onload = function () {
    app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor: 0xAAAAAA
    });

    gameDiv = document.querySelector("#game");
    gameDiv.appendChild(app.view);

    //preload assets
    app.loader.baseUrl = "images";
    app.loader
        .add("white_sheet", "w-pieces-sheet.png")
        .add("black_sheet", "b-pieces-sheet.png")
        .add("tile_w_highlight", "tile_w-highlight.png")
        .add("tile_b_highlight", "tile_b-highlight.png")
        .add("tile_w", "tile.png")
        .add("tile_b", "tile_b.png");

    app.loader.onProgress.add(showProgress);
    app.loader.onComplete.add(doneLoading);
    app.loader.onError.add(reportError);

    app.loader.load();
}

function showProgress(e) {
    console.log(e.progress);
}

function reportError(e) {
    console.log("ERROR: " + e.message);
}

function doneLoading(e) {
    console.log("DONE LOADING!");
    gameSetup();
}


function gameSetup() {

    gameManager = new GameManager(app.loader.resources.tile_w, app.loader.resources.tile_b,
        app.loader.resources.white_sheet, app.loader.resources.black_sheet, app.loader.resources.tile_w_highlight, app.loader.resources.tile_b_highlight);

    gameManager.board.x += app.view.width/6;
    gameManager.board.y += app.view.height/8;
    board = gameManager.board
    app.stage.addChild(board);

    //mouse interactions
    app.stage.interactive = true;

    //keyboard event handlers
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

    keysDiv = document.querySelector("#keys");

    app.ticker.add(gameLoop);
}

function keysDown(e) {
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}

function gameLoop(){

    board.children.sort(function(a,b) {
        if (a.position.y > b.position.y) return 1;
        if (a.position.y < b.position.y) return -1;
        if (a.position.x > b.position.x) return 1;
        if (a.position.x < b.position.x) return -1;
        return 0;
      });

    if(gameManager.checkIfOver()){
        gameManager.endGame();
        gameSetup();
    }
}