import {Floor} from "./Enums";


export class SetupItem {
    constructor(x: number, y: number, floor: Floor, type: string) {
        this.x = x;
        this.y = y;
        this.floor = floor;
        this.type = type
    }

    x: number;
    y: number;
    floor: Floor;
    type: string
}
