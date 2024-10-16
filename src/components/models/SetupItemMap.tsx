import {Floor} from "../Enums";
import {DefenseSetupItemType} from "./DefenseSetupItemType";
import {Operator} from "../mapViewer/operator";


export class SetupItem {
    constructor(x: number, y: number, floor: Floor) {
        this.x = x;
        this.y = y;
        this.floor = floor;
    }

    x: number;
    y: number;
    floor: Floor;
}

export class SetupItemMap extends SetupItem{
    constructor(x: number, y: number, floor: Floor, type: DefenseSetupItemType | null | undefined) {
        super(x,y,floor)
        this.type = type;
    }
    type: DefenseSetupItemType | null | undefined
}


export class SetupItemOperator extends SetupItem{
    constructor(x: number, y: number, floor: Floor, operator : Operator ) {
        super(x,y,floor)
        this.operator = operator;
    }
    operator : Operator
}