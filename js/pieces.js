export default class Piece extends PIXI.Sprite {
    team;
    pieceManager;
    current_tile;

    constructor(texture, tile, team, pieceManager) {
        super(texture)
        this.x = tile.x;
        this.y = tile.y;
        this.anchor.set(0.5, 1);
        this.scale.x = 2;
        this.scale.y = 2;
        this.team = team;
        this.pieceManager = pieceManager;
        this.current_tile = tile;


    }

    placePiece(tile_dest){
        console.log(this.current_tile);
        this.current_tile.setContains(null);
        tile_dest.setContains(this);
        console.log("x=" + this.x + " y=" + this.y)
        this.x = tile_dest.x;
        this.y = tile_dest.y;
        this.current_tile = tile_dest;
    }
}
export class Pawn extends Piece {

}
export class Rook extends Piece {

}
export class Knight extends Piece {

}
export class Bishop extends Piece {

}
export class Queen extends Piece {

}
export class King extends Piece {

}