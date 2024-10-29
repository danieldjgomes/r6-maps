import {BombSite} from "./BombSite";
import {MapLevel} from "./MapLevel";

export class R6Map {

    name: string;
    id: string
    bombSites: BombSite[]
    levels: MapLevel[]

    constructor(name: string, id: string, bombSites: BombSite[], levels: MapLevel[]) {
        this.name = name;
        this.id = id;
        this.bombSites = bombSites;
        this.levels = levels;
    }

    getMapLevelByFloor(floor: string): MapLevel {
        // @ts-ignore
        return this.levels.find(l => l.floor.valueOf() === floor)
    }

    getBombSiteByName(bombsite: string): BombSite {
        // @ts-ignore
        return this.bombSites.find(b => b.name === bombsite)

    }
}