import {Pawn, Rook, Knight, Bishop, Queen, King} from './pieces.js';
export default class Board extends PIXI.Container {

    rows = 7;
    cols = 7;
    scale = 2;
    pieceManager;
    tiles = [];

    constructor(tile_w, tile_b, sheet_w, sheet_b, hl_w, hl_b) {
        super();
        this.tiles = [];
        this.textures = new Map([
            ["tile_w", tile_w],
            ["tile_b", tile_b],
            ["hl_w", hl_w],
            ["hl_b", hl_b],
            ["sheet_w", sheet_w],
            ["sheet_b", sheet_b]
        ]);
        this.gridSetup();
        this.sortDirty = true;
    }

    gridSetup() {
        let tileSize = this.textures.get("tile_w").texture.height;

        for (let i = 0; i <= this.rows; i++) {
            for (let j = 0; j <= this.cols; j++) {
                this.tiles.push(this.createTile(i, j, tileSize));
            }
        }
    }

    getTileAt(row,col){
        //TO DO:
        //  +do it with a math function and not this bullshit
        for(var idx in this.tiles){
            if(this.tiles[idx].row == row && this.tiles[idx].col == col){
                return this.tiles[idx];
            }
        }
    }


    createTile(row, col, tileSize) {

        let tile = new Tile(row, col, tileSize, this.textures.get("tile_w").texture, this.scale, this.rows, this);
        if ((row + col) % 2 == 0) {
            tile.texture = this.textures.get("tile_b").texture;
            tile.normalTile = tile.texture;
        }
        //tile.on('mousedown', this.selectTile);
        this.addChild(tile);
        return tile;
    }

    setPieceManager(pieceManager){
        this.pieceManager = pieceManager;
        for(let i=0; i< this.tiles.length; i++){
            this.tiles[i].setPieceManager(this.pieceManager);
        }
    }

    validate(row, col, team){
        var response = (row <= this.rows && col <= this.cols);
        response = response && (row >= 0 && col >= 0);
        let tile = this.getTileAt(row, col);
        if(tile != null && tile.getContains() != null){
            response = response && (tile.getContains().team != team);
        }
        return response;
    }
}

export class Tile extends PIXI.Sprite{
    row;
    col;
    contained;
    pieceManager;

    board;
    normalTile;

    constructor(row, col, tileSize, texture, scale, rows, board){
        super(texture);

        this.board = board;
        this.normalTile = texture;

        this.anchor.set(0.5);
        this.scale.x = scale;
        this.scale.y = scale;

        this.x = 30 + (col * tileSize * scale);
        this.y = 30 + (row * tileSize * scale);
        this.zOrder = -16;

        this.row = row;
        this.col = col;

        this.interactive = true;
        this.buttonMode = true;
        this.contained = null;

        this.id = rows * row + col;
        //this.on('mousedown', selectTile);
    }

    setContains(piece){
        this.contained = piece;
    }
    getContains(){
        return this.contained;
    }

    setPieceManager(pieceManager){
        this.pieceManager = pieceManager;
    }

    outlineOn(){
        this.texture = this.board.textures.get("hl_w").texture;
        if ((this.row + this.col) % 2 == 0) {
            this.texture = this.board.textures.get("hl_b").texture;
        }
    }
    outlineOff(){
        this.texture = this.normalTile;
    }
}