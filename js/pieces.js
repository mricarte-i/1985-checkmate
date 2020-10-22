export default class Piece extends PIXI.Sprite {
    constructor(texture, x, y) {
        super(texture)
        this.x = x;
        this.y = y;
        this.anchor.set(0.5, 0.7);
        this.scale.x = 3;
        this.scale.y = 3;
    }

    moveCheck(des_x, des_y) {
        return true;
    }
}
