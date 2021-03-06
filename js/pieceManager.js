import {Pawn, Rook, Knight, Bishop, Queen, King} from './pieces.js';
export default class PieceManager {
    w_pieces = [];
    b_pieces = [];

    pieces = [];

    gameover;

    selected_piece = -1;

    classHashMap = new Map([
        [1, Pawn],
        [2, Rook],
        [3, Knight],
        [4, Bishop],
        [5, Queen],
        [6, King]
    ]);

    w_placing = [0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,
                 1,1,1,1,1,1,1,1,
                 2,3,4,5,6,4,3,2];

    b_placing = [2,3,4,5,6,4,3,2,
                 1,1,1,1,1,1,1,1,
                 0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,
                 0,0,0,0,0,0,0,0,];

    constructor(){
    }

    setup(board){
        let w_tileSet = [];
        for (let i = 0; i < 6; i++) {
            w_tileSet[i] = new PIXI.Texture(board.textures.get("sheet_w").texture,
                                            new PIXI.Rectangle(i * 16, 0, 16, 27));
        }
        this.w_pieces = this.createPieces("w", board, w_tileSet, this.w_placing);

        let b_tileSet = [];
        for (let i = 0; i < 6; i++) {
            b_tileSet[i] = new PIXI.Texture(board.textures.get("sheet_b").texture,
                                            new PIXI.Rectangle(i * 16, 0, 16, 27));
        }
        this.b_pieces = this.createPieces("b", board, b_tileSet, this.b_placing);

        board.setPieceManager(this);

        this.gameover = null;
    }

    createPieces(team, board, spritesheet, placing){
        let some_pieces = [];
        for(let i = 0; i < placing.length; i++){
            if(placing[i] > 0){
                let piece;
                switch(placing[i]){
                    case 1:
                        piece = new Pawn(spritesheet[placing[i] -1], board.tiles[i], team, this);
                        break;
                    case 2:
                        piece = new Rook(spritesheet[placing[i] -1], board.tiles[i], team, this);
                        break;
                    case 3:
                        piece = new Knight(spritesheet[placing[i] -1], board.tiles[i], team, this);
                        break;
                    case 4:
                        piece = new Bishop(spritesheet[placing[i] -1], board.tiles[i], team, this);
                        break;
                    case 5:
                        piece = new Queen(spritesheet[placing[i] -1], board.tiles[i], team, this);
                        break;
                    case 6:
                        piece = new King(spritesheet[placing[i] -1], board.tiles[i], team, this);
                        break;

                }
                piece.interactive = true;
                piece.buttonMode = true;
                //piece.on('mousedown', this.selectPiece);
                this.pieces.push(piece);
                some_pieces.push(piece);
                board.tiles[i].setContains(piece);
                board.addChild(piece);

            }

        }
        return some_pieces;
    }

    setSelectedPiece(id) {
        this.selected_piece = id;
    }

    getSelectedPiece() {
        return this.selected_piece;
    }

    deadKing(team){
        this.gameover = team;
    }

}