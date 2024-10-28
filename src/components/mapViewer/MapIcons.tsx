import React from 'react';
import BombIcon from './icons/BombIcon';
import SetupItemIcon from './icons/SetupItemIcon';
import {SetupItemMap} from '../models/SetupItemMap';
import {BombSite} from '../models/BombSite';
import {MapLevel} from '../models/MapLevel';
import {InteractionState} from "./InteractionState";

interface MapIconsProps {
    bombSites: BombSite[];
    setupItems: SetupItemMap[];
    iconSize: number;
    setSetupItems: (item: SetupItemMap[]) => void;
    setIsErasing: (isErasing: boolean) => void;
    selectedLevel: MapLevel;
    interactionState: InteractionState;
}

const MapIcons: React.FC<MapIconsProps> = ({
                                               bombSites,
                                               setupItems,
                                               iconSize,
                                               selectedLevel,
                                               setSetupItems,
                                               interactionState,
                                               setIsErasing
                                           }) => {
    const handleIconClick = (erasingWall: SetupItemMap) => {
        if (interactionState.isErasing) {
            setSetupItems(setupItems.filter(wall => wall !== erasingWall));
        }
        if (setupItems.length < 1) {
            setIsErasing(false)
        }
    };

    return (
        <div
            className="icon-container"
            style={{
                pointerEvents: interactionState.isPlacingItem ? 'none' : 'all'
            }}
        >
            {bombSites.map((bombsite) =>
                bombsite.bombs.map((bomb, index) => (
                    <BombIcon
                        key={`bomb-${index}`}  // Ensure unique key
                        index={index}
                        bomb={bomb}
                        iconSize={iconSize}
                        level={selectedLevel}
                    />
                ))
            )}
            {setupItems.map((item, index) => (
                <SetupItemIcon
                    key={`setupItem-${index}`}  // Ensure unique key
                    item={item}
                    iconSize={iconSize}
                    onClick={() => handleIconClick(item)}
                    isErasing={interactionState.isErasing}
                    level={selectedLevel.floor.valueOf()}
                />
            ))}

        </div>
    );
};

export default MapIcons;
