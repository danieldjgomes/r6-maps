import {Bomb} from "../Bomb";
import {Hatch} from "./Hatch";
import {WallReinforcement} from "./WallReinforcement";
import {WallDestruction} from "./WallDestruction";
import {WallVault} from "./WallVault";

export class BombSite {
    constructor(bombs: Bomb[], name: string, id: string, hatches: Hatch[], wallReinforcements: WallReinforcement[], wallRotations: WallDestruction[]) {
        this.bombs = bombs;
        this.name = name;
        this.id = id;
        this.hatches = hatches;
        this.wallReinforcements = wallReinforcements;
        this.wallDestructions = wallRotations;
    }

    bombs: Bomb[];
    name: string;
    id: string;
    hatches: Hatch[];
    wallReinforcements: WallReinforcement[];
    wallDestructions: WallDestruction[];

}