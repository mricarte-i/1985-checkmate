import Board from './board.js';
import PieceManager from './pieceManager.js';
export default class GameManager {
    selectP = null;
    board;
    pieceManager;
    constructor(tile_w, tile_b, sheet_w, sheet_b){
        this.board = new Board(tile_w, tile_b, sheet_w, sheet_b);
        this.pieceManager = new PieceManager();
        this.pieceManager.setup(this.board);

        this.eventSetup();
    }

    eventSetup(){
        for(let i=0; i < this.board.tiles.length ; i++){
            this.board.tiles[i].on('mousedown', this.selectTile);
        }
        for(let i=0; i < this.pieceManager.b_pieces.length; i++){
            this.pieceManager.b_pieces[i].on('mousedown', this.selectPiece);
            this.pieceManager.w_pieces[i].on('mousedown', this.selectPiece);
        }
    }

    selectTile() {
        if (this.selectP != null) {
            if (this.selectP.moveCheck(this.x, this.y)) {
                this.board.tiles[this.selectP.row * this.board.rows + this.selectP.col].contains = null;
                this.selectP.x = this.x;
                this.selectP.y = this.y;
                this.contains = this.selectP;
                this.selectP = null;
                console.log("yo " + this);
            }
        }
    }

    selectPiece() {
        this.selectP = this;
        console.log("ey " + this);
    }
}