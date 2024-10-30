import React from 'react';
import BombIcon from './icons/BombIcon';
import SetupItemIcon from './icons/SetupItemIcon';
import {SetupItem} from '../models/SetupItemMap';
import {BombSite} from '../models/BombSite';
import {MapLevel} from '../models/MapLevel';
import {useInteraction} from "../../stateControl/InteractionContext";

interface MapIconsProps {
    bombSites: BombSite[];
    setupItems: SetupItem[];
    iconSize: number;
    setSetupItems: (item: SetupItem[]) => void;
    setIsErasing: (isErasing: boolean) => void;
    selectedLevel: MapLevel;
    activeBombSite: BombSite;
}

const MapIcons: React.FC<MapIconsProps> = ({

                                               setupItems,
                                               iconSize,
                                               selectedLevel,
                                               setSetupItems,
                                               activeBombSite
                                           }) => {
    const { interactionState, setInteractionState } = useInteraction();


    const handleIconClick = (erasingWall: SetupItem) => {
        if (interactionState.isErasing) {
            setSetupItems(setupItems.filter(wall => wall !== erasingWall));
            if (setupItems.length <= 1){
                setInteractionState({...interactionState, isErasing: false})
            }
        }
    };

    return (
        <div
            className="icon-container"
            style={{
                pointerEvents: interactionState.itemPlacingType != '' ? 'none' : 'all'
            }}
        >
            {activeBombSite.bombs.map((bomb, index) => (
                <BombIcon
                    key={`bomb-${index}`}
                    index={index}
                    bomb={bomb}
                    iconSize={iconSize}
                    level={selectedLevel}
                />
            ))}

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
