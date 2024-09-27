import {Floor} from "../Enums";
import {WallDirection} from "./WallDirection";
import {WallDestructionType} from "./WallDestructionType";



export class WallDestruction {
    constructor(x: number, y: number, floor: Floor, direction: WallDirection, type: WallDestructionType) {
        this.x = x;
        this.y = y;
        this.floor = floor;
        this.direction = direction;
        this.type = type;
    }

    x: number;
    y: number;
    floor: Floor;
    direction: WallDirection
    type: WallDestructionType
}
