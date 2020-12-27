export default class Piece extends PIXI.Sprite {
    team;
    pieceManager;
    current_tile;

    highlightedTiles = [];
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
        this.highlightedTiles = [];
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

            let state = this.current_tile.board.checkTile(currRow, currCol, this.team);
            if(state != this.current_tile.board.TileState.outOfBounds){
                switch(state){
                    case this.current_tile.board.TileState.enemy:
                        this.highlightedTiles.push(this.current_tile.board.getTileAt(currRow, currCol));
                        i = movement +1;
                        break;
                    case this.current_tile.board.TileState.friendly:
                        i = movement +1;
                        break;
                    case this.current_tile.board.TileState.empty:
                        this.highlightedTiles.push(this.current_tile.board.getTileAt(currRow, currCol));
                        break;
                    default:
                        console.log('HOWMST\'VE');
                        i = movement +1;
                        break;
                }
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
        for(var idx in this.highlightedTiles){
            this.highlightedTiles[idx].outlineOn();
        }
    }

    clearTiles(){
        for(var idx in this.highlightedTiles){
            this.highlightedTiles[idx].outlineOff();
        }
        this.highlightedTiles = [];
    }

    getHighlightedTiles(){
        return this.highlightedTiles;
    }
}
export class Pawn extends Piece {
    firstMove = false;

    constructor(texture, tile, team, pieceManager) {
        super(texture, tile, team, pieceManager);

        this.movement = {x: 0, y: 1, z: 1};

        this.firstMove = true;

    }

    placePiece(tile_dest){
        super.placePiece(tile_dest);

        this.firstMove = false;
    }

    checkDiagonals(){
        if(this.team == "w"){
            this.highlightedTiles = this.highlightedTiles.filter(function(tile, idx, arr){ return tile.board.checkTile(tile.row, tile.col, "w") == tile.board.TileState.enemy});
        }else{
            this.highlightedTiles = this.highlightedTiles.filter(function(tile, idx, arr){ return tile.board.checkTile(tile.row, tile.col, "b") == tile.board.TileState.enemy});
        }
    }

    checkVertical(){
        let badIdx = -1;
        for(var idx in this.highlightedTiles){
            let tile = this.highlightedTiles[idx];
            if(tile.col == this.current_tile.col && tile.board.checkTile(tile.row, tile.col, this.team) != tile.board.TileState.empty){
                badIdx = idx;
            }
        }
        if(badIdx != -1){
            this.highlightedTiles.splice(badIdx, 1);
        }
    }

    checkPathing(){

        if(this.team == "b"){
                //lower diagonal
                super.createTilePath(1, 1, this.movement.z);
                super.createTilePath(-1, 1, this.movement.z);
        }else{
                //upper diagonal
                this.createTilePath(-1, -1, this.movement.z);
                this.createTilePath(1, -1, this.movement.z);
        }


        this.checkDiagonals();

        if(this.team =="w"){
             //vertical
            super.createTilePath(0, -1, this.movement.y + this.firstMove);
        }else{
            this.createTilePath(0, 1, this.movement.y + this.firstMove);
        }

        this.checkVertical();

        console.log(this.highlightedTiles);

    }


}
export class Rook extends Piece {
    constructor(texture, tile, team, pieceManager) {
        super(texture, tile, team, pieceManager);
        this.movement = {x: 7, y: 7, z: 0};
    }
}
export class Knight extends Piece {

}
export class Bishop extends Piece {
    constructor(texture, tile, team, pieceManager) {
        super(texture, tile, team, pieceManager);
        this.movement = {x: 0, y: 0, z: 7};
    }

}
export class Queen extends Piece {
    constructor(texture, tile, team, pieceManager) {
        super(texture, tile, team, pieceManager);
        this.movement = {x: 7, y: 7, z: 7};
    }

}
export class King extends Piece {
    kill(){
        this.pieceManager.deadKing(this.team);
        super.kill();
    }
}