import React, {useState} from 'react';
import {R6PlannerOperator} from "../r6PlannerOperator";
import ControlPanel from "./ControlPanel";
import {DefenseSetupItemType} from "../../models/DefenseSetupItemType"; // Adjust the import path as needed


interface OperatorsPanelProps {
    handleEraser: () => void;
    handleAddItemSetup: (setupItemType: DefenseSetupItemType) => void;
}

const OperatorsPanel: React.FC<OperatorsPanelProps> = ({
                    handleEraser,
                    handleAddItemSetup
                                                       }) => {
    const [isOpen, setIsOpen] = useState(false); // Control panel visibility
    const operators = R6PlannerOperator.getAllOperators();
    const columns = 6;

    // Create an array of columns
    const columnsArr = Array.from({length: columns}, (_, colIndex) =>
        operators.filter((_, index) => index % columns === colIndex)
    );

    // Find the maximum number of operators in any column
    const maxColumnHeight = Math.max(...columnsArr.map(column => column.length));

    // Toggle the panel visibility
    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Hamburger button */}
            <button onClick={togglePanel} className="hamburger-btn">
                {isOpen ? "✖" : "☰"}
            </button>


            {/* Operators Panel */}
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
                <div className={"operator-panel-title"}>
                    Defense Operators
                </div>

                {columnsArr.map((column, colIndex) => (
                    <div key={colIndex}
                         style={{
                             display: 'flex',
                             flexDirection: 'column',
                             alignItems: 'center',
                             gap: '5px',
                             justifyContent: 'center',
                             height: `${maxColumnHeight * 50}px`,
                             minHeight: '100px',
                         }}>
                        {column.map((op: R6PlannerOperator) => (
                            <>
                                <img
                                    onClick={
                                    () => {
                                        console.log(op.operator)
                                        handleAddItemSetup(DefenseSetupItemType[op.operator.name as keyof typeof DefenseSetupItemType])

                                    }
                                }
                                    key={op.operator.name}
                                    src={op.source}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        objectFit: 'contain',
                                    }}
                                    alt={`Operator ${op.operator.name}`}
                                />
                            </>


                        ))}
                        {/*Placeholder for empty space*/}
                        {Array.from({length: maxColumnHeight - column.length}).map((_, idx) => (
                            <div key={`empty-${idx}`} style={{height: '50px', width: '40px'}}></div>
                        ))}
                    </div>


                ))}

                <div className={"operator-panel-title"}>
                    Map preparations
                </div>

                <ControlPanel handleEraser={handleEraser} handleAddItemSetup={handleAddItemSetup}/>

            </div>
        </>
    );
};

export default OperatorsPanel;
