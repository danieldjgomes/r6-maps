import React, {useState} from 'react';
import MapPreparationPanel from "./innerPanel/MapPreparationPanel";
import OperatorPanel from "./innerPanel/OperatorPanel";
import './ControlPanel.css'


const IconControlPanel = () => {
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
                <OperatorPanel/>
                <MapPreparationPanel/>
            </div>
        </>
    );
};

export default IconControlPanel;
