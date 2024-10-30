import React, {useEffect, useRef, useState} from 'react';
import './MapViewer.css';
import HeaderControlPanel from '../ControlPanel/HeaderControlPanel';
import {R6Map} from "../models/R6Map";
import {AllMaps} from "../models/AllMaps";
import {MapLevel} from "../models/MapLevel";
import {BombSite} from "../models/BombSite";
import {SetupItem} from "../models/SetupItemMap";
import {ApiService} from "./ApiService";
import {ZippingService} from "./ZippingService";
import MapIcons from "./MapIcons";
import {useInteraction} from "../State/InteractionContext";

const MapViewer: React.FC = () => {
    const allMaps: AllMaps = new AllMaps();

    const { interactionState, setInteractionState } = useInteraction();

    const [activeMap, setActiveMap] = useState<R6Map>(allMaps.getAllMaps()[0]);
    const [activeLevel, setActiveLevel] = useState<MapLevel>(allMaps.getAllMaps()[0].levels[0]);
    const [activeBombSite, setActiveBombSite] = useState<BombSite>(allMaps.getAllMaps()[0].bombSites[0]);
    const [iconSize, setIconSize] = useState(30);
    const [containerWidth, setContainerWidth] = useState(85);
    const [setupItems, setSetupItems] = useState<SetupItem[]>([]);
    const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
    const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);
    const [imageDragOffset, setImageDragOffset] = useState<{ x: number, y: number }>({x: 0, y: 0});
    const [imagePosition, setImagePosition] = useState<{ x: number, y: number }>({x: 0, y: 80});
    const apiService = new ApiService();
    const zippingService = new ZippingService()
    const xAdjustment = -12;
    const yAdjustment = -15;

    const mapImageRef = useRef<HTMLImageElement>(null);
    const displayedMap = activeMap?.getMapLevelByFloor(activeLevel?.floor.valueOf() as string);


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

            const map = allMaps.getAllMaps().find(m => m.name === configuration.map);
            if (map) {
                setActiveMap(map);
                setActiveLevel(map.levels[0]);

                const bombSites = configuration.bombSites.map((site: any) => ({
                    ...site,
                    bombs: site.bombs.map((bomb: any) => ({
                        ...bomb,
                        x: parseFloat(bomb.x.toFixed(3)), // Garantir precisão de 3 casas decimais
                        y: parseFloat(bomb.y.toFixed(3)),
                    })),
                }));
                setActiveBombSite(bombSites[0]);


                const setupItems = configuration.setup.map((setup: any) =>
                    new SetupItem(parseFloat(setup.x.toFixed(3)), parseFloat(setup.y.toFixed(3)), setup.floor, setup.type)
                );
                setSetupItems(setupItems);
            }
        } catch (error) {
            console.error("Failed to load configuration:", error);
        }
    };


    const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
        if (mapImageRef.current) {
            const rect = mapImageRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            setMousePosition({x, y});

            if (interactionState.dragging && dragStart && interactionState.itemPlacingType == '' && !interactionState.isErasing) {
                const dx = event.clientX - dragStart.x;
                const dy = event.clientY - dragStart.y;
                setImagePosition({x: imageDragOffset .x + dx, y: imageDragOffset .y + dy});
            }
        }
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
        setInteractionState({...interactionState, dragging: true});
        setDragStart({x: event.clientX, y: event.clientY});
    };

    const handleMouseUp = () => {
        setInteractionState({...interactionState, dragging: false});
        setImageDragOffset (imagePosition);
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
                if (interactionState.itemPlacingType != '') {
                    setInteractionState({...interactionState, itemPlacingType: ''});
                }
            if (interactionState.isErasing) {
                setInteractionState({...interactionState, isErasing: false});
            }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [interactionState]);

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
            if (interactionState.isErasing || interactionState.itemPlacingType != '') {
                return 'crosshair';
            } else {
                return 'move';
            }
        }
        return 'none';
    };

    const handleMapClick = () => {
        if (interactionState.itemPlacingType != '' && mapImageRef.current && mousePosition && !interactionState.isErasing) {
            const rect = mapImageRef.current.getBoundingClientRect();
            const adjustedX = (mousePosition.x + xAdjustment) * 100 / rect.width;
            const adjustedY = (mousePosition.y + yAdjustment) * 100 / rect.height;
            const floor = activeLevel.floor;

            if (interactionState.itemPlacingType != '') {
                setSetupItems([...setupItems, new SetupItem(adjustedX, adjustedY, floor, interactionState.itemPlacingType)]);
            }

            setInteractionState({...interactionState, itemPlacingType: ''});
        }
    };


    return (
        <div className="map-viewer-wrapper">
            <HeaderControlPanel
                onSelectMap={setActiveMap}
                onSelectLevel={setActiveLevel}
                onSelectBombSite={setActiveBombSite}
                selectedLevel={activeLevel}
                selectedMap={activeMap}
                selectedBombSite={activeBombSite}
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
                                 alt={`Map view of ${activeMap.name} - ${activeLevel.floor}`}
                                 onClick={handleMapClick}
                            />

                            <MapIcons bombSites={activeMap.bombSites}
                                      setupItems={setupItems}
                                      iconSize={iconSize}
                                      selectedLevel={activeLevel}
                                      setSetupItems={setSetupItems}
                                      activeBombSite={activeBombSite}
                                      setIsErasing={(value) => setInteractionState({
                                          ...interactionState,
                                          itemPlacingType: '',
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