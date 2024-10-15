import React from 'react';
import BombIcon from './icons/BombIcon';
import SetupItemIcon from './icons/SetupItemIcon';
import {SetupItem} from '../models/SetupItem';
import {BombSite} from '../models/BombSite';
import {MapLevel} from '../models/MapLevel';

interface MapIconsProps {
    bombSites: BombSite[];
    setupItems: SetupItem[];
    iconSize: number;
    isPlacingItem: boolean;
    setSetupItems: (item: SetupItem[]) => void;
    isErasing: boolean;
    setIsErasing: (isErasing: boolean) => void;
    selectedLevel: MapLevel;
}

const MapIcons: React.FC<MapIconsProps> = ({
                                               bombSites,
                                               setupItems,
                                               iconSize,
                                               isErasing,
                                               selectedLevel,
                                               isPlacingItem,
                                               setSetupItems,
                                               setIsErasing
                                           }) => {
    const handleIconClick = (erasingWall: SetupItem) => {
        if (isErasing) {
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
                pointerEvents: isPlacingItem ? 'none' : 'all'
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
                    wall={item}
                    iconSize={iconSize}
                    onClick={() => handleIconClick(item)}
                    isErasing={isErasing}
                    level={selectedLevel.floor.valueOf()}
                />
            ))}
        </div>
    );
};

export default MapIcons;
