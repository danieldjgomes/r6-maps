// mapData.ts
import ClubhouseBasement from '../assets/maps/r6-maps-clubhouse-blueprint-1.jpg';
import ClubhouseFirstFloor from '../assets/maps/r6-maps-clubhouse-blueprint-2.jpg';
import ClubhouseSecondFloor from '../assets/maps/r6-maps-clubhouse-blueprint-4.jpg';
// Adicione mais importações conforme necessário

import { MapNames, Floor } from './models/Enums';

// Interface para definir o tipo do mapa
interface Map {
    name: MapNames;
    level: Floor;
    image: string;
}

// Definir a lista de mapas com seus nomes, níveis e imagens
export const maps: Map[] = [
    { name: MapNames.Clubhouse, level: Floor.Basement, image: ClubhouseBasement },
    { name: MapNames.Clubhouse, level: Floor.FirstFloor, image: ClubhouseFirstFloor },
    { name: MapNames.Clubhouse, level: Floor.SecondFloor, image: ClubhouseSecondFloor },
    // Adicione mais mapas e níveis aqui conforme necessário
];
