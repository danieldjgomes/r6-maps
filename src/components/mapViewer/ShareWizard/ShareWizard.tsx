import React, {useState} from "react";
import {FaRegCopy} from "react-icons/fa";
import './ShareWizard.css'

interface ShareWizardProps {
    isWizardOpen: boolean;
    configurationCode: string;
    closeWizard: () => void;

}


const ShareWizard: React.FC<ShareWizardProps> = ({
                                                     isWizardOpen,
                                                     configurationCode,
                                                     closeWizard
                                                 }) => {

    const [isCopied, setIsCopied] = useState(false);


    return (
        <>
            {isWizardOpen && (
                <div className="wizard">
                    <div className="wizard-content">
                        <h2>Share your setup</h2>
                        <h3 onClick={() => {
                            navigator.clipboard.writeText(configurationCode)
                                .then(() => setIsCopied(true));
                        }}
                            style={{width: '90%', height: '20%', cursor: 'pointer'}}>
                            {configurationCode} <FaRegCopy/>
                        </h3>
                        <div style={{width: '100%', height: '100%', padding: '10px', position: 'relative'}}>
                          <span style={{visibility: isCopied ? 'visible' : 'hidden'}}>
                            Copiado com sucesso.
                          </span>
                        </div>
                        <button onClick={() => {
                            closeWizard();
                            setIsCopied(false);
                        }}>Fechar
                        </button>
                    </div>
                </div>
            )
            }
        </>
    )
        ;
}

export default ShareWizard;
