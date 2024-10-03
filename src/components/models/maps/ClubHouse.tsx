import {R6Map} from "../R6Map";
import {BombSite} from "../BombSite";
import {MapLevel} from "../MapLevel";
import {Bomb} from "../../Bomb";
import {BombType} from "../BombType";
import basementImage from '../../../assets/maps/r6-maps-clubhouse-blueprint-1.jpeg'
import firstImage from '../../../assets/maps/r6-maps-clubhouse-blueprint-2.jpg'
import secondImage from '../../../assets/maps/r6-maps-clubhouse-blueprint-3.jpg'
import roofImage from '../../../assets/maps/r6-maps-clubhouse-blueprint-4.jpg'
import {Floor} from "../../Enums";
export class ClubHouse extends R6Map {
    constructor() {

        let arsenalChurchBombs: Bomb[] = [
            new Bomb(54.5, 20, BombType.A, Floor.Basement),
            new Bomb(54.5, 36, BombType.B, Floor.Basement)]

        let barStageBombs: Bomb[] = [
            new Bomb(51, 50, BombType.A, Floor.FirstFloor),
            new Bomb(63, 40, BombType.B, Floor.FirstFloor)]

        let gymBedroomBombs: Bomb[] = [
            new Bomb(51, 44.7, BombType.A, Floor.SecondFloor),
            new Bomb(42, 41, BombType.B, Floor.SecondFloor)]


        let maps: MapLevel[] = [
            new MapLevel(basementImage, Floor.Basement),
            new MapLevel(firstImage, Floor.FirstFloor),
            new MapLevel(secondImage, Floor.SecondFloor),
            new MapLevel(roofImage, Floor.Roof),
        ]

        let arsenalChurch = new BombSite(arsenalChurchBombs, "Church and Arsenal Room");
        let barStage = new BombSite(barStageBombs, "Bar and Stage")
        let gymbedrom = new BombSite(gymBedroomBombs, "Gym and Bedroom")


        super("Club House", "CH", [arsenalChurch, barStage, gymbedrom], maps);
    }
}