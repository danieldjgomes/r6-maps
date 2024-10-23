import {Floor} from "../Enums";
import {DefenseSetupItemType} from "./DefenseSetupItemType";
import {R6PlannerOperator} from "../mapViewer/r6PlannerOperator";


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
    constructor(x: number, y: number, floor: Floor, operator : R6PlannerOperator ) {
        super(x,y,floor)
        this.operator = operator;
    }
    operator : R6PlannerOperator
}