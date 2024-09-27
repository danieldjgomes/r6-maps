import {Floor} from "../Enums";
import {WallDirection} from "./WallDirection";


export class WallReinforcement {
    x: number;
    y: number;
    floor: Floor;
    direction: WallDirection

    constructor(x: number, y: number, floor: Floor, direction: WallDirection) {
        this.x = x;
        this.y = y;
        this.floor = floor;
        this.direction = direction;
    }

}