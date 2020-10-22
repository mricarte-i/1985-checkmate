export default class Piece extends PIXI.Sprite {
    row;
    col;
    constructor(texture, x, y, row, col, team) {
        super(texture)
        this.x = x;
        this.y = y;
        this.anchor.set(0.5, 0.7);
        this.scale.x = 3;
        this.scale.y = 3;
        this.row = row;
        this.col = col;
        this.team = team;
    }

    moveCheck(tile_dest) {
        return true;
    }
}
export class Peon extends Piece {
    constructor(texture, x, y, row, col, team) {
        super(texture, x, y, row, col, team);
        this.state = "first";
        if(this.team == "b"){
            this.forward = -1;
        }else{
            this.forward = 1;
        }
    }

    moveCheck(tile_dest) {
        if(this.state == "first" && tile_dest.id == (rows*(this.row + this.forward*2) + this.col)){
            this.state = "normal";
            return true;
        }
        if(tile_dest.id == (rows*(this.row + this.forward) + this.col) && tile_dest.contains == null){
            if((this.team == "b" && tile_dest.id <= cols) || (this.team == "w" && tile_dest.id >= rows*(rows-1))){
                //new Queen for that team;
            }
            return true;
        }
        if(tile_dest.contains != null &&
            (tile_dest.id == (rows*(this.row + this.forward) + this.col + 1) ||
             tile_dest.id == (rows*(this.row + this.forward) + this.col - 1)   )
          ){
            if(tile_dest.contains.team != this.team){
                //take();
                return true;
            }
        }

        return false;
    }
}
export class Torre extends Piece {
    constructor(texture, x, y, row, col, team) {
        super(texture, x, y, row, col, team);
    }

    moveCheck(tile_dest) {
        if(verticalCheck(tile_dest) || horizontalCheck(tile_dest)){
            if(tile_dest.contains != null && tile_dest.contains.team != this.team){
                //take();
            }else{
                return false
            }
            return true;
        }
        return false;
    }
    verticalCheck(tile_dest) {
        for(let i = 0; i < rows; i++){
            if(tile_dest.id == (rows*i + this.col)){
                return true;
            }
        }
        return false;
    }
    horizontalCheck(tile_dest) {
        for(let i = 0; i < cols; i++){
            if(tile_dest.id == (rows*this.row + i)){
                return true;
            }
        }
        return false;
    }
}