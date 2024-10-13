import React from 'react';
import ReinforcementIconSVG from '../../../assets/icons/reinforcement.svg';
import FootHeightIconSVG from '../../../assets/icons/foot.svg';
import HeadHeightIconSVG from '../../../assets/icons/head.svg';
import VaultHeightIconSVG from '../../../assets/icons/vault.svg';
import RotationIconSVG from '../../../assets/icons/rotation.svg';
import HatchIconSVG from '../../../assets/icons/hatch.svg';
import { SetupItemType } from "../../models/SetupItemType";
import { CiEraser } from "react-icons/ci";
import { FaShare } from "react-icons/fa";
import './ControlPanel.css'
import useIsLandscape from "../../../useIsLandScape";

interface ControlPanelProps {
    containerWidth: number;
    setContainerWidth: (width: number) => void;
    handleEraser: () => void;
    handleAddItemSetup: (setupItemType: SetupItemType) => void;
    saveConfiguration: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
                                                       containerWidth,
                                                       setContainerWidth,
                                                       handleAddItemSetup,
                                                       saveConfiguration,
                                                       handleEraser
                                                   }) => {

    const isLandscape = useIsLandscape(); // Usa o hook para verificar se está em landscape



    return (
        <div>

            {isLandscape && <div className="control-panel icon-panel" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
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
                        onClick={() => handleAddItemSetup(SetupItemType.Rotation)}
                        alt="Rotate Wall"
                        style={{width: '40px', height: '40px'}} // Ajuste o tamanho dos ícones se necessário
                    />
                    <img
                        src={VaultHeightIconSVG}
                        onClick={() => handleAddItemSetup(SetupItemType.Vault)}
                        alt="Vault Height"
                        style={{width: '40px', height: '40px'}}
                    />
                    <img
                        src={FootHeightIconSVG}
                        onClick={() => handleAddItemSetup(SetupItemType.FootHeight)}
                        alt="Foot Height"
                        style={{width: '40px', height: '40px'}}
                    />
                    <img
                        src={HeadHeightIconSVG}
                        onClick={() => handleAddItemSetup(SetupItemType.HeadHeight)}
                        alt="Head Height"
                        style={{width: '40px', height: '40px'}}
                    />
                    <img
                        src={ReinforcementIconSVG}
                        onClick={() => handleAddItemSetup(SetupItemType.ReinforcementWall)}
                        alt="Wall Reinforcement"
                        style={{width: '40px', height: '40px'}}
                    />
                    <img
                        src={HatchIconSVG}
                        onClick={() => handleAddItemSetup(SetupItemType.ReinforcementHatch)}
                        alt="Hatch Reinforcement"
                        style={{width: '40px', height: '40px'}}
                    />
                    <CiEraser onClick={handleEraser} style={{width: "40px", height: "40px", cursor: "pointer"}}/>
                </div>
            </div>}

            </div>

    );
};

export default ControlPanel;
