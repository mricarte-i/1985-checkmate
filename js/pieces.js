export default class Piece extends PIXI.Sprite {
    team;
    pieceManager;
    current_tile;

    highlightedCells = [];
    movement = {x: 1, y: 1, z: 1};

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
        this.highlightedCells = [];
    }

    kill(){
        this.destroy();
        //thank you PixiJS
    }

    placePiece(tile_dest){
        this.current_tile.setContains(null);
        if(tile_dest.getContains() != null){
            tile_dest.getContains().kill();
            tile_dest.setContains(null);
        }
        tile_dest.setContains(this);
        this.x = tile_dest.x;
        this.y = tile_dest.y + 0.01;
        this.zOrder = -this.y + 7;
        this.current_tile = tile_dest;
    }

    //movement
    createTilePath(xDir, yDir, movement){
        let currRow = this.current_tile.row;
        let currCol = this.current_tile.col;
        for(let i = 1; i<= movement; i++){
            currCol += xDir;
            currRow += yDir;

            //get state of the target tile
            if(this.current_tile.board.validate(currRow, currCol, this.team)){
                this.highlightedCells.push(this.current_tile.board.getTileAt(currRow, currCol));
            }
        }
    }

    checkPathing(){

        //horizontal
        this.createTilePath(1, 0, this.movement.x);
        this.createTilePath(-1, 0, this.movement.x);

        //vertical
        this.createTilePath(0, 1, this.movement.y);
        this.createTilePath(0, -1, this.movement.y);

        //upper diagonal
        this.createTilePath(1, 1, this.movement.z);
        this.createTilePath(-1, 1, this.movement.z);

        //lower diagonal
        this.createTilePath(-1, -1, this.movement.z);
        this.createTilePath(1, -1, this.movement.z);
    }

    showTiles(){
        for(var idx in this.highlightedCells){
            this.highlightedCells[idx].outlineOn();
        }
    }

    clearTiles(){
        for(var idx in this.highlightedCells){
            this.highlightedCells[idx].outlineOff();
        }
        this.highlightedCells = [];
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