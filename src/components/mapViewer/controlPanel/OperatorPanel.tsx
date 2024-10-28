import {DefenseSetupItemType} from "../../models/DefenseSetupItemType";
import React, {useState} from 'react';
import {R6PlannerOperator} from "../r6PlannerOperator";

interface OperatorsPanelProps {
    handleEraser: () => void;
    handleAddItemSetup: (setupItemType: DefenseSetupItemType) => void;
}

const OperatorsPanel: React.FC<OperatorsPanelProps> = ({
                                                           handleEraser,
                                                           handleAddItemSetup
                                                       }) => {
    const [isOpen, setIsOpen] = useState(false);
    const operators = R6PlannerOperator.getAllOperators();
    const columns = 6;

    // Create an array of columns
    const columnsArr = Array.from({length: columns}, (_, colIndex) =>
        operators.filter((_, index) => index % columns === colIndex)
    );

    // Find the maximum number of operators in any column
    const maxColumnHeight = Math.max(...columnsArr.map(column => column.length));

    return (
        <>
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
                            <img className={"operator-icon"}
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
                    {Array.from({length: maxColumnHeight - column.length}).map((_, idx) => (
                        <div key={`empty-${idx}`} style={{height: '50px', width: '40px'}}></div>
                    ))}
                </div>


            ))}
        </>
    )

}

export default OperatorsPanel;
