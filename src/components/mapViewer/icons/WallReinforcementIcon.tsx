import React from 'react';
import { FaRegArrowAltCircleUp } from 'react-icons/fa';
import { WallDirection } from '../../models/WallDirection';
import {WallReinforcement} from "../../models/WallReinforcement";
import ReinforcementIconSVG from '../../../assets/icons/reinforcement.svg'

interface WallReinforcementIconProps {
    wall: WallReinforcement
    level: string;
    iconSize: number;
}

const WallReinforcementIcon: React.FC<WallReinforcementIconProps> = ({ wall, level, iconSize }) => {
    if (wall.floor !== level) return null;

    const getRotation = (direction: WallDirection) => {
        switch (direction) {
            case WallDirection.N:
                return '0';
            case WallDirection.E:
                return '90deg';
            case WallDirection.W:
                return '-0.25turn';
            case WallDirection.S:
                return '3.142rad';
            default:
                return '0';
        }
    };

    return (
        <div
            className="wall-reinforcement-icon"
            style={{
                left: `${wall.x}%`,
                top: `${wall.y}%`,
                width: `${iconSize * 0.04}px`,
                height: `${iconSize * 0.04}px`,
                rotate: `${getRotation(wall.direction)}`,
            }}
        >
            <div
                className={"icon-items"}
            >
                <img
                    src={ReinforcementIconSVG}
                    height={`${iconSize / 4}px`}
                    width={`${iconSize / 4}px`}
                    style={{
                        display: "block", // Removes any gaps caused by inline images
                    }}
                />
            </div>
        </div>
    );

};

export default WallReinforcementIcon;
