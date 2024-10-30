import {BombType} from "./BombType";
import {Floor} from "./Enums";

export class Bomb {
    x: number;
    y: number;
    type: BombType;
    floor: Floor;

    constructor(x: number, y: number, type: BombType, floor: Floor) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.floor = floor;
    }


}
