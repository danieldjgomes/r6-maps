import {Floor} from "../Enums";

export class Hatch {
    x: number;
    y: number;
    floor: Floor;

    constructor(x: number, y: number, floor: Floor) {
        this.x = x;
        this.y = y;
        this.floor = floor;
    }
}