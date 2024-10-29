import React, {useState} from 'react';
import MapPreparationPanel from "../ControlPanel/MapPreparationPanel";
import OperatorPanel from "../ControlPanel/OperatorPanel";
import './ControlPanel.css'


interface ControlPanelProps {
    handleEraser: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({handleEraser}) => {
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
                <OperatorPanel handleEraser={handleEraser}/>
                <MapPreparationPanel handleEraser={handleEraser}/>
            </div>
        </>
    );
};

export default ControlPanel;
