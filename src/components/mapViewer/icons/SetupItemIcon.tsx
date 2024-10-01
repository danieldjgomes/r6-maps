import React from 'react';
import {SetupItemDetails, SetupItemType} from '../../models/SetupItemType';
import {WallDirection} from '../../models/WallDirection';
import {SetupItem} from "../../models/SetupItem";
import FootHeightIcon from "../../../assets/icons/foot.svg";
import HeadHeightIcon from "../../../assets/icons/head.svg";
import VaultIcon from "../../../assets/icons/vault.svg";
import RotationIcon from "../../../assets/icons/rotation.svg";
import RotationImage from "../../../assets/images/rotation_wall.png";
import FootImage from "../../../assets/images/prone_wall.jpeg";
import VaultImage from "../../../assets/images/vault_wall.jpeg";
import SightImage from "../../../assets/images/sight_wall.jpeg";
import Tooltip from "../Tooltip";

interface SetupIconProps {
    wall: SetupItem
    level: string;
    iconSize: number;
    onClick?: () => void
    isErasing?: boolean
}

const SetupItemIcon: React.FC<SetupIconProps> = ({wall, level, iconSize, onClick,isErasing = false }) => {
    if (wall.floor !== level) return null;
    // @ts-ignore
    const itemDetails = SetupItemDetails[wall.type];


    return (
        <div  onClick={onClick}  className={`${isErasing ? "icon-items-erasing" : "icon-items"}`}
             style={{
                 left: `${wall.x}%`,
                 top: `${wall.y}%`,
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
