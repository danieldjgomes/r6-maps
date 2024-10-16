import React, {useEffect, useRef, useState} from 'react';
import './MapViewer.css';
import TopController from '../TopController';
import {R6Map} from "../models/R6Map";
import {AllMaps} from "../models/AllMaps";
import {MapLevel} from "../models/MapLevel";
import {BombSite} from "../models/BombSite";
import SetupItemIcon from "./icons/SetupItemIcon";
import {SetupItemMap} from "../models/SetupItemMap";
import {DefenseSetupItemType} from "../models/DefenseSetupItemType";
import ControlPanel from './controlPanel/ControlPanel';
import ShareWizard from "./ShareWizard/ShareWizard";
import {ApiService} from "./ApiService";
import {ZippingService} from "./ZippingService";
import MapIcons from "./MapIcons";


const MapViewer: React.FC = () => {
    const allMaps: AllMaps = new AllMaps();
    const [selectedMap, setSelectedMap] = useState<R6Map>(allMaps.getAllMaps()[0]);
    const [selectedLevel, setSelectedLevel] = useState<MapLevel>(allMaps.getAllMaps()[0].levels[0]);
    const [selectedBombSite, setSelectedBombSite] = useState<BombSite>(allMaps.getAllMaps()[0].bombSites[0]);
    const [iconSize, setIconSize] = useState(30);
    const [containerWidth, setContainerWidth] = useState(85);
    const [setupItems, setSetupItems] = useState<SetupItemMap[]>([]);
    const [isPlacingItem, setIsPlacingItem] = useState(false);
    const [itemPlacingType, setItemPlacingType] = useState<DefenseSetupItemType | null>();
    const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
    const [isErasing, setIsErasing] = useState(false);
    const [mouseOverMap, setMouseOverMap] = useState(false);
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const [configurationCode, setConfigurationCode] = useState('');
    const xAdjustment = -12;
    const yAdjustment = -15;
    const apiService = new ApiService();
    const zippingSevice = new ZippingService()


    const [dragging, setDragging] = useState(false);
    const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);
    const [dragOffset, setDragOffset] = useState<{ x: number, y: number }>({x: 0, y: 0});
    const [imagePosition, setImagePosition] = useState<{ x: number, y: number }>({x: 0, y: 80});


    const mapImageRef = useRef<HTMLImageElement>(null);

    const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
        if (mapImageRef.current) {
            const rect = mapImageRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            setMousePosition({x, y});

            if (dragging && dragStart) {
                const dx = event.clientX - dragStart.x;
                const dy = event.clientY - dragStart.y;
                setImagePosition({x: dragOffset.x + dx, y: dragOffset.y + dy});
            }
            console.log(`x: ${x} y: ${y}`)
        }
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
        console.log("clicked, status: " + dragging)
        setDragging(true);
        setDragStart({x: event.clientX, y: event.clientY});
    };

    const handleMouseUp = () => {
        setDragging(false);
        setDragOffset(imagePosition);
        setDragStart(null);
    };

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
            window.removeEventListener('resize', updateIconSize);
        };
    }, [containerWidth]);

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
        if (mouseOverMap) {
            if (event.deltaY < 0) {
                setContainerWidth(Math.min(containerWidth + containerWidth / 10, 200))
            } else {
                setContainerWidth(Math.max(containerWidth - containerWidth / 10, 50))
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
                setSetupItems([...setupItems, new SetupItemMap(adjustedX, adjustedY, floor, itemPlacingType)]);
            }

            setItemPlacingType(null);
            setIsPlacingItem(false);
        }
    };

    const handleAddItemSetup = (item: DefenseSetupItemType) => {
        setItemPlacingType(item)
        setIsPlacingItem(true);
    };

    const handleIconEraser = () => {
        setIsErasing(!isErasing)
    };


    const handleShareClick = () => {
        if (setupItems.length == 0) {
            setConfigurationCode(`${window.location.origin}`);
            setIsWizardOpen(true);
            return;
        }
        const compressed = zippingSevice.compress(selectedMap, setupItems)
        buildConfigurationCode(compressed).then(() => setIsWizardOpen(true))
    };

    async function buildConfigurationCode(compressed: string) {
        apiService.saveSetupByCompressedData(compressed)
            .then((id) => {
                setConfigurationCode(`${window.location.origin}/${id}`);
            })
    }


    const loadConfiguration = (data: string) => {
        try {

            const configuration = JSON.parse(zippingSevice.decompress(data));

            // Carregar o mapa com base na configuração
            const map = allMaps.getAllMaps().find(m => m.name === configuration.map);
            if (map) {
                // Atualizar o mapa e nível selecionados
                setSelectedMap(map);
                setSelectedLevel(map.levels[0]);

                const bombSites = configuration.bombSites.map((site: any) => ({
                    ...site,
                    bombs: site.bombs.map((bomb: any) => ({
                        ...bomb,
                        x: parseFloat(bomb.x.toFixed(3)), // Garantir precisão de 3 casas decimais
                        y: parseFloat(bomb.y.toFixed(3)),
                    })),
                }));
                setSelectedBombSite(bombSites[0]);


                // Carregar os itens de configuração (setup)
                const setupItems = configuration.setup.map((setup: any) =>
                    new SetupItemMap(parseFloat(setup.x.toFixed(3)), parseFloat(setup.y.toFixed(3)), setup.floor, setup.type)
                );
                setSetupItems(setupItems);
            }
        } catch (error) {
            console.error("Failed to load configuration:", error);
            // Ignorar erros e não aplicar nenhuma alteração
        }
    };

    const getMousePointer = () => {
        if(mouseOverMap){
            if(isErasing || isPlacingItem){
                return "crosshair"
            }
            else{
                return "move"
            }
        }
        return "none";
    }


    useEffect(() => {
        const loadFromUrl = () => {
            const urlPath = window.location.pathname.split('/');
            const setupId = urlPath[urlPath.length - 1]; //
            if (setupId) {
                apiService.getSetupDataById(setupId)
                    .then((response: string) => {
                        loadConfiguration(response)
                    })
            }
        };
        loadFromUrl();
    }, []);


    const displayedMap = selectedMap?.getMapLevelByFloor(selectedLevel?.floor.valueOf() as string);

    return (
        <div className="map-viewer-wrapper">
            <TopController
                onSelectMap={setSelectedMap}
                onSelectLevel={setSelectedLevel}
                onSelectBombSite={setSelectedBombSite}
                selectedLevel={selectedLevel}
                selectedMap={selectedMap}
                selectedBombSite={selectedBombSite}
                shareConfiguration={handleShareClick}
                handleAddItemSetup={handleAddItemSetup}
                handleEraser={handleIconEraser}
            />
            <div className="map-viewer-container"
                 onMouseMove={handleMouseMove}
                 onMouseDown={handleMouseDown}
                 onMouseUp={handleMouseUp}
                 onMouseLeave={handleMouseUp}
                 onMouseOver={() => setMouseOverMap(true)}
                 onMouseOut={() => setMouseOverMap(false)}
                 onWheel={handleMouseRoll}
                 style={{
                     width: `${containerWidth}%`,
                     transform: `matrix(${containerWidth / 100}, 0, 0, ${containerWidth / 100},  ${imagePosition.x}, ${imagePosition.y})`,
                     transformOrigin: 'center',
                     cursor: getMousePointer(),
                 }}>


                <div className="map-container">
                    {displayedMap && (
                        <>
                            {/*<MapInteraction src={displayedMap.image} onMapClick={handleMapClick} containerWidth={containerWidth} setContainerWidth={setContainerWidth} />*/}

                            <img style={{filter: isErasing ? 'brightness(0.5)' : 'none'}}
                                 src={displayedMap.image}
                                 className="map-image"
                                 ref={mapImageRef}
                                 alt={`Map view of ${selectedMap.name} - ${selectedLevel.floor}`}
                                 onClick={handleMapClick}
                            />

                            <MapIcons bombSites={selectedMap.bombSites} setupItems={setupItems} iconSize={iconSize}
                                      isErasing={isErasing} isPlacingItem={isPlacingItem} selectedLevel={selectedLevel}
                                      setSetupItems={setSetupItems} setIsErasing={setIsErasing}/>
                        </>
                    )}
                </div>
            </div>

            {/*<ControlPanel handleAddItemSetup={handleAddItemSetup} handleEraser={handleIconEraser}/>*/}
            <ShareWizard isWizardOpen={isWizardOpen} configurationCode={configurationCode} closeWizard={() => setIsWizardOpen(false)}/>
        </div>
    );
};


export default MapViewer;
