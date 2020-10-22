import {Piece, Pawn, Rook, Knight, Bishop, Queen, King} from './pieces.js';
export default class Board extends PIXI.Container {

    rows = 7;
    cols = 7;
    scale = 2;

    constructor(tile_w, tile_b, sheet_w, sheet_b) {
        super();
        this.tiles = [];
        this.textures = new Map([
            ["tile_w", tile_w],
            ["tile_b", tile_b],
            ["sheet_w", sheet_w],
            ["sheet_b", sheet_b]
        ]);
        this.gridSetup();
        //this.piecesSetup();
    }

    gridSetup() {
        let tileSize = app.loader.resources.textures.get("tile_w").texture.height;

        for (let i = 0; i <= this.rows; i++) {
            for (let j = 0; j <= this.cols; j++) {
                tiles.push(createTile(i, j, tileSize));
            }
        }
        return gridContainer;
    }


    createTile(row, col, tileSize) {

        let tile = new Tile(row, col, tileSize, textures.get("tile_w"), this.scale);
        if ((row + col) % 2 == 0) {
            tile.setTexture(textures.get("tile_b"));
        }
        tile.on('mousedown', selectTile);
        this.addChild(tile);
        return tile;
    }
/*
    piecesSetup() {
        let tileSet = [];
        for (let i = 0; i < 6; i++) {
            tileSet[i] = new PIXI.Texture(app.loader.resources.whiteSheet.texture,
                new PIXI.Rectangle(i * 30, 0, 30, 35));
        }

        let tileHashMap = new Map([
            ["peon", 1],
            ["torre", 2],
            ["caballo", 3],
            ["alfil", 4],
            ["reina", 5],
            ["rey", 6]
        ]);

        let classHashMap = new Map([
            [1, Peon],
            [2, Torre],
            [3, Caballo],
            [4, Alfil],
            [5, Reina],
            [6, Rey]
        ])

        let piecesStartup = [2,3,4,5,6,4,3,2,
                             1,1,1,1,1,1,1,1,
                             0,0,0,0,0,0,0,0,
                             0,0,0,0,0,0,0,0,
                             0,0,0,0,0,0,0,0,
                             0,0,0,0,0,0,0,0,
                             1,1,1,1,1,1,1,1,
                             2,3,4,5,6,4,3,2];

        for (let i = 0; i <= this.rows; i++) {
            for (let j = 0; j <= this.cols; j++) {
                let id = rows * row + col;
                if(piecesStartup[id] > 0){
                    //let piece = new Piece(tileHashMap.get(id), tiles[id].x, tiles[id].y, i, j);
                    let piece = new classHashMap.get(piecesStartup[id])(tileHashMap.get(id), tiles[id].x, tiles[id].y, i, j);
                    piece.interactive = true;
                    piece.buttonMode = true;
                    piece.on('mousedown', selectPiece);
                    tiles[id].contains = tileHashMap.get(id);
                    this.addChild(piece);
                }

            }
        }
    }
*/
    selectTile() {
        if (selectP != null) {
            if (selectP.moveCheck(this.x, this.y)) {
                tiles[selectP.row * rows + selectP.col].contains = null;
                selectP.x = this.x;
                selectP.y = this.y;
                this.contains = selectP;
                selectP = null;
            }
        }
    }

    selectPiece() {
        selectP = this;
    }
}

export class Tile extends PIXI.Sprite{
    row;
    col;
    contains;
    constructor(row, col, tileSize, texture, scale){
        super(texture);
        this.anchor.set(0.5);
        this.scale.x = scale;
        this.scale.y = scale;
        this.x = 30 + (col * tileSize * scale);
        this.y = 30 + (row * tileSize * scale);
        this.row = row;
        this.col = col;
        this.interactive = true;
        this.buttonMode = true;
        this.contains = null;
        this.id = rows * row + col;
        //this.on('mousedown', selectTile);
        if ((row + col) % 2 == 0) {
            this.setTexture(texture_b);
        }
    }
}