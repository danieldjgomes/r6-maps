import {R6Map} from "./R6Map";
import {ClubHouse} from "./maps/ClubHouse";

export class AllMaps {
    allMaps: R6Map[];

    constructor() {
        this.allMaps = [new ClubHouse()
        ];
    }

    getAllMaps(): R6Map[] {
        return this.allMaps;
    }

    getMapByName(name: string): R6Map {
        // @ts-ignore
        return this.allMaps.find(m => m.name === name);
    }
}