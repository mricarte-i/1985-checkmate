export default class Piece extends PIXI.Sprite {
    team;
    pieceManager;
    current_tile;

    constructor(texture, tile, team, pieceManager) {
        super(texture)
        this.x = tile.x;
        this.y = tile.y + 0.01;
        this.anchor.set(0.5, 0.7);
        this.scale.x = 3;
        this.scale.y = 3;
        this.team = team;
        this.pieceManager = pieceManager;
        this.current_tile = tile;
        this.zOrder = -this.y + 7;

    }

    placePiece(tile_dest){
        this.current_tile.setContains(null);
        tile_dest.setContains(this);
        this.x = tile_dest.x;
        this.y = tile_dest.y + 0.01;
        this.zOrder = -this.y + 7;
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