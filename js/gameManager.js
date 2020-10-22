import Board from './board.js';
import PieceManager from './pieceManager.js';
export default class GameManager {
    board;
    pieceManager;
    constructor(){
        this.board = new Board(tile_w, tile_b, sheet_w, sheet_b);
        this.pieceManager = new PieceManager();
        this.pieceManager.setup(board);
    }
}