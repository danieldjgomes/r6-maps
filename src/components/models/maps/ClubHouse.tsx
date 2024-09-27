import {R6Map} from "../R6Map";
import {BombSite} from "../BombSite";
import {MapLevel} from "../MapLevel";
import {Bomb} from "../../Bomb";
import {BombType} from "../BombType";
import basementImage from '../../../assets/maps/r6-maps-clubhouse-blueprint-1.jpg'
import firstImage from '../../../assets/maps/r6-maps-clubhouse-blueprint-2.jpg'
import secondImage from '../../../assets/maps/r6-maps-clubhouse-blueprint-3.jpg'
import roofImage from '../../../assets/maps/r6-maps-clubhouse-blueprint-4.jpg'
import {Floor} from "../../Enums";
import {Hatch} from "../Hatch";
import {WallReinforcement} from "../WallReinforcement";
import {WallDirection} from "../WallDirection";
import {WallDestruction} from "../WallDestruction";
import {WallDestructionType} from "../WallDestructionType";

export class ClubHouse extends R6Map {
    constructor() {

        let arsenalChurchBombs: Bomb[] = [
            new Bomb(54.5, 20, BombType.A, Floor.Basement),
            new Bomb(54.5, 36, BombType.B, Floor.Basement)]

        let barStageBombs: Bomb[] = [
            new Bomb(0, 0, BombType.A, Floor.FirstFloor),
            new Bomb(0, 0, BombType.B, Floor.FirstFloor)]

        let arsenalChurch = new BombSite(arsenalChurchBombs, "Church and Arsenal Room", "AR", [
                new Hatch(47.5, 46, Floor.FirstFloor),
                new Hatch(56.5, 18.2, Floor.FirstFloor),
                new Hatch(66, 43, Floor.FirstFloor),
            ],
            [
                new WallReinforcement(58.3, 49.8, Floor.Basement, WallDirection.E),
                new WallReinforcement(58.3, 45.8, Floor.Basement, WallDirection.E),
                new WallReinforcement(47.6, 35, Floor.Basement, WallDirection.W),
                new WallReinforcement(47.6, 31, Floor.Basement, WallDirection.W),
            ],
            [
                new WallDestruction(58.3, 41.8, Floor.Basement, WallDirection.E, WallDestructionType.Rotation),
                new WallDestruction(47, 41.8, Floor.Basement, WallDirection.E, WallDestructionType.HeadHeight),

            ]
            )
        let barStage = new BombSite(barStageBombs, "Bar and Stage", "BS", [], [],[])

        let maps: MapLevel[] = [
            new MapLevel(basementImage, Floor.Basement),
            new MapLevel(firstImage, Floor.FirstFloor),
            new MapLevel(secondImage, Floor.SecondFloor),
            new MapLevel(roofImage, Floor.Roof),
        ]

        super("Club House", "CH", [arsenalChurch, barStage], maps);
    }
}