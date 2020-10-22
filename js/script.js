let app;
let player;

import Piece from './pieces.js';

let keys = {};

let keysDiv;
let gameDiv;

let bulletSpeed = 10;
let bullets = [];
let maxLifeTime = 70;

let move = 5;

let tiles = [];
let gridContainer;
let rows = 7;
let cols = 7;

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
        .add("king", "king.png")
        .add("tile", "tile.png")
        .add("block", "transparentblock3.png")
        .add("tiles", "basic-sprites.png")
        .add("player", "char2.png");

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

function gameSetup(){

    app.stage.addChild(gridSetup());

    //player object
    player = new PIXI.Sprite.from(app.loader.resources.player.texture);
    player.anchor.set(0.5);
    player.x = app.view.width / 2;
    player.y = app.view.height / 2;

    app.stage.addChild(player);


    app.stage.addChild(piecesSetup());


     //enemy object
     let enemy = new PIXI.Sprite.from(app.loader.resources.player.texture);
     enemy.anchor.set(0.5);
     enemy.x = player.x;
     enemy.y = player.y - app.view.height / 4;
     enemy.tint = Math.random() * 0xFFFFFF;

     app.stage.addChild(enemy);


    //mouse interactions
    app.stage.interactive = true;
    gameDiv.addEventListener("pointerdown", fireBullet);
    //app.stage.on("pointermove", pointerMovePlayer);

    //keyboard event handlers
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);

    app.ticker.add(gameLoop);

    keysDiv = document.querySelector("#keys");
}

function pointerMovePlayer(e) {
    let pos = e.data.global;
    player.x = pos.x;
    player.y = pos.y;
}

function keysDown(e){
    keys[e.keyCode] = true;
}
function keysUp(e){
    keys[e.keyCode] = false;
}

function gameLoop(delta){
    keysDiv.innerHTML = JSON.stringify(keys);

    if (keys["87"]) { //w
        player.y -= move*delta;
    }
    if (keys["83"]) { //s
        player.y += move*delta;
    }
    if (keys["65"]) { //a
        player.x -= move*delta;
    }
    if (keys["68"]) { //d
        player.x += move*delta;
    }

    player.x = Math.floor(player.x);
    player.y = Math.floor(player.y);

    updateBullets(delta);
}

function fireBullet(e) {
    let bullet = createBullet();
    bullets.push(bullet);
}

function createBullet(){
    //bullet object
    bullet = new PIXI.Sprite.from(app.loader.resources.block.texture);
    bullet.anchor.set(0.5);
    bullet.x = player.x;
    bullet.y = player.y;
    bullet.speed = bulletSpeed;
    bullet.tint = Math.random() * 0xFFFFFF;
    bullet.time = 0;
    app.stage.addChild(bullet);
    return bullet;
}

function updateBullets(delta){
    for(let i = 0; i < bullets.length; i++){
        bullets[i].time += delta;
        bullets[i].position.y -= bullets[i].speed;
        if(bullets[i].position.y < 0 || bullets[i].time > maxLifeTime){
            app.stage.removeChild(bullets[i]);
            bullets.splice(i,1);
        }else{
            if(rectsIntersect(bullets[i], enemy)){
                bullets[i].speed = 0;
            }
        }

    }

}

function rectsIntersect(a,b){
    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return aBox.x + aBox.width > bBox.x &&
          aBox.x < bBox.x + bBox.width &&
          aBox.y + aBox.height > bBox.y &&
          aBox.y < bBox.y + bBox.height;
}

function gridSetup() {
    gridContainer = new PIXI.Container();
    let tileSize = app.loader.resources.block.texture.height;

    for(let i = 0; i <= rows; i++){
        for(let j = 0; j <= cols; j++){
            tiles.push(createTile(i, j, tileSize));
        }
    }
    return gridContainer;
}

function createTile(row, col, tileSize){
        //tile object
        let tile = new PIXI.Sprite.from(app.loader.resources.tile.texture);
        tile.anchor.set(0.5);
        tile.x = 10 + (col * tileSize);
        tile.y = 10 + (row * tileSize);
        tile.interactive = true;
        tile.buttonMode = true;
        tile.id = 1 + row * col;
        tile.on('mousedown', selectTile);
        if((row + col)%2 == 0){
            tile.tint = 0xAAAAAA;
        }
        //tile.on('mouseout', hover);

        gridContainer.addChild(tile);
        return tile;
}

function selectTile(){
    if(selectP != null){
        if(selectP.moveCheck(this.x, this.y)){
            selectP.x = this.x;
            selectP.y = this.y;
            selectP = null;
        }
    }

        //player.x = this.x;
        //player.y = this.y;

}

function selectPiece(){
    selectP = this;

}

function piecesSetup() {
        //piece object
        let row = 0;
        let col = 6;
        let id = rows*row + col;
        let piece = new Piece(app.loader.resources.king.texture, tiles[id].x, tiles[id].y);
        piece.interactive = true;
        piece.buttonMode = true;
        piece.on('mousedown', selectPiece);
        app.stage.addChild(piece);
}