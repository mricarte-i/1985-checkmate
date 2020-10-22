export default class Piece extends PIXI.Sprite {
    team;
    pieceManager;
    current_tile;

    constructor(texture, tile, team, pieceManager) {
        super(texture)
        this.x = tile.x;
        this.y = tile.y;
        this.anchor.set(0.5, 0.7);
        this.scale.x = 3;
        this.scale.y = 3;
        this.team = team;
        this.pieceManager = pieceManager;
        this.current_tile = tile;
    }

    placePiece(tile_dest){
        current_tile.contains = null;
        tile_dest.contains = this;
        this.x = tile_dest.x;
        this.y = tile_dest.y;
        this.current_tile = tile_dest;
    }
}
export class Peon extends Piece {

}
export class Torre extends Piece {

}
export class Caballo extends Piece {

}
export class Alfil extends Piece {

}
export class Reina extends Piece {

}
export class Rey extends Piece {

}