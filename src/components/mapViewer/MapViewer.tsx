import React, {useState, useRef, useEffect} from 'react';
import './MapViewer.css'; // Importar o arquivo CSS
import MapSelector from '../MapSelector'; // Importar o seletor de mapas
import {R6Map} from "../models/R6Map";
import {AllMaps} from "../models/AllMaps";
import {MapLevel} from "../models/MapLevel";
import {BombSite} from "../models/BombSite";
import {FaRegArrowAltCircleUp} from "react-icons/fa";
import {WallDirection} from "../models/WallDirection";
import {FaArrowsSpin} from "react-icons/fa6";
import {WallDestruction} from "../models/WallDestruction";
import {WallDestructionType} from "../models/WallDestructionType";
import { GiHeadshot } from "react-icons/gi";


const MapViewer: React.FC = () => {
    const allMaps: AllMaps = new AllMaps();
    const [selectedMap, setSelectedMap] = useState<R6Map>(allMaps.getAllMaps()[0]);
    const [selectedLevel, setSelectedLevel] = useState<MapLevel>(allMaps.getAllMaps()[0].levels[0]);
    const [selectedBombSite, setSelectedBombSite] = useState<BombSite>(allMaps.getAllMaps()[0].bombSites[0]);
    const [iconSize, setIconSize] = useState(30); // Tamanho inicial dos ícones
    const [containerWidth, setContainerWidth] = useState(85); // Inicial width em %

    const mapImageRef = useRef<HTMLImageElement>(null); // Referência para a imagem do mapa
    const iconContainerRef = useRef<HTMLDivElement>(null); // Referência para o contêiner dos ícones

    // Função para atualizar o mapa selecionado
    const handleSelectMap = (r6Map: R6Map) => {
        const map = allMaps.getMapByName(r6Map.name);
        if (map) {
            setSelectedMap(map);
            setSelectedLevel(map.levels[0]); // Resetar o andar ao selecionar um novo mapa
        }
    };

    const handleSelectLevel = (mapLevel: MapLevel) => {
        setSelectedLevel(mapLevel);
    };

    const handleSelectBombSite = (site: BombSite) => {
        setSelectedBombSite(site);
    };

    const getRotation = (direction: string) => {
        switch (direction) {
            case WallDirection.N.toString():
                return '0'
            case WallDirection.E.toString():
                return '90deg'
            case WallDirection.W.toString():
                return '-0.25turn'
            case WallDirection.S.toString():
                return '3.142rad'
        }
    }


    // Atualizar o tamanho dos ícones baseado no tamanho da imagem do mapa
    useEffect(() => {
        const updateIconSize = () => {
            if (mapImageRef.current) {
                const imageWidth = mapImageRef.current.offsetWidth;
                // Definir o tamanho dos ícones como 5% do tamanho da largura da imagem
                const newSize = Math.max(imageWidth * 0.05, 20); // Tamanho mínimo de 20px
                setIconSize(newSize);
            }
        };

        // Chamar quando a janela for redimensionada ou a imagem for carregada
        window.addEventListener('resize', updateIconSize);
        updateIconSize(); // Chamar ao montar o componente

        return () => {
            window.removeEventListener('resize', updateIconSize);
        };
    }, [containerWidth]);

    // Obtendo o mapa selecionado baseado no mapa e nível escolhidos
    const displayedMap = selectedMap?.getMapLevelByFloor(selectedLevel?.floor.valueOf() as string);

    return (
        <div>
            <div className="slider-container">
                <input
                    type="range"
                    min="85"
                    max="200"
                    value={containerWidth}
                    onChange={(e) => setContainerWidth(parseInt(e.target.value))}
                    className="slider"
                    id="widthSlider"
                />
            </div>

            <div
                className="map-viewer-container"
                style={{ width: `${containerWidth}%` }} // Aplicar a largura dinâmica
            >
                <MapSelector
                    onSelectMap={handleSelectMap}
                    onSelectLevel={handleSelectLevel}
                    onSelectBombSite={handleSelectBombSite}
                    allMaps={allMaps}
                    selectedLevel={selectedLevel}
                    selectedMap={selectedMap}
                    selectedBombSite={selectedBombSite}
                />

                <div className="map-container">
                    {displayedMap && (
                        <>
                            <img
                                src={displayedMap.image}
                                className="map-image"
                                ref={mapImageRef} // Referência para a imagem
                                alt={`Map view of ${selectedMap.name} - ${selectedLevel.floor}`}
                            />

                            <div className="icon-container" ref={iconContainerRef}>
                                {selectedBombSite?.bombs.map((bomb, index) => (
                                    bomb.floor === selectedLevel.floor && (
                                        <div
                                            key={index}
                                            className="bomb-icon"
                                            style={{
                                                left: `${bomb.x}%`,  // Usar porcentagem para a posição horizontal
                                                top: `${bomb.y}%`,   // Usar porcentagem para a posição vertical
                                                width: `${iconSize * 0.5}px`, // Largura proporcional
                                                height: `${iconSize * 0.5}px`, // Altura proporcional
                                            }}
                                        >
                                            {String.fromCharCode(65 + index)} {/* Exibir letras A, B, ... */}
                                        </div>
                                    )
                                ))}
                                {selectedBombSite?.hatches.map((hatch, index) => (
                                    hatch.floor === selectedLevel.floor && (
                                        <div
                                            key={index}
                                            className="hatch-icon"
                                            style={{
                                                left: `${hatch.x}%`,  // Usar porcentagem para a posição horizontal
                                                top: `${hatch.y}%`,   // Usar porcentagem para a posição vertical
                                                width: `${iconSize * 0.5}px`, // Largura proporcional
                                                height: `${iconSize * 0.5}px`, // Altura proporcional
                                            }}
                                        >
                                        </div>
                                    )
                                ))}
                                {selectedBombSite?.wallReinforcements.map((wall, index) => (
                                    wall.floor === selectedLevel.floor && (
                                        <div
                                            key={index}
                                            className="wall-reinforcement-icon"
                                            style={{
                                                left: `${wall.x}%`,  // Usar porcentagem para a posição horizontal
                                                top: `${wall.y}%`,   // Usar porcentagem para a posição vertical
                                                width: `${iconSize * 0.4}px`, // Largura proporcional
                                                height: `${iconSize * 0.12}px`, // Altura proporcional
                                                rotate: `${getRotation(wall.direction.toString())}`,
                                            }}
                                        >
                                            <FaRegArrowAltCircleUp/>
                                        </div>
                                    )
                                ))}
                                {selectedBombSite?.wallDestructions.map((wall, index) => (
                                    wall.floor === selectedLevel.floor && wall.type === WallDestructionType.Rotation && (
                                        <div
                                            key={index}
                                            className="wall-rotation-icon"
                                            style={{
                                                left: `${wall.x}%`,  // Usar porcentagem para a posição horizontal
                                                top: `${wall.y}%`,   // Usar porcentagem para a posição vertical
                                                width: `${iconSize * 0.4}px`, // Largura proporcional
                                                height: `${iconSize * 0.12}px`, // Altura proporcional
                                                rotate: `${getRotation(wall.direction.toString())}`,
                                            }}
                                        >
                                            <FaArrowsSpin/>
                                        </div>
                                    )
                                ))}
                                {selectedBombSite?.wallDestructions.map((wall, index) => (
                                    wall.floor === selectedLevel.floor && wall.type === WallDestructionType.HeadHeight && (
                                        <div
                                            key={index}
                                            className="wall-rotation-icon"
                                            style={{
                                                left: `${wall.x}%`,  // Usar porcentagem para a posição horizontal
                                                top: `${wall.y}%`,   // Usar porcentagem para a posição vertical
                                                width: `${iconSize * 0.4}px`, // Largura proporcional
                                                height: `${iconSize * 0.12}px`, // Altura proporcional
                                                rotate: `${getRotation(wall.direction.toString())}`,
                                            }}
                                        >
                                            <GiHeadshot />
                                        </div>
                                    )
                                ))}

                            </div>

                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MapViewer;
