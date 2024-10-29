import React, {useState} from 'react';
import MapPreparationPanel from "../ControlPanel/MapPreparationPanel";
import {DefenseSetupItemType} from "../models/DefenseSetupItemType";
import OperatorPanel from "../ControlPanel/OperatorPanel";
import './ControlPanel.css'


interface ControlPanelProps {
    handleEraser: () => void;
    handleAddItemSetup: (setupItemType: DefenseSetupItemType) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({handleEraser, handleAddItemSetup}) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button onClick={togglePanel} className="hamburger-btn">
                {isOpen ? "✖" : "☰"}
            </button>

            <div className={`control-panel fixed-sidebar ${isOpen ? 'open' : ''}`}>
                <OperatorPanel handleEraser={handleEraser} handleAddItemSetup={handleAddItemSetup}/>
                <MapPreparationPanel handleEraser={handleEraser} handleAddItemSetup={handleAddItemSetup}/>
            </div>
        </>
    );
};

export default ControlPanel;
