import React, {useState} from 'react';
import MapPreparationPanel from "./MapPreparationPanel";
import {DefenseSetupItemType} from "../../models/DefenseSetupItemType";
import OperatorPanel from "./OperatorPanel"; // Adjust the import path as needed


interface ControlPanelProps {
    handleEraser: () => void;
    handleAddItemSetup: (setupItemType: DefenseSetupItemType) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
                                                       handleEraser,
                                                       handleAddItemSetup
                                                   }) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button onClick={togglePanel} className="hamburger-btn">
                {isOpen ? "✖" : "☰"}
            </button>


            <div
                className={`control-panel operator-panel ${isOpen ? 'open' : ''}`}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: isOpen ? '0' : '-300px', // Slide in/out from the left
                    height: '100%',
                    width: '300px', // Adjust width as needed
                    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
                    transition: 'left 0.3s ease', // Smooth slide animation
                    zIndex: 99,
                    background: '#0D1B2A',
                    padding: '10px',
                    justifyContent: 'center',
                    gap: '5px',
                    flexWrap: 'wrap',
                }}
            >
                <OperatorPanel handleEraser={handleEraser} handleAddItemSetup={handleAddItemSetup}/>
                <MapPreparationPanel handleEraser={handleEraser} handleAddItemSetup={handleAddItemSetup}/>
            </div>
        </>
    );
};

export default ControlPanel;
