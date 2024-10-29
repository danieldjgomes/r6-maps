import {Floor} from "./Enums";

export class MapLevel {
    constructor(image: string, floor: Floor) {
        this.image = image;
        this.floor = floor;
    }
    image: string;
    floor: Floor
}