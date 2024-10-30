import React from 'react';
import ReinforcementIconSVG from '../../../../assets/icons/reinforcement.svg';
import FootHeightIconSVG from '../../../../assets/icons/foot.svg';
import HeadHeightIconSVG from '../../../../assets/icons/head.svg';
import VaultHeightIconSVG from '../../../../assets/icons/vault.svg';
import RotationIconSVG from '../../../../assets/icons/rotation.svg';
import HatchIconSVG from '../../../../assets/icons/hatch.svg';
import {CiEraser} from "react-icons/ci";
import '../ControlPanel.css'
import {useInteraction} from "../../../State/InteractionContext";


const MapPreparationPanel = () => {

    const { interactionState, setInteractionState } = useInteraction();

    const addItemSetupToState = (item: string) => {
        setInteractionState(
            {...interactionState,
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
                    <img src={RotationIconSVG} onClick={() => addItemSetupToState('Rotation')} alt="Rotate Wall"/>
                    <img src={VaultHeightIconSVG} onClick={() => addItemSetupToState('Vault')} alt="Vault Height"/>
                    <img src={FootHeightIconSVG} onClick={() => addItemSetupToState('FootHeight')} alt="Foot Height"/>
                    <img src={HeadHeightIconSVG} onClick={() => addItemSetupToState('HeadHeight')} alt="Head Height"/>
                    <img src={ReinforcementIconSVG} onClick={() => addItemSetupToState('ReinforcementWall')} alt="Wall Reinforcement"/>
                    <img src={HatchIconSVG} onClick={() => addItemSetupToState('ReinforcementHatch')} alt="Hatch Reinforcement"/>
                    <CiEraser className={"eraser-icon"} color={"#E0E1DD"} onClick={() => setInteractionState({...interactionState, isErasing: true})}/>
                </div>
            </div>
        </div>

    );
};

export default MapPreparationPanel;
