let app;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

import Piece from './pieces.js';

let keys = {};

let keysDiv;
let gameDiv;

let tiles = [];
let gridContainer;
let rows = 7;
let cols = 7;
let scale = 2;

let selectP;

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
        .add("whiteSheet", "w-pieces-sheet.png")
        .add("king", "king.png")
        .add("tile", "tile.png")
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

    app.stage.addChild(gridSetup());

    app.stage.addChild(piecesSetup());

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

function gridSetup() {
    gridContainer = new PIXI.Container();
    let tileSize = app.loader.resources.tile.texture.height;

    for (let i = 0; i <= rows; i++) {
        for (let j = 0; j <= cols; j++) {
            tiles.push(createTile(i, j, tileSize));
        }
    }
    return gridContainer;
}

function createTile(row, col, tileSize) {
    //tile object
    let tile = new PIXI.Sprite.from(app.loader.resources.tile.texture);
    tile.anchor.set(0.5);
    tile.scale.x = scale;
    tile.scale.y = scale;
    tile.x = 30 + (col * tileSize * scale);
    tile.y = 30 + (row * tileSize * scale);
    tile.interactive = true;
    tile.buttonMode = true;
    tile.contains = null;
    tile.id = rows * row + col;
    tile.on('mousedown', selectTile);
    if ((row + col) % 2 == 0) {
        tile.tint = 0xAAAAAA;
    }

    gridContainer.addChild(tile);
    return tile;
}

function selectTile() {
    if (selectP != null) {
        if (selectP.moveCheck(this.x, this.y)) {
            selectP.x = this.x;
            selectP.y = this.y;
            selectP = null;
        }
    }
}

function selectPiece() {
    selectP = this;

}

function piecesSetup() {
    let tileSet = [];
    for (let i = 0; i < 6; i++) {
        tileSet[i] = new PIXI.Texture(app.loader.resources.whiteSheet.texture,
            new PIXI.Rectangle(i * 30, 0, 30, 35));
    }

    let tileHashMap = new Map([
        ["peon", 0],
        ["torre", 1],
        ["caballo", 2],
        ["alfil", 3],
        ["reina", 4],
        ["rey", 5]
    ]);


    //piece object
    let row = 0;
    let col = 6;
    let id = rows * row + col;
    let piece = new Piece(tileSet[tileHashMap.get("torre")], tiles[id].x, tiles[id].y);
    piece.interactive = true;
    piece.buttonMode = true;
    piece.on('mousedown', selectPiece);
    return piece;
}