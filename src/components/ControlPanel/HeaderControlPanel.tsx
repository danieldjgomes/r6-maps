import React, {useState} from 'react';
import {R6Map} from "../models/R6Map";
import {MapLevel} from "../models/MapLevel";
import {BombSite} from "../models/BombSite";
import '../MapSelector.css';
import './HeaderControlPanel.css';
import {FaShareFromSquare} from "react-icons/fa6";
import IconControlPanel from "./IconControlPanel/IconControlPanel";
import {SetupItem} from "../models/SetupItemMap";
import ShareWizard from "../mapViewer/ShareWizard/ShareWizard";
import {ApiService} from "../mapViewer/ApiService";
import {ZippingService} from "../mapViewer/ZippingService";
import MapSelector from '../MapSelector';
import {isBrowser} from "react-device-detect";

interface HeaderControlPanelProps {
    setupItems: SetupItem[];
    selectedMap: R6Map;
    selectedLevel: MapLevel;
    selectedBombSite: BombSite;
    onSelectMap: (currentMap: R6Map) => void;
    onSelectLevel: (mapLevel: MapLevel) => void;
    onSelectBombSite: (bombSite: BombSite) => void;
}

const HeaderControlPanel: React.FC<HeaderControlPanelProps> = ({
                                                                   setupItems,
                                                                   selectedMap,
                                                                   onSelectMap,
                                                                   onSelectLevel,
                                                                   onSelectBombSite,
                                                               }) => {
    const [configurationCode, setConfigurationCode] = useState('');
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const apiService = new ApiService();
    const zippingService = new ZippingService();

    const handleShareClick = () => {
        if (setupItems.length === 0) {
            setConfigurationCode(`${window.location.origin}`);
            setIsWizardOpen(true);
            return;
        }
        const compressed = zippingService.compress(selectedMap, setupItems);
        buildConfigurationCode(compressed).then(() => setIsWizardOpen(true));
    };

    async function buildConfigurationCode(compressed: string) {
        apiService.saveSetupByCompressedData(compressed)
            .then((id) => {
                setConfigurationCode(`${window.location.origin}/${id}`);
            });
    }

    return (
        <>
            <div className="header-container">
                <div className="header-tab">
                    <IconControlPanel/>

                    <MapSelector
                        selectedMap={selectedMap}
                        onSelectMap={onSelectMap}
                        onSelectLevel={onSelectLevel}
                        onSelectBombSite={onSelectBombSite}
                    />

                    {!isBrowser && (
                        <div className="mobile-warning">
                            Mobile devices access read-only version.
                        </div>
                    )}
                    <FaShareFromSquare className="header-share-button" color="#E0E1DD" onClick={handleShareClick}/>
                </div>

            </div>
            <ShareWizard
                isWizardOpen={isWizardOpen}
                configurationCode={configurationCode}
                closeWizard={() => setIsWizardOpen(false)}
            />
        </>
    );
};

export default HeaderControlPanel;
