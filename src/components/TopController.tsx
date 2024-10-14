import React from 'react';
import {R6Map} from "./models/R6Map";
import {AllMaps} from "./models/AllMaps";
import {MapLevel} from "./models/MapLevel";
import {BombSite} from "./models/BombSite";
import './mapSelector.css';
import {FaShareFromSquare} from "react-icons/fa6";

interface MapSelectorProps {
    allMaps: AllMaps;
    selectedMap: R6Map;
    selectedLevel: MapLevel;
    selectedBombSite: BombSite;
    saveConfiguration: () => void;
    containerWidth: number;
    setContainerWidth: (width: number) => void;

    onSelectMap: (currentMap: R6Map) => void;
    onSelectLevel: (mapLevel: MapLevel) => void;
    onSelectBombSite: (bombSite: BombSite) => void;
}

const TopController: React.FC<MapSelectorProps> = ({
                                                       onSelectMap,
                                                       onSelectLevel,
                                                       allMaps,
                                                       selectedMap,
                                                       onSelectBombSite,
                                                       saveConfiguration,
                                                       containerWidth,
                                                       setContainerWidth
                                                   }) => {
    return (
        <div
            style={{
                position: 'fixed',  // Fica fixado na tela
                top: 0,  // Alinhado ao topo
                left: 0,  // Alinhado à esquerda
                width: '100%',  // Ocupa 100% da largura da tela
                backgroundColor: '#0d1b2a',  // Cor de fundo
                padding: '3px',  // Padding para o conteúdo do componente
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',  // Sombra suave
                zIndex: 1000,  // Garante que ficará acima de outros elementos
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',  // Centraliza os itens verticalmente
                    justifyContent: 'space-between',  // Espaça o conteúdo entre os seletores e o botão
                    padding: '0 10px',  // Padding horizontal para espaçamento
                }}
            >
                <div className="map-selector-container" style={{display: 'flex', alignItems: 'center'}}>
                    <select onChange={(e) => onSelectMap(allMaps.getMapByName(e.target.value))}>
                        {allMaps.getAllMaps().map((map, index) => (
                            <option key={index} value={map.name}>
                                {map.name}
                            </option>
                        ))}
                    </select>

                    {/* Seletor de Andares */}
                    <select onChange={(e) => onSelectLevel(selectedMap.getMapLevelByFloor(e.target.value))}>
                        {selectedMap?.levels.map((level, index) => (
                            <option key={index} value={level.floor}>
                                {level.floor}
                            </option>
                        ))}
                    </select>

                    {/* Seletor de Bombsite */}
                    <select
                        onChange={(e) => {
                            onSelectBombSite(selectedMap.getBombSiteByName(e.target.value));
                            onSelectLevel(selectedMap.getMapLevelByFloor(selectedMap.getBombSiteByName(e.target.value).bombs[0].floor));
                        }}
                    >
                        {selectedMap.bombSites.map((bombsite, index) => (
                            <option key={index} value={bombsite.name}>
                                {bombsite.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div
                    style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <input
                        type="range"
                        min="50"
                        max="200"
                        value={containerWidth}
                        onChange={(e) => setContainerWidth(parseInt(e.target.value))}
                        className="slider"
                        id="widthSlider"
                    />
                </div>

                <FaShareFromSquare
                    color={"#E0E1DD"}
                    onClick={saveConfiguration}
                    style={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                        marginRight: '5px',  // Empurra o botão para o lado direito
                        alignSelf: 'center',  // Alinha verticalmente ao centro
                    }}
                />
            </div>
        </div>
    );
};

export default TopController;