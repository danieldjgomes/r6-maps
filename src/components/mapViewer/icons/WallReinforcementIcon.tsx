import React from 'react';
import { WallDirection } from '../../models/WallDirection';
import {WallReinforcement} from "../../models/WallReinforcement";
import ReinforcementIconSVG from '../../../assets/icons/reinforcement.svg'
import ReinforcementImage from '../../../assets/images/reinforcement_wall.jpeg'
import Tooltip from "../Tooltip";

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
            <div className={"icon-items"}
                 style={{
                     left: `${wall.x}%`,
                     top: `${wall.y}%`,
                     position: 'absolute', // Ensure the icon is positioned correctly
                     transformOrigin: 'center', // Ensure rotation is around the center
                 }}>
                <Tooltip iconSrc={ReinforcementImage} title={"Parede reforcada"} description={"São paredes que foram fortalecidas com materiais especiais para resistir a explosões e tiros, dificultando a destruição por parte dos atacantes e proporcionando uma defesa mais sólida para os defensores."}>
                <img
                    src={ReinforcementIconSVG}
                    height={`${iconSize / 2.7}px`}
                    width={`${iconSize / 2.7}px`}
                    style={{
                        display: "block", // Removes any gaps caused by inline images
                    }}
                />
                </Tooltip>

            </div>
    );

};

export default WallReinforcementIcon;
