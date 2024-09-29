import React from 'react';
import ReinforcementIconSVG from '../assets/icons/reinforcement.svg'
import FootHeightIconSVG from '../assets/icons/foot.svg'
import HeadHeightIconSVG from '../assets/icons/head.svg'
import VaultHeightIconSVG from '../assets/icons/vault.svg'
import RotationIconSVG from '../assets/icons/rotation.svg'
import HatchIconSVG from '../assets/icons/hatch.svg'

interface ControlPanelProps {
    containerWidth: number;
    setContainerWidth: (width: number) => void;
    handleAddWallDestruction: () => void;
    handleAddWallRotation: () => void;
    handleAddWallHeadHeight: () => void;
    handleAddWallFootHeight: () => void;
    handleAddWallVault: () => void;
    handleAddWallReinforcement: () => void;
    handleAddHatchReinforcement: () => void;
    saveConfiguration: () => void;  // Adicionado
    loadConfiguration: (data: string) => void;  // Adicionado
}

const ControlPanel: React.FC<ControlPanelProps> = ({
                                                       containerWidth,
                                                       setContainerWidth,
                                                       handleAddHatchReinforcement,
                                                       handleAddWallRotation,
                                                       handleAddWallHeadHeight,
                                                       handleAddWallFootHeight,
                                                       handleAddWallVault,
                                                       handleAddWallReinforcement,
                                                       saveConfiguration,  // Adicionado
                                                       loadConfiguration,  // Adicionado
                                                   }) => {
    const handleLoadClick = () => {
        const jsonData = prompt("Cole a configuração JSON aqui:");
        if (jsonData) {
            loadConfiguration(jsonData);
        }
    };

    return (
        <div className="control-panel" style={{ position: 'fixed', bottom: '20px', left: '20px' }}>
            <input
                type="range"
                min="85"
                max="200"
                value={containerWidth}
                onChange={(e) => setContainerWidth(parseInt(e.target.value))}
                className="slider"
                id="widthSlider"
            />

            {/*<button onClick={handleAddWallDestruction}>Add Wall Destruction</button>*/}
            <img src={RotationIconSVG} onClick={handleAddWallRotation}/>
            <img src={VaultHeightIconSVG} onClick={handleAddWallVault}/>
            <img src={ReinforcementIconSVG} onClick={handleAddWallReinforcement}/>
            <img src={HatchIconSVG} onClick={handleAddHatchReinforcement}/>
            <img src={FootHeightIconSVG} onClick={handleAddWallFootHeight}/>
            <img src={HeadHeightIconSVG} onClick={handleAddWallHeadHeight}/>
            <button onClick={saveConfiguration}>Save Configuration</button>  {/* Adicionado */}
            <button onClick={handleLoadClick}>Load Configuration</button>  {/* Adicionado */}
        </div>
    );
};

export default ControlPanel;
