import React, {useEffect, useRef, useState} from 'react';
import './MapViewer.css';
import TopController from '../TopController';
import {R6Map} from "../models/R6Map";
import {AllMaps} from "../models/AllMaps";
import {MapLevel} from "../models/MapLevel";
import {BombSite} from "../models/BombSite";
import {SetupItemMap} from "../models/SetupItemMap";
import {DefenseSetupItemType} from "../models/DefenseSetupItemType";
import {ApiService} from "./ApiService";
import {ZippingService} from "./ZippingService";
import MapIcons from "./MapIcons";

// Define an interface for interaction states
interface InteractionState {
    isPlacingItem: boolean;
    isErasing: boolean;
    mouseOverMap: boolean;
    dragging: boolean;
    itemPlacingType: DefenseSetupItemType | null;
}

const MapViewer: React.FC = () => {
    const allMaps: AllMaps = new AllMaps();

    // Combined interaction state
    const [interactionState, setInteractionState] = useState<InteractionState>({
        isPlacingItem: false,
        isErasing: false,
        mouseOverMap: false,
        dragging: false,
        itemPlacingType: null
    });

    const [selectedMap, setSelectedMap] = useState<R6Map>(allMaps.getAllMaps()[0]);
    const [selectedLevel, setSelectedLevel] = useState<MapLevel>(allMaps.getAllMaps()[0].levels[0]);
    const [selectedBombSite, setSelectedBombSite] = useState<BombSite>(allMaps.getAllMaps()[0].bombSites[0]);
    const [iconSize, setIconSize] = useState(30);
    const [containerWidth, setContainerWidth] = useState(85);
    const [setupItems, setSetupItems] = useState<SetupItemMap[]>([]);
    const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
    const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);
    const [dragOffset, setDragOffset] = useState<{ x: number, y: number }>({x: 0, y: 0});
    const [imagePosition, setImagePosition] = useState<{ x: number, y: number }>({x: 0, y: 80});
    const apiService = new ApiService();
    const zippingService = new ZippingService()
    const xAdjustment = -12;
    const yAdjustment = -15;

    const mapImageRef = useRef<HTMLImageElement>(null);
    const displayedMap = selectedMap?.getMapLevelByFloor(selectedLevel?.floor.valueOf() as string);


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


    const loadConfiguration = (data: string) => {
        try {

            const configuration = JSON.parse(zippingService.decompress(data));

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


    // Adjust interactionState handlers
    const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
        if (mapImageRef.current) {
            const rect = mapImageRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            setMousePosition({x, y});

            if (interactionState.dragging && dragStart) {
                const dx = event.clientX - dragStart.x;
                const dy = event.clientY - dragStart.y;
                setImagePosition({x: dragOffset.x + dx, y: dragOffset.y + dy});
            }
        }
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
        setInteractionState({...interactionState, dragging: true});
        setDragStart({x: event.clientX, y: event.clientY});
    };

    const handleMouseUp = () => {
        setInteractionState({...interactionState, dragging: false});
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
                // Cancel item placement and erasing
                if (interactionState.isPlacingItem) setInteractionState({...interactionState, itemPlacingType: null});
                setInteractionState({...interactionState, isPlacingItem: false});
            }
            if (interactionState.isErasing) {
                setInteractionState({...interactionState, isErasing: false});
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [interactionState]);

    // 2. **Improved Zoom Handling:**
    const handleMouseRoll = (event: React.WheelEvent<HTMLImageElement>) => {
        if (interactionState.mouseOverMap) {
            if (event.deltaY < 0) {
                setContainerWidth(Math.min(containerWidth + containerWidth / 10, 200))
            } else {
                setContainerWidth(Math.max(containerWidth - containerWidth / 10, 50))
            }
        }
    };

    const getMousePointer = () => {
        if (interactionState.mouseOverMap) {
            if (interactionState.isErasing || interactionState.isPlacingItem) {
                return 'crosshair';
            } else {
                return 'move';
            }
        }
        return 'none';
    };

    const handleMapClick = () => {
        if (interactionState.isPlacingItem && mapImageRef.current && mousePosition) {
            const rect = mapImageRef.current.getBoundingClientRect();
            const adjustedX = (mousePosition.x + xAdjustment) * 100 / rect.width;
            const adjustedY = (mousePosition.y + yAdjustment) * 100 / rect.height;
            const floor = selectedLevel.floor;

            if (interactionState.isPlacingItem !== null) {
                setSetupItems([...setupItems, new SetupItemMap(adjustedX, adjustedY, floor, interactionState.itemPlacingType)]);
            }

            setInteractionState({...interactionState, itemPlacingType: null, isPlacingItem: false});

        }
    };


    return (
        <div className="map-viewer-wrapper">
            <TopController
                onSelectMap={setSelectedMap}
                onSelectLevel={setSelectedLevel}
                onSelectBombSite={setSelectedBombSite}
                selectedLevel={selectedLevel}
                selectedMap={selectedMap}
                selectedBombSite={selectedBombSite}
                handleAddItemSetup={(item) => setInteractionState({
                    ...interactionState,
                    itemPlacingType: item,
                    isPlacingItem: true
                })}
                handleEraser={() => setInteractionState({...interactionState, isErasing: !interactionState.isErasing})}
                setupItems={setupItems}
            />

            <div className="map-viewer-container"
                 onMouseMove={handleMouseMove}
                 onMouseDown={handleMouseDown}
                 onMouseUp={handleMouseUp}
                 onMouseLeave={handleMouseUp}
                 onMouseOver={() => setInteractionState({...interactionState, mouseOverMap: true})}
                 onMouseOut={() => setInteractionState({...interactionState, mouseOverMap: false})}
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
                            <img style={{filter: interactionState.isErasing ? 'brightness(0.5)' : 'none'}}
                                 src={displayedMap.image}
                                 className="map-image"
                                 ref={mapImageRef}
                                 alt={`Map view of ${selectedMap.name} - ${selectedLevel.floor}`}
                                 onClick={handleMapClick}
                            />

                            <MapIcons bombSites={selectedMap.bombSites}
                                      setupItems={setupItems}
                                      iconSize={iconSize}
                                      isErasing={interactionState.isErasing}
                                      isPlacingItem={interactionState.isPlacingItem}
                                      selectedLevel={selectedLevel}
                                      setSetupItems={setSetupItems}
                                      setIsErasing={(value) => setInteractionState({
                                          ...interactionState,
                                          isErasing: value
                                      })}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MapViewer;