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
import SetupItemIcon from "./icons/SetupItemIcon";
import {SetupItem} from "../models/SetupItem";
import {SetupItemType} from "../models/SetupItemType";
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
    const [setupItems, setSetupItems] = useState<SetupItem[]>([]);
    const [isPlacingItem, setIsPlacingItem] = useState(false);
    const [itemPlacingType, setItemPlacingType] = useState<SetupItemType | null>();
    const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
    const [itemDirection, setItemDirection] = useState<WallDirection>(WallDirection.N);
    const [isErasing, setIsErasing] = useState(false);
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

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                // Cancelar adição de item e exclusão
                if (isPlacingItem)
                    setItemPlacingType(null)
                    setIsPlacingItem(false);
                }
                if (isErasing) {
                    setIsErasing(false);
                }
            }


        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPlacingItem, isErasing, setIsPlacingItem, setIsErasing]);


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

            if (itemPlacingType !== null) {
                setSetupItems([...setupItems, new SetupItem(adjustedX, adjustedY, floor, itemPlacingType)]);
            }

            setItemPlacingType(null);
            setIsPlacingItem(false);
        }
    };


    const handleAddItemSetup = (item: SetupItemType) => {
        setItemPlacingType(item)
        setIsPlacingItem(true);
    };

    const handleIconClick = (erasingWall: SetupItem) => {
        if (isErasing) {
            if (erasingWall instanceof SetupItem) {
                setSetupItems((prev) => prev.filter(wall => wall !== erasingWall));
            }

        }
    }
    const handleIconEraser = () => {
        setIsErasing(!isErasing)
    };


    const saveConfiguration = () => {
        const configuration = {
            map: selectedMap.name,
            level: selectedLevel.floor,
            bombSites: selectedMap.bombSites,
            setup: setupItems,
        };

        const json = JSON.stringify(configuration);
         const compressed = LZString.compressToEncodedURIComponent(json); // Compacta os dados
        console.log(compressed); // Aqui você pode salvar o código comprimido em um arquivo ou em localStorage
    };

    const loadConfiguration = (data: string) => {
        try {
            const decompressed = LZString.decompressFromEncodedURIComponent(data); // Descompacta os dados
            if (!decompressed) throw new Error("Decompression failed");

            const configuration = JSON.parse(decompressed);

            // Carregar o mapa com base na configuração
            const map = allMaps.getAllMaps().find(m => m.name === configuration.map);
            if (map) {
                // Atualizar o mapa e nível selecionados
                setSelectedMap(map);
                setSelectedLevel(map.getMapLevelByFloor(configuration.level));

                // Configurar bombSites (se necessário)
                const bombSites = configuration.bombSites.map((site: any) => ({
                    ...site,
                    bombs: site.bombs.map((bomb: any) => ({
                        ...bomb
                    })),
                    hatches: site.hatches.map((hatch: any) => new Hatch(hatch.x, hatch.y, hatch.floor)),
                    wallReinforcements: site.wallReinforcements.map((wr: any) =>
                        new WallReinforcement(wr.x, wr.y, wr.floor, wr.direction)),
                    wallDestructions: site.wallDestructions.map((wd: any) =>
                        new SetupItem(wd.x, wd.y, wd.floor, wd.type)),
                }));
                setSelectedBombSite(bombSites[0]);

                // Carregar os itens de configuração (setup)
                const setupItems = configuration.setup.map((setup: any) =>
                    new SetupItem(setup.x, setup.y, setup.floor, setup.type)
                );
                setSetupItems(setupItems);
            }
        } catch (error) {
            console.error("Failed to load configuration:", error);
            // Ignorar erros e não aplicar nenhuma alteração
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
                            <img style={{filter: isErasing ? 'brightness(0.5)' : 'none'}}
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
                                    <SetupItemIcon
                                        wall={new SetupItem(0, 0, selectedLevel.floor, itemPlacingType)}
                                        level={selectedLevel.floor}
                                        iconSize={iconSize}
                                    />
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

                                {setupItems.map((wall, index) => (
                                    <SetupItemIcon
                                        key={index}
                                        wall={wall}
                                        level={selectedLevel.floor}
                                        iconSize={iconSize}
                                        onClick={() => handleIconClick(wall)}
                                        isErasing={isErasing}

                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <ControlPanel
                containerWidth={containerWidth}
                setContainerWidth={setContainerWidth}
                handleAddItemSetup={handleAddItemSetup}
                saveConfiguration={saveConfiguration}
                loadConfiguration={loadConfiguration}
                handleEraser={handleIconEraser}
            />
        </div>
    );
};


export default MapViewer;
