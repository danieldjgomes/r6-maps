import React from 'react';
import {R6Map} from "../../Models/R6Map";
import {AllMaps} from "../../Models/AllMaps";
import {MapLevel} from "../../Models/MapLevel";
import {BombSite} from "../../Models/BombSite";
import '../HeaderControlPanel.css'

interface MapSelectorProps {
    selectedMap: R6Map;
    onSelectMap: (currentMap: R6Map) => void;
    onSelectLevel: (mapLevel: MapLevel) => void;
    onSelectBombSite: (bombSite: BombSite) => void;
}

const MapSelector: React.FC<MapSelectorProps> = ({
                                                     selectedMap,
                                                     onSelectMap,
                                                     onSelectLevel,
                                                     onSelectBombSite,
                                                 }) => {

    const allMaps = new AllMaps();

    return (
        <div className="map-selector-container" style={{display: 'flex', alignItems: 'center'}}>

            <select onChange={(e) => onSelectMap(allMaps.getMapByName(e.target.value))}>
                {allMaps.getAllMaps().map((map, index) => (
                    <option key={index} value={map.name}>
                        {map.name}
                    </option>
                ))}
            </select>

            <select onChange={(e) => onSelectLevel(selectedMap.getMapLevelByFloor(e.target.value))}>
                {selectedMap?.levels.map((level, index) => (
                    <option key={index} value={level.floor}>
                        {level.floor}
                    </option>
                ))}
            </select>

            <select
                onChange={(e) => {
                    const bombSite = selectedMap.getBombSiteByName(e.target.value);
                    onSelectBombSite(bombSite);
                    onSelectLevel(selectedMap.getMapLevelByFloor(bombSite.bombs[0].floor));
                }}>

                {selectedMap.bombSites.map((bombsite, index) => (
                    <option key={index} value={bombsite.name}>
                        {bombsite.name}
                    </option>
                ))}
            </select>
        </div>
    )
};

export default MapSelector;
