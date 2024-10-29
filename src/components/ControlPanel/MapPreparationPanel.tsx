import React from 'react';
import ReinforcementIconSVG from '../../assets/icons/reinforcement.svg';
import FootHeightIconSVG from '../../assets/icons/foot.svg';
import HeadHeightIconSVG from '../../assets/icons/head.svg';
import VaultHeightIconSVG from '../../assets/icons/vault.svg';
import RotationIconSVG from '../../assets/icons/rotation.svg';
import HatchIconSVG from '../../assets/icons/hatch.svg';
import {DefenseSetupItemType} from "../models/DefenseSetupItemType";
import {CiEraser} from "react-icons/ci";
import './ControlPanel.css'

interface MapPreparationPanelProps {
    handleEraser: () => void;
    handleAddItemSetup: (setupItemType: DefenseSetupItemType) => void;
}

const MapPreparationPanel: React.FC<MapPreparationPanelProps> = ({handleAddItemSetup, handleEraser}) => {
    return (
        <div>

            <div className={"operator-panel-title"}>
                Map Preparations
            </div>

            <div>
                <div
                    className="setup-items">
                    <img src={RotationIconSVG} onClick={() => handleAddItemSetup(DefenseSetupItemType.Rotation)} alt="Rotate Wall"/>
                    <img src={VaultHeightIconSVG} onClick={() => handleAddItemSetup(DefenseSetupItemType.Vault)} alt="Vault Height"/>
                    <img src={FootHeightIconSVG} onClick={() => handleAddItemSetup(DefenseSetupItemType.FootHeight)} alt="Foot Height"/>
                    <img src={HeadHeightIconSVG} onClick={() => handleAddItemSetup(DefenseSetupItemType.HeadHeight)} alt="Head Height"/>
                    <img src={ReinforcementIconSVG} onClick={() => handleAddItemSetup(DefenseSetupItemType.ReinforcementWall)} alt="Wall Reinforcement"/>
                    <img src={HatchIconSVG} onClick={() => handleAddItemSetup(DefenseSetupItemType.ReinforcementHatch)} alt="Hatch Reinforcement"/>
                    <CiEraser color={"#E0E1DD"} onClick={handleEraser}
                              style={{width: "35px", height: "35px", cursor: "pointer", backgroundColor: "#23262B"}}/>
                </div>
            </div>
        </div>

    );
};

export default MapPreparationPanel;
