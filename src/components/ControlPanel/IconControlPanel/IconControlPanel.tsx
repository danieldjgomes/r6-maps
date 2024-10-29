import React, {useState} from 'react';
import MapPreparationPanel from "../IconControlPanel/innerPanel/MapPreparationPanel"
import OperatorPanel from "../IconControlPanel/innerPanel/OperatorPanel"
import './ControlPanel.css'
import {isBrowser} from 'react-device-detect';


const IconControlPanel = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return isBrowser ? (
        <>
            <button onClick={togglePanel} className="hamburger-btn">
                {isOpen ? "✖" : "☰"}
            </button>
            <div className={`control-panel fixed-sidebar ${isOpen ? 'open' : ''}`}>
                <OperatorPanel/>
                <MapPreparationPanel/>
            </div>
        </>
    ) : <></>;
};

export default IconControlPanel;
