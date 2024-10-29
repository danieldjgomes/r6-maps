import {DefenseSetupItemType} from "../models/DefenseSetupItemType";
import React from 'react';
import {R6PlannerOperator} from "../mapViewer/r6PlannerOperator";
import './ControlPanel.css'

interface OperatorsPanelProps {
    handleEraser: () => void;
    handleAddItemSetup: (setupItemType: DefenseSetupItemType) => void;
}

const OperatorsPanel: React.FC<OperatorsPanelProps> = ({handleAddItemSetup}) => {
    const operators = R6PlannerOperator.getAllOperators();
    const columns = 6;

    const columnsArr = Array.from({length: columns}, (_, colIndex) =>
        operators.filter((_, index) => index % columns === colIndex)
    );

    const maxColumnHeight = Math.max(...columnsArr.map(column => column.length));

    return (
        <>
            <div className={"operator-panel-title"}>
                Defense Operators
            </div>

            {columnsArr.map((column, colIndex) => (
                <div key={colIndex}  className={"operator-icon-container"}
                     style={{height: `${maxColumnHeight * 50}px`}}>
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
