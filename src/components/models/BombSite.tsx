import {Bomb} from "./Bomb";

export class BombSite {
    constructor(bombs: Bomb[], name: string) {
        this.bombs = bombs;
        this.name = name;
    }

    bombs: Bomb[];
    name: string;

}