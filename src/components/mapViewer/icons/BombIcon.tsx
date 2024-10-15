import React from 'react';
import { BombSite } from '../../models/BombSite';
import {Bomb} from "../../Bomb";
import {MapLevel} from "../../models/MapLevel";

interface BombIconProps {
    bomb: Bomb;
    index: number;
    level: MapLevel;
    iconSize: number;
}

const BombIcon: React.FC<BombIconProps> = ({ bomb, index, level, iconSize }) => {
    if (bomb.floor.valueOf() !== level.floor.valueOf()) return null;

    return (
        <div
            className="bomb-icon"
            style={{
                left: `${bomb.x}%`,
                top: `${bomb.y}%`,
                width: `${iconSize * 0.5}px`,
                height: `${iconSize * 0.5}px`,
            }}
        >
            {String.fromCharCode(65 + index)} {/* Exibe A, B, etc. */}
        </div>
    );
};

export default BombIcon;
