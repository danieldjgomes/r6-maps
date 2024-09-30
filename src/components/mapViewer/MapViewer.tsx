import React, {useEffect, useRef, useState} from 'react';
import './MapViewer.css';
import MapSelector from '../MapSelector';
import {R6Map} from "../models/R6Map";
import {AllMaps} from "../models/AllMaps";
import {MapLevel} from "../models/MapLevel";
import {BombSite} from "../models/BombSite";
import {WallDirection} from "../models/WallDirection";
import BombIcon from "./icons/BombIcon";
import HatchIcon from "./icons/HatchIcon";
import WallReinforcementIcon from "./icons/WallReinforcementIcon";
import WallDestructionIcon from "./icons/WallDestructionIcon";
import {WallDestruction} from "../models/WallDestruction";
import {WallDestructionType} from "../models/WallDestructionType";
import ControlPanel from '../../components/ControlPanel';
import {WallReinforcement} from "../models/WallReinforcement";
import {Hatch} from "../models/Hatch"
import LZString from 'lz-string';


const MapViewer: React.FC = () => {
    const allMaps: AllMaps = new AllMaps();
    const [selectedMap, setSelectedMap] = useState<R6Map>(allMaps.getAllMaps()[0]);
    const [selectedLevel, setSelectedLevel] = useState<MapLevel>(allMaps.getAllMaps()[0].levels[0]);
    const [selectedBombSite, setSelectedBombSite] = useState<BombSite>(allMaps.getAllMaps()[0].bombSites[0]);
    const [iconSize, setIconSize] = useState(30);
    const [containerWidth, setContainerWidth] = useState(85);
    const [dynamicWallDestructions, setDynamicWallDestructions] = useState<WallDestruction[]>([]);
    const [dynamicWallReinforcement, setDynamicWallReinforcement] = useState<WallReinforcement[]>([]);
    const [dynamicHatch, setDynamicHatch] = useState<Hatch[]>([]);
    const [isPlacingItem, setIsPlacingItem] = useState(false);
    const [itemPlacingType, setItemPlacingType] = useState<string>('');
    const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
    const [itemDirection, setItemDirection] = useState<WallDirection>(WallDirection.N);
    const xAdjustment = -5;
    const yAdjustment = -15;

    const mapImageRef = useRef<HTMLImageElement>(null);
    const iconContainerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
        if (mapImageRef.current) {
            const rect = mapImageRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            setMousePosition({x, y});
        }
    };

    const handleMouseRoll = (event: React.WheelEvent<HTMLImageElement>) => {
        if (isPlacingItem) {
            if (event.deltaY < 0) {
                setItemDirection(WallDirection.getNext(itemDirection));
            } else {
                setItemDirection(WallDirection.getPrevious(itemDirection));
            }
        }
    };

    const handleMapClick = (event: React.MouseEvent<HTMLImageElement>) => {
        if (isPlacingItem && mapImageRef.current && mousePosition) {
            const rect = mapImageRef.current.getBoundingClientRect();
            const x = (event.clientX - rect.left) * 100 / (mapImageRef.current.width || 1);
            const y = (event.clientY - rect.top) * 100 / (mapImageRef.current.height || 1);
            const adjustedX = (mousePosition.x + xAdjustment) * 100 / rect.width;
            const adjustedY = (mousePosition.y + yAdjustment) * 100 / rect.height;
            const floor = selectedLevel.floor;

            const destructionTypes: Record<string, WallDestructionType> = {
                head: WallDestructionType.HeadHeight,
                rotation: WallDestructionType.Rotation,
                foot: WallDestructionType.FootHeight,
                vault: WallDestructionType.Vault
            };

            if (itemPlacingType in destructionTypes) {
                setDynamicWallDestructions([...dynamicWallDestructions, new WallDestruction(adjustedX, adjustedY, floor, itemDirection, destructionTypes[itemPlacingType])]);
            }

            if (itemPlacingType === 'reinforcement') {
                setDynamicWallReinforcement([...dynamicWallReinforcement, new WallReinforcement(adjustedX, adjustedY, floor, itemDirection)]);
            }

            if (itemPlacingType === 'hatch') {
                setDynamicHatch([...dynamicHatch, new Hatch(adjustedX, adjustedY, floor)]);
            }

            setItemPlacingType('');
            setIsPlacingItem(false);
        }
    };


    const handleAddFootHeightWallDestruction = () => {
        setItemPlacingType('foot')
        setIsPlacingItem(true);
    }
    const handleAddWallRotation = () => {
        setItemPlacingType('rotation')
        setIsPlacingItem(true);
    };
    const handleAddWallHeadHeight = () => {
        setItemPlacingType('head')
        setIsPlacingItem(true);
    };
    const handleAddWallVault = () => {
        setItemPlacingType('vault')
        setIsPlacingItem(true);
    };
    const handleAddWallReinforcement = () => {
        setItemPlacingType('reinforcement')
        setIsPlacingItem(true);
    };
    const handleAddHatchReinforcement = () => {
        setItemPlacingType('hatch')
        setIsPlacingItem(true);
    };

    const saveConfiguration = () => {
        const configuration = {
            map: selectedMap.name,
            level: selectedLevel.floor,
            bombSites: selectedMap.bombSites,
            wallDestructions: dynamicWallDestructions,
            wallReinforcements: dynamicWallReinforcement,
            hatches: dynamicHatch,
        };

        const json = JSON.stringify(configuration);
        const compressed = LZString.compressToEncodedURIComponent(json); // Compacta os dados
        console.log(compressed); // Aqui você pode salvar o código comprimido em um arquivo ou em localStorage
    };


    const loadConfiguration = (data: string) => {
        const decompressed = LZString.decompressFromEncodedURIComponent(data); // Descompacta os dados
        const configuration = JSON.parse(decompressed);

        // Atualizar o estado com a configuração carregada
        const map = allMaps.getAllMaps().find(m => m.name === configuration.map);
        if (map) {
            setSelectedMap(map);
            setSelectedLevel(map.getMapLevelByFloor(configuration.level));
            setSelectedBombSite(map.bombSites[0]);

            const wallDestructions = configuration.wallDestructions.map((wd: any) =>
                new WallDestruction(wd.x, wd.y, wd.floor, wd.direction, wd.type)
            );
            setDynamicWallDestructions(wallDestructions);

            const wallReinforcements = configuration.wallReinforcements.map((wr: any) =>
                new WallReinforcement(wr.x, wr.y, wr.floor, wr.direction)
            );
            setDynamicWallReinforcement(wallReinforcements);

            const hatches = configuration.hatches.map((h: any) =>
                new Hatch(h.x, h.y, h.floor)
            );
            setDynamicHatch(hatches);
        }
    };


    useEffect(() => {
        const loadFromUrl = () => {
            const urlPath = window.location.pathname.split('/');
            const configData = urlPath[urlPath.length - 1]; // Pega a última parte da URL
            if (configData) {
                loadConfiguration(configData); // Carrega a configuração se houver dados
            }
        };

        loadFromUrl(); // Chama a função para carregar a configuração da URL ao montar o componente
    }, []); // A lista de dependências está vazia, portanto, essa execução só ocorrerá uma vez



    useEffect(() => {
        const updateIconSize = () => {
            if (mapImageRef.current) {
                const imageWidth = mapImageRef.current.offsetWidth;
                const newSize = Math.max(imageWidth * 0.05, 20);
                setIconSize(newSize);
            }
        };

        window.addEventListener('resize', updateIconSize);
        updateIconSize();

        return () => {
            window.removeEventListener('resize', updateIconSize);
        };
    }, [containerWidth]);

    const displayedMap = selectedMap?.getMapLevelByFloor(selectedLevel?.floor.valueOf() as string);

    return (
        <div className="map-viewer-wrapper">
            <div className="map-viewer-container" style={{width: `${containerWidth}%`}}>
                <MapSelector
                    onSelectMap={setSelectedMap}
                    onSelectLevel={setSelectedLevel}
                    onSelectBombSite={setSelectedBombSite}
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
                                ref={mapImageRef}
                                alt={`Map view of ${selectedMap.name} - ${selectedLevel.floor}`}
                                onMouseMove={handleMouseMove}
                                onClick={handleMapClick}
                                //onWheel={handleMouseRoll}
                            />
                            {isPlacingItem && mousePosition && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: `${mousePosition.y + yAdjustment}px`,
                                        left: `${mousePosition.x + xAdjustment}px`,
                                        transform: 'translate(-50%, -50%)',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    {itemPlacingType === 'head' && (
                                        <WallDestructionIcon
                                            wall={new WallDestruction(0, 0, selectedLevel.floor, itemDirection, WallDestructionType.HeadHeight)}
                                            level={selectedLevel.floor}
                                            iconSize={iconSize}
                                        />
                                    )}
                                    {itemPlacingType === 'foot' && (
                                        <WallDestructionIcon
                                            wall={new WallDestruction(0, 0, selectedLevel.floor, itemDirection, WallDestructionType.FootHeight)}
                                            level={selectedLevel.floor}
                                            iconSize={iconSize}
                                        />
                                    )}
                                    {itemPlacingType === 'rotation' && (
                                        <WallDestructionIcon
                                            wall={new WallDestruction(0, 0, selectedLevel.floor, itemDirection, WallDestructionType.Rotation)}
                                            level={selectedLevel.floor}
                                            iconSize={iconSize}
                                        />
                                    )}
                                    {itemPlacingType === 'vault' && (
                                        <WallDestructionIcon
                                            wall={new WallDestruction(0, 0, selectedLevel.floor, itemDirection, WallDestructionType.Vault)}
                                            level={selectedLevel.floor}
                                            iconSize={iconSize}
                                        />
                                    )}
                                    {itemPlacingType === 'reinforcement' && (

                                        <WallReinforcementIcon
                                            wall={new WallReinforcement(0, 0, selectedLevel.floor, itemDirection)}
                                            level={selectedLevel.floor}
                                            iconSize={iconSize}
                                        />
                                    )}

                                    {itemPlacingType === 'hatch' && (
                                        <HatchIcon
                                            hatch={new Hatch(0, 0, selectedLevel.floor)}
                                            level={selectedLevel.floor}
                                            iconSize={iconSize}
                                        />
                                    )}
                                </div>
                            )}

                            <div className="icon-container"
                                style={{
                                    pointerEvents: isPlacingItem ? "none" : "all",
                                }} ref={iconContainerRef}>
                                {selectedBombSite?.bombs.map((bomb, index) => (
                                    <BombIcon
                                        key={index}
                                        bomb={bomb}
                                        index={index}
                                        level={selectedLevel.floor}
                                        iconSize={iconSize}
                                    />
                                ))}

                                {dynamicHatch?.map((hatch, index) => (
                                    <HatchIcon
                                        key={index}
                                        hatch={hatch}
                                        level={selectedLevel.floor}
                                        iconSize={iconSize}
                                    />
                                ))}


                                {dynamicWallDestructions.map((wall, index) => (
                                    <WallDestructionIcon
                                        key={index}
                                        wall={wall}
                                        level={selectedLevel.floor}
                                        iconSize={iconSize}
                                    />
                                ))}
                                {dynamicWallReinforcement.map((wall, index) => (
                                    <>
                                        <WallReinforcementIcon
                                            key={index}
                                            wall={wall}
                                            level={selectedLevel.floor}
                                            iconSize={iconSize}
                                        />
                                    </>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <ControlPanel
                containerWidth={containerWidth}
                setContainerWidth={setContainerWidth}
                handleAddWallDestruction={handleAddFootHeightWallDestruction}
                handleAddWallRotation={handleAddWallRotation}
                handleAddWallHeadHeight={handleAddWallHeadHeight}
                handleAddWallFootHeight={handleAddFootHeightWallDestruction}
                handleAddWallVault={handleAddWallVault}
                handleAddWallReinforcement={handleAddWallReinforcement}
                handleAddHatchReinforcement={handleAddHatchReinforcement}
                saveConfiguration={saveConfiguration}
                loadConfiguration={loadConfiguration}
            />
        </div>
    );
};

export default MapViewer;
