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
import {useInteraction} from "../state/InteractionContext";

interface MapPreparationPanelProps {
    handleEraser: () => void;
}

const MapPreparationPanel: React.FC<MapPreparationPanelProps> = ({handleEraser}) => {

    const { interactionState, setInteractionState } = useInteraction();


    const addItemSetupToState = (item: DefenseSetupItemType) => {
        setInteractionState(
            {...interactionState,
                isPlacingItem: true,
                itemPlacingType: item
            })
    }

    return (
        <div>

            <div className={"operator-panel-title"}>
                Map Preparations
            </div>

            <div>
                <div
                    className="setup-items">
                    <img src={RotationIconSVG} onClick={() => addItemSetupToState(DefenseSetupItemType.Rotation)} alt="Rotate Wall"/>
                    <img src={VaultHeightIconSVG} onClick={() => addItemSetupToState(DefenseSetupItemType.Vault)} alt="Vault Height"/>
                    <img src={FootHeightIconSVG} onClick={() => addItemSetupToState(DefenseSetupItemType.FootHeight)} alt="Foot Height"/>
                    <img src={HeadHeightIconSVG} onClick={() => addItemSetupToState(DefenseSetupItemType.HeadHeight)} alt="Head Height"/>
                    <img src={ReinforcementIconSVG} onClick={() => addItemSetupToState(DefenseSetupItemType.ReinforcementWall)} alt="Wall Reinforcement"/>
                    <img src={HatchIconSVG} onClick={() => addItemSetupToState(DefenseSetupItemType.ReinforcementHatch)} alt="Hatch Reinforcement"/>
                    <CiEraser className={"eraser-icon"} color={"#E0E1DD"} onClick={handleEraser}/>
                </div>
            </div>
        </div>

    );
};

export default MapPreparationPanel;
