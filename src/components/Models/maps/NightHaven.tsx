import {R6Map} from "../R6Map";
import {BombSite} from "../BombSite";
import {MapLevel} from "../MapLevel";
import {Bomb} from "../Bomb";
import {BombType} from "../BombType";
import level1 from '../../../assets/maps/r6-maps-nighthavenlabs-blueprint-1.jpg'
import level2 from '../../../assets/maps/r6-maps-nighthavenlabs-blueprint-2.jpg'
import level3 from '../../../assets/maps/r6-maps-nighthavenlabs-blueprint-3.jpg'
import level4 from '../../../assets/maps/r6-maps-nighthavenlabs-blueprint-4.jpg'
import {Floor} from "../Enums";

export class NightHaven extends R6Map {
    constructor() {

        let bombs1: Bomb[] = [
            new Bomb(54.5, 20, BombType.A, Floor.Basement),
            new Bomb(54.5, 36, BombType.B, Floor.Basement)]

        let bombs2: Bomb[] = [
            new Bomb(51, 50, BombType.A, Floor.FirstFloor),
            new Bomb(63, 40, BombType.B, Floor.FirstFloor)]

        let bombs3: Bomb[] = [
            new Bomb(51, 44.7, BombType.A, Floor.SecondFloor),
            new Bomb(42, 41, BombType.B, Floor.SecondFloor)]

        let bombs4: Bomb[] = [
            new Bomb(64.2, 44.3, BombType.A, Floor.SecondFloor),
            new Bomb(66, 57.6, BombType.B, Floor.SecondFloor)]


        let maps: MapLevel[] = [
            new MapLevel(level1, Floor.Basement),
            new MapLevel(level2, Floor.FirstFloor),
            new MapLevel(level3, Floor.SecondFloor),
            new MapLevel(level3, Floor.Roof),
        ]

        let arsenalChurch = new BombSite(  bombs1, "Church and Arsenal Room");
        let barStage = new BombSite(bombs2, "Bar and Stage")
        let gymbedrom = new BombSite(bombs3, "Gym and Bedroom")
        let cctv = new BombSite(bombs4, "CCTV e Dinheiro")


        super("Night Haven", [], maps);
    }
}