import React from 'react';
import {WallDestructionType} from '../../models/WallDestructionType';
import {WallDirection} from '../../models/WallDirection';
import {WallDestruction} from "../../models/WallDestruction";
import FootHeightIcon from "../../../assets/icons/foot.svg";
import HeadHeightIcon from "../../../assets/icons/head.svg";
import VaultIcon from "../../../assets/icons/vault.svg";
import RotationIcon from "../../../assets/icons/rotation.svg";
import RotationImage from "../../../assets/images/rotation_wall.png";
import FootImage from "../../../assets/images/prone_wall.jpeg";
import VaultImage from "../../../assets/images/vault_wall.jpeg";
import SightImage from "../../../assets/images/sight_wall.jpeg";
import Tooltip from "../Tooltip";

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
        <div className={"icon-items"}
             style={{
                 left: `${wall.x}%`,
                 top: `${wall.y}%`,
                 position: 'absolute', // Ensure the icon is positioned correctly
                 transformOrigin: 'center', // Ensure rotation is around the center
             }}>
            {wall.type === WallDestructionType.FootHeight && (
                <Tooltip iconSrc={FootImage} title={"Prone Lines"}
                         description={"São paredes quebradas na altura dos pés, permitindo que os jogadores se deitem e marquem inimigos de forma discreta, dificultando sua detecção.\""}>
                    <img
                        src={FootHeightIcon}
                        height={`${iconSize / 2.7}px`}
                        width={`${iconSize / 2.7}px`}
                        style={{
                            display: "block", // Removes any gaps caused by inline images
                        }}/>
                </Tooltip>
            )}
            {wall.type === WallDestructionType.HeadHeight && (
                <Tooltip iconSrc={SightImage} title={"Halfway lines"}
                         description={"São aberturas feitas em paredes que permitem que os jogadores vejam e atirem através delas, enquanto ainda permanecem parcialmente cobertos, oferecendo uma vantagem estratégica durante confrontos."}>
                <img
                    src={HeadHeightIcon}
                    height={`${iconSize / 2.7}px`}
                    width={`${iconSize / 2.7}px`}
                    style={{
                        display: "block", // Removes any gaps caused by inline images
                    }}/>
                </Tooltip>

            )}
            {wall.type === WallDestructionType.Vault && (
                <Tooltip iconSrc={VaultImage} title={"Vault holes"}
                         description={"São aberturas em paredes que permitem aos jogadores atravessar rapidamente, facilitando a movimentação vertical e proporcionando novas rotas táticas durante as partidas."}>
                <img
                    src={VaultIcon}
                    height={`${iconSize / 2.7}px`}
                    width={`${iconSize / 2.7}px`}
                    style={{
                        display: "block", // Removes any gaps caused by inline images
                    }}/>
                </Tooltip>

            )}
            {wall.type === WallDestructionType.Rotation && (
                <Tooltip iconSrc={RotationImage} title={"Rotacoes"}
                         description={"Aberturas feitas em paredes para permitir que os defensores se movam rapidamente entre áreas, melhorando a mobilidade e a estratégia sem precisar usar portas ou janelas."}>
                    <img
                        src={RotationIcon}
                        height={`${iconSize / 2.7}px`}
                        width={`${iconSize / 2.7}px`}
                        style={{
                            display: "block",
                        }}/>
                </Tooltip>

            )}
        </div>
    );
};

export default WallDestructionIcon;
