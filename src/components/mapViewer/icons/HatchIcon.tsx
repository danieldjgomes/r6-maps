import React from 'react';
import {Hatch} from "../../models/Hatch";
import HatchIconSVG from "../../../assets/icons/hatch.svg";
import HatchImage from "../../../assets/images/reinforcement_hatch.jpeg";
import Tooltip from "../Tooltip";

interface HatchIconProps {
    hatch: Hatch;
    level: string;
    iconSize: number;
}

const HatchIcon: React.FC<HatchIconProps> = ({ hatch, level, iconSize }) => {
    if (hatch.floor !== level) return null;

    return (
        <div
            className="hatch-icon"
            style={{
                left: `${hatch.x}%`,
                top: `${hatch.y}%`,
                width: `${iconSize * 0.7}px`,
                height: `${iconSize * 0.7}px`,
            }}
        >
            <div
                style={{
                    border: "0.1em solid rgba(69, 171, 243, 1)", // Whitish border
                    display: "inline-block", // Keeps the border wrapped around the image
                }}>
                <Tooltip iconSrc={HatchImage} title={"Alcapao reforcado"}
                         description={"São aberturas no teto que foi fortalecida para resistir a explosões, dificultando a destruição por parte dos atacantes e permitindo que os defensores tenham uma posição estratégica superior."}>
                <img
                    src={HatchIconSVG}
                    height={`${iconSize / 2}px`}
                    width={`${iconSize / 2}px`}
                    style={{
                        display: "block", // Removes any gaps caused by inline images
                    }}

                />
                </Tooltip>
            </div>
        </div>
    );
};

export default HatchIcon;
