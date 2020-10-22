export default class PieceManager {
    w_pieces = [];
    b_pieces = [];

    classHashMap = new Map([
        [1, Peon],
        [2, Torre],
        [3, Caballo],
        [4, Alfil],
        [5, Reina],
        [6, Rey]
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
            w_tileSet[i] = new PIXI.Texture(app.loader.resources.whiteSheet.texture,
                                            new PIXI.Rectangle(i * 30, 0, 30, 35));
        }
        this.w_pieces = this.createPieces("w", board, w_tileSet, this.w_placing);

        let b_tileSet = [];
        for (let i = 0; i < 6; i++) {
            b_tileSet[i] = new PIXI.Texture(app.loader.resources.blackSheet.texture,
                                            new PIXI.Rectangle(i * 30, 0, 30, 35));
        }
        this.b_pieces = this.createPieces("b", board, b_tileSet, this.b_placing);

    }

    createPieces(team, board, spritesheet, placing){
        let pieces = [];
        for(let i = 0; i < placing.length; i++){
            if(placing[i] > 0){
                let piece = new classHashMap.get(placing[id])(spritesheet.get(placing[i - 1]), board.tiles[id], team, this);
                piece.interactive = true;
                piece.buttonMode = true;
                piece.on('mousedown', selectPiece);
                board.tiles[id].contains = piece;
                board.addChild(piece);
            }

        }
    }
}