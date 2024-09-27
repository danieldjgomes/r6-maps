import React from 'react';
import { MapNames, Floor } from './Enums';
import {R6Map} from "./models/R6Map";
import {AllMaps} from "./models/AllMaps";
import {MapLevel} from "./models/MapLevel";
import {BombSite} from "./models/BombSite";

interface MapSelectorProps {
    allMaps: AllMaps;
    selectedMap: R6Map;
    selectedLevel: MapLevel;
    selectedBombSite: BombSite;
    onSelectMap: (currentMap: R6Map) => void;
    onSelectLevel: (mapLevel: MapLevel) => void;
    onSelectBombSite: (bombSite: BombSite) => void;
}

const MapSelector: React.FC<MapSelectorProps> = ({ onSelectMap, onSelectLevel, allMaps,selectedMap, selectedLevel,onSelectBombSite }) => {
    return (
        <div style={{
            opacity: '70%',
            position: 'absolute',
            zIndex: 10,
            top: '20px',  // Aumentei o espaçamento do topo para uma aparência mais equilibrada
            left: '20px', // Aumentei o espaçamento lateral para manter a simetria
            backgroundColor: '#ffffff',
            borderRadius: '8px',  // Borda levemente mais suave
            padding: '15px',  // Aumentei o espaçamento interno para mais conforto visual
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',  // A sombra agora está um pouco mais forte e difusa
            border: '1px solid rgba(0, 0, 0, 0.05)',  // Adicionei uma borda sutil para definição extra
            transition: 'box-shadow 0.3s ease',  // Transição suave ao interagir com o elemento
        }}>


            <select onChange={(e) => onSelectMap(allMaps.getMapByName(e.target.value))}>
                {/*<option value={selectedMap.levels[0].floor}>Selecione o Mapa</option>*/}
                {allMaps.getAllMaps().map((map, index) => (
                    <option key={index} value={map.name}>
                        {map.name}
                    </option>
                ))}
            </select>


            {/* Seletor de Andares */}
            <select onChange={(e) => onSelectLevel(selectedMap.getMapLevelByFloor(e.target.value))}>
                {/*<option value="">Selecione o Andar</option>*/}
                {selectedMap?.levels.map((level, index) => (
                    <option key={index} value={level.floor}>
                        {level.floor}
                    </option>
                ))}
            </select>
            {/* Seletor de Bombsite */}
            <select onChange={(e) => onSelectBombSite(selectedMap.getBombSiteByName(e.target.value))}>
                {selectedMap.bombSites.map((bombsite, index) => (
                    <option key={index} value={bombsite.name}>
                        {bombsite.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MapSelector;
