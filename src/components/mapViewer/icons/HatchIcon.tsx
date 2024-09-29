import React from 'react';
import {Hatch} from "../../models/Hatch";
import HatchIconSVG from "../../../assets/icons/hatch.svg";

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
                    border: "0.2em solid rgba(69, 171, 243, 1)", // Whitish border
                    display: "inline-block", // Keeps the border wrapped around the image
                }}
            >
                <img
                    src={HatchIconSVG}
                    height={`${iconSize / 2}px`}
                    width={`${iconSize / 2}px`}
                    style={{
                        display: "block", // Removes any gaps caused by inline images
                    }}
                />
            </div>
        </div>
    );
};

export default HatchIcon;
