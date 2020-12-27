import Board from './board.js';
import PieceManager from './pieceManager.js';
import {Pawn, Rook, Knight, Bishop, Queen, King} from './pieces.js';
export default class GameManager {

    board;
    pieceManager;
    constructor(tile_w, tile_b, sheet_w, sheet_b, hl_w, hl_b){
        this.pieceManager = new PieceManager();

        this.board = new Board(tile_w, tile_b, sheet_w, sheet_b, hl_w, hl_b);

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
        if (this.pieceManager.getSelectedPiece() > -1){

            if (this.pieceManager.pieces[this.pieceManager.getSelectedPiece()] != null
                && this.pieceManager.pieces[this.pieceManager.getSelectedPiece()].getHighlightedTiles().includes(this)) {
                this.pieceManager.pieces[this.pieceManager.getSelectedPiece()].placePiece(this);
            }

            this.pieceManager.pieces[this.pieceManager.getSelectedPiece()].clearTiles();
            this.pieceManager.setSelectedPiece(-1);
        }
    }

    selectPiece() {
        if(this.pieceManager.getSelectedPiece() != -1){
            if (this.pieceManager.pieces[this.pieceManager.getSelectedPiece()].getHighlightedTiles().includes(this.current_tile)){
                this.pieceManager.pieces[this.pieceManager.getSelectedPiece()].placePiece(this.current_tile);
            }

            this.pieceManager.pieces[this.pieceManager.getSelectedPiece()].clearTiles();
            this.pieceManager.setSelectedPiece(-1);

        }else{
            this.pieceManager.setSelectedPiece(this.pieceManager.pieces.indexOf(this));
            this.checkPathing();
            this.showTiles();
        }

    }

    checkIfOver(){
        return this.pieceManager.gameover != null;
    }

    endGame(){
        this.board.destroy();
        console.log(this.pieceManager.gameover + " has lost the game!");
        this.pieceManager = null;
        this.board = null;
    }
}