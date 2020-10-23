import Board from './board.js';
import PieceManager from './pieceManager.js';
import {Pawn, Rook, Knight, Bishop, Queen, King} from './pieces.js';
export default class GameManager {

    board;
    pieceManager;
    constructor(tile_w, tile_b, sheet_w, sheet_b){
        this.pieceManager = new PieceManager();

        this.board = new Board(tile_w, tile_b, sheet_w, sheet_b);

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
        if (this.pieceManager.getSelectedPiece() > -1) {
            this.pieceManager.pieces[this.pieceManager.getSelectedPiece()].placePiece(this);
            this.pieceManager.setSelectedPiece(-1)

        }
    }

    selectPiece() {
        this.pieceManager.setSelectedPiece(this.pieceManager.pieces.indexOf(this));
    }
}