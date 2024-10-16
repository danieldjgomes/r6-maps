import React from 'react';
import ReinforcementIconSVG from '../../../assets/icons/reinforcement.svg';
import FootHeightIconSVG from '../../../assets/icons/foot.svg';
import HeadHeightIconSVG from '../../../assets/icons/head.svg';
import VaultHeightIconSVG from '../../../assets/icons/vault.svg';
import RotationIconSVG from '../../../assets/icons/rotation.svg';
import HatchIconSVG from '../../../assets/icons/hatch.svg';
import {DefenseSetupItemType} from "../../models/DefenseSetupItemType";
import {CiEraser} from "react-icons/ci";
import './ControlPanel.css'

interface ControlPanelProps {
    handleEraser: () => void;
    handleAddItemSetup: (setupItemType: DefenseSetupItemType) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
                                                       handleAddItemSetup,
                                                       handleEraser
                                                   }) => {


    return (
        <div>

            {<div>
                <div
                    className="setup-items"
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap', // Permite que os itens envolvam para a próxima linha
                        gap: '10px', // Espaçamento entre os itens
                        justifyContent: 'center', // Centraliza os itens
                        width: '200px' // Defina uma largura fixa para controlar quantos itens cabem em cada linha
                    }}>
                    <img
                        src={RotationIconSVG}
                        onClick={() => handleAddItemSetup(DefenseSetupItemType.Rotation)}
                        alt="Rotate Wall"
                        style={{width: '35px', height: '35px'}} // Ajuste o tamanho dos ícones se necessário
                    />
                    <img
                        src={VaultHeightIconSVG}
                        onClick={() => handleAddItemSetup(DefenseSetupItemType.Vault)}
                        alt="Vault Height"
                        style={{width: '35px', height: '35px'}}
                    />
                    <img
                        src={FootHeightIconSVG}
                        onClick={() => handleAddItemSetup(DefenseSetupItemType.FootHeight)}
                        alt="Foot Height"
                        style={{width: '35px', height: '35px'}}
                    />
                    <img
                        src={HeadHeightIconSVG}
                        onClick={() => handleAddItemSetup(DefenseSetupItemType.HeadHeight)}
                        alt="Head Height"
                        style={{width: '35px', height: '35px'}}
                    />
                    <img
                        src={ReinforcementIconSVG}
                        onClick={() => handleAddItemSetup(DefenseSetupItemType.ReinforcementWall)}
                        alt="Wall Reinforcement"
                        style={{width: '35px', height: '35px'}}
                    />
                    <img
                        src={HatchIconSVG}
                        onClick={() => handleAddItemSetup(DefenseSetupItemType.ReinforcementHatch)}
                        alt="Hatch Reinforcement"
                        style={{width: '35px', height: '35px'}}
                    />

                    <CiEraser color={"#E0E1DD"} onClick={handleEraser}
                              style={{width: "35px", height: "35px", cursor: "pointer", backgroundColor: "#23262B"}}/>
                </div>

            </div>
            }

        </div>

    );
};

export default ControlPanel;
