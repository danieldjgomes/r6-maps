import {Floor} from "../Enums";
import {SetupItemType} from "./SetupItemType";



export class SetupItem {
    constructor(x: number, y: number, floor: Floor, type: SetupItemType | null | undefined) {
        this.x = x;
        this.y = y;
        this.floor = floor;
        this.type = type;
    }

    x: number;
    y: number;
    floor: Floor;
    type: SetupItemType | null | undefined
}
