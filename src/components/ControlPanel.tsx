import React from 'react';
import ReinforcementIconSVG from '../assets/icons/reinforcement.svg';
import FootHeightIconSVG from '../assets/icons/foot.svg';
import HeadHeightIconSVG from '../assets/icons/head.svg';
import VaultHeightIconSVG from '../assets/icons/vault.svg';
import RotationIconSVG from '../assets/icons/rotation.svg';
import HatchIconSVG from '../assets/icons/hatch.svg';
import { SetupItemType } from "./models/SetupItemType";
import { CiEraser } from "react-icons/ci";
import { FaRegSave } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";

interface ControlPanelProps {
    containerWidth: number;
    setContainerWidth: (width: number) => void;
    handleEraser: () => void;
    handleAddItemSetup: (Rotation: SetupItemType) => void;
    saveConfiguration: () => void;
    loadConfiguration: (data: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
                                                       containerWidth,
                                                       setContainerWidth,
                                                       handleAddItemSetup,
                                                       saveConfiguration,
                                                       loadConfiguration,
                                                       handleEraser
                                                   }) => {
    const handleLoadClick = () => {
        const jsonData = prompt("Cole a configuração JSON aqui:");
        if (jsonData) {
            loadConfiguration(jsonData);
        }
    };

    return (
        <div>
            <div className="control-panel icon-panel" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div
                    className="setup-items"
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap', // Permite que os itens envolvam para a próxima linha
                        gap: '10px', // Espaçamento entre os itens
                        justifyContent: 'center', // Centraliza os itens
                        width: '200px' // Defina uma largura fixa para controlar quantos itens cabem em cada linha
                    }}
                >
                    <img
                        src={RotationIconSVG}
                        onClick={() => handleAddItemSetup(SetupItemType.Rotation)}
                        alt="Rotate Wall"
                        style={{ width: '40px', height: '40px' }} // Ajuste o tamanho dos ícones se necessário
                    />
                    <img
                        src={VaultHeightIconSVG}
                        onClick={() => handleAddItemSetup(SetupItemType.Vault)}
                        alt="Vault Height"
                        style={{ width: '40px', height: '40px' }}
                    />
                    <img
                        src={FootHeightIconSVG}
                        onClick={() => handleAddItemSetup(SetupItemType.FootHeight)}
                        alt="Foot Height"
                        style={{ width: '40px', height: '40px' }}
                    />
                    <img
                        src={HeadHeightIconSVG}
                        onClick={() => handleAddItemSetup(SetupItemType.HeadHeight)}
                        alt="Head Height"
                        style={{ width: '40px', height: '40px' }}
                    />
                    <img
                        src={ReinforcementIconSVG}
                        onClick={() => handleAddItemSetup(SetupItemType.ReinforcementWall)}
                        alt="Wall Reinforcement"
                        style={{ width: '40px', height: '40px' }}
                    />
                    <img
                        src={HatchIconSVG}
                        onClick={() => handleAddItemSetup(SetupItemType.ReinforcementHatch)}
                        alt="Hatch Reinforcement"
                        style={{ width: '40px', height: '40px' }}
                    />
                </div>
            </div>

            <div className="control-panel slider-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <input
                        type="range"
                        min="85"
                        max="200"
                        value={containerWidth}
                        onChange={(e) => setContainerWidth(parseInt(e.target.value))}
                        className="slider"
                        id="widthSlider"
                    />
                </div>
                <div className="control-panel controls persist-panel" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <FaRegSave onClick={saveConfiguration} style={{ width: "40px", height: "40px", cursor: "pointer" }} />
                    <FaCloudUploadAlt onClick={handleLoadClick} style={{ width: "40px", height: "40px", cursor: "pointer" }} />
                    <CiEraser onClick={handleEraser} style={{ width: "40px", height: "40px", cursor: "pointer" }} />
                </div>
            </div>

    );
};

export default ControlPanel;
