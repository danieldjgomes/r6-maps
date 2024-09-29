import React from 'react';
import {FaArrowsSpin} from 'react-icons/fa6';
import {GiHeadshot} from 'react-icons/gi';
import {WallDestructionType} from '../../models/WallDestructionType';
import {WallDirection} from '../../models/WallDirection';
import {WallDestruction} from "../../models/WallDestruction";
import FootHeightIcon from "../../../assets/icons/foot.svg";
import HeadHeightIcon from "../../../assets/icons/head.svg";
import VaultIcon from "../../../assets/icons/vault.svg";
import RotationIcon from "../../../assets/icons/rotation.svg";

interface WallDestructionIconProps {
    wall: WallDestruction
    level: string;
    iconSize: number;
}

const WallDestructionIcon: React.FC<WallDestructionIconProps> = ({wall, level, iconSize}) => {
    if (wall.floor !== level) return null;

    const getRotation = (direction: WallDirection): string => {
        const rotations: Record<WallDirection, string> = {
            [WallDirection.N]: '0deg',
            [WallDirection.E]: '90deg',
            [WallDirection.S]: '180deg',
            [WallDirection.W]: '270deg'
        };

        return rotations[direction] || '0deg'; // Default to '0deg' if direction is invalid
    };


    return (
        <div
            style={{
                left: `${wall.x}%`,
                top: `${wall.y}%`,
                width: `${iconSize * 0.12}px`,
                height: `${iconSize * 0.4}px`,
                transform: `rotate(${getRotation(wall.direction)})`,
                position: 'absolute', // Ensure the icon is positioned correctly
                transformOrigin: 'center', // Ensure rotation is around the center
            }}
        >
            <div
                style={{
                    border: "0.2em solid rgba(69, 171, 243, 1)", // Whitish border
                    display: "inline-block", // Keeps the border wrapped around the image
                }}
            >
                {wall.type === WallDestructionType.FootHeight && (
                    <img
                        src={FootHeightIcon}
                        height={`${iconSize / 4}px`}
                        width={`${iconSize / 4}px`}
                        style={{
                            display: "block", // Removes any gaps caused by inline images
                        }}/>
                )}
                {wall.type === WallDestructionType.HeadHeight && (
                    <img
                        src={HeadHeightIcon}
                        height={`${iconSize / 4}px`}
                        width={`${iconSize / 4}px`}
                        style={{
                            display: "block", // Removes any gaps caused by inline images
                        }}/>
                )}
                {wall.type === WallDestructionType.Vault && (
                    <img
                        src={VaultIcon}
                        height={`${iconSize / 4}px`}
                        width={`${iconSize / 4}px`}
                        style={{
                            display: "block", // Removes any gaps caused by inline images
                        }}/>
                )}
                {wall.type === WallDestructionType.Rotation && (
                    <img
                        src={RotationIcon}
                        height={`${iconSize / 4}px`}
                        width={`${iconSize / 4}px`}
                        style={{
                            display: "block", // Removes any gaps caused by inline images
                        }}/>
                )}
            </div>

            {/*{wall.type === WallDestructionType.Rotation ? (*/}
            {/*    <FaArrowsSpin/>*/}

            {/*) : (*/}
            {/*    <GiHeadshot/>*/}
            {/*)}*/}
        </div>
    );
};

export default WallDestructionIcon;
