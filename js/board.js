import {Pawn, Rook, Knight, Bishop, Queen, King} from './pieces.js';
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
    }

    gridSetup() {
        let tileSize = this.textures.get("tile_w").texture.height;

        for (let i = 0; i <= this.rows; i++) {
            for (let j = 0; j <= this.cols; j++) {
                this.tiles.push(this.createTile(i, j, tileSize));
            }
        }
    }


    createTile(row, col, tileSize) {

        let tile = new Tile(row, col, tileSize, this.textures.get("tile_w").texture, this.scale, this.rows);
        if ((row + col) % 2 == 0) {
            tile.texture = this.textures.get("tile_b").texture;
        }
        //tile.on('mousedown', this.selectTile);
        this.addChild(tile);
        return tile;
    }



    selectPiece() {
        selectP = this;
    }
}

export class Tile extends PIXI.Sprite{
    row;
    col;
    contains;
    constructor(row, col, tileSize, texture, scale, rows){
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
    }
}