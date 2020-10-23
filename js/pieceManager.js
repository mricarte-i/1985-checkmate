import {Pawn, Rook, Knight, Bishop, Queen, King} from './pieces.js';
export default class PieceManager {
    w_pieces = [];
    b_pieces = [];

    selectP = null;

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
                                            new PIXI.Rectangle(i * 30, 0, 30, 35));
        }
        this.w_pieces = this.createPieces("w", board, w_tileSet, this.w_placing);

        let b_tileSet = [];
        for (let i = 0; i < 6; i++) {
            b_tileSet[i] = new PIXI.Texture(board.textures.get("sheet_w").texture,
                                            new PIXI.Rectangle(i * 30, 0, 30, 35));
        }
        this.b_pieces = this.createPieces("b", board, b_tileSet, this.b_placing);

    }

    createPieces(team, board, spritesheet, placing){
        let pieces = [];
        for(let i = 0; i < placing.length; i++){
            if(placing[i] > 0){
                let piece;
                switch(placing[i]){
                    case 1:
                        piece = new Pawn(spritesheet[placing[i - 1]], board.tiles[i], team, this);
                        break;
                    case 2:
                        piece = new Rook(spritesheet[placing[i - 1]], board.tiles[i], team, this);
                        break;
                    case 3:
                        piece = new Knight(spritesheet[placing[i - 1]], board.tiles[i], team, this);
                        break;
                    case 4:
                        piece = new Bishop(spritesheet[placing[i - 1]], board.tiles[i], team, this);
                        break;
                    case 5:
                        piece = new Queen(spritesheet[placing[i - 1]], board.tiles[i], team, this);
                        break;
                    case 6:
                        piece = new King(spritesheet[placing[i - 1]], board.tiles[i], team, this);
                        break;

                }
                piece.interactive = true;
                piece.buttonMode = true;
                //piece.on('mousedown', this.selectPiece);
                pieces.push(piece);
                board.tiles[i].contains = piece;
                board.addChild(piece);

            }

        }
        return pieces;
    }

}