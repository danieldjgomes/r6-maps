import React from 'react';
import {SetupItemDetails, DefenseSetupItemType, SetupItemManager} from '../../models/DefenseSetupItemType';
import {SetupItemMap} from "../../models/SetupItemMap";

import Tooltip from "../Tooltip";

interface SetupIconProps {
    item: SetupItemMap
    level: string;
    iconSize: number;
    onClick?: () => void
    isErasing?: boolean
}

const SetupItemIcon: React.FC<SetupIconProps> = ({item, level, iconSize, onClick,isErasing = false }) => {
    if (item.floor !== level) return null;

    // @ts-ignore
    const itemDetails = SetupItemManager.getSetupItemByName(item.type)



    return (
        <div  onClick={onClick}  className={`${isErasing ? "icon-items-erasing" : "icon-items"}`}
             style={{
                 left: `${item.x}%`,
                 top: `${item.y}%`,
                 position: 'absolute', // Ensure the icon is positioned correctly
                 transformOrigin: 'center', // Ensure rotation is around the center
             }}>

            <Tooltip
                imageSrc={itemDetails.sourceImage}
                title={itemDetails.title}
                description={itemDetails.description}
            >
                <img
                    src={itemDetails.sourceIcon} // Dynamically load the correct icon
                    height={`${iconSize / itemDetails.size.height}px`}
                    width={`${iconSize / itemDetails.size.width}px`}
                    style={{
                        display: "block", // Removes any gaps caused by inline images
                    }}
                />
            </Tooltip>

        </div>
    );
};

export default SetupItemIcon;
