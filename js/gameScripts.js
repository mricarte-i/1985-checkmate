let app;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

import GameManager from './gameManager.js';

let keys = {};

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
        .add("king", "king.png")
        .add("tile_w", "tile.png")
        .add("tile_b", "tile_b.png")
        .add("tiles", "basic-sprites.png");

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

    let gm = new GameManager(app.loader.resources.tile_w, app.loader.resources.tile_b,
        app.loader.resources.white_sheet, app.loader.resources.black_sheet);

    gm.board.x += app.view.width/6;
    gm.board.y += app.view.height/8;
    app.stage.addChild(gm.board);

    //mouse interactions
    app.stage.interactive = true;

    //keyboard event handlers
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

    keysDiv = document.querySelector("#keys");
}

function keysDown(e) {
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}