import {R6Map} from "./R6Map";
import {ClubHouse} from "./maps/ClubHouse";
import {Lair} from "./maps/Lair";
import {NightHaven} from "./maps/NightHaven";

export class AllMaps {
    allMaps: R6Map[];

    constructor() {
        this.allMaps = [new ClubHouse(), new Lair(), new NightHaven()
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