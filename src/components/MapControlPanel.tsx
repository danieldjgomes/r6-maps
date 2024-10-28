import React, {useState} from 'react';
import {R6Map} from "./models/R6Map";
import {AllMaps} from "./models/AllMaps";
import {MapLevel} from "./models/MapLevel";
import {BombSite} from "./models/BombSite";
import './mapSelector.css';
import {FaShareFromSquare} from "react-icons/fa6";
import ControlPanel from "./mapViewer/controlPanel/ControlPanel";
import {DefenseSetupItemType} from "./models/DefenseSetupItemType";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import {SetupItem, SetupItemMap} from "./models/SetupItemMap";
import ShareWizard from "./mapViewer/ShareWizard/ShareWizard";
import {ApiService} from "../components/mapViewer/ApiService";
import {ZippingService} from"../components/mapViewer/ZippingService";
import MapPreparationPanel from "./mapViewer/controlPanel/MapPreparationPanel";


interface MapSelectorProps {
    setupItems: SetupItemMap[]
    selectedMap: R6Map;
    selectedLevel: MapLevel;
    selectedBombSite: BombSite;
    onSelectMap: (currentMap: R6Map) => void;
    onSelectLevel: (mapLevel: MapLevel) => void;
    onSelectBombSite: (bombSite: BombSite) => void;
    handleEraser: () => void;
    handleAddItemSetup: (setupItemType: DefenseSetupItemType) => void;
}

const MapControlPanel: React.FC<MapSelectorProps> = ({
                                                       setupItems,
                                                       onSelectMap,
                                                       onSelectLevel,
                                                       selectedMap,
                                                       onSelectBombSite,

                                                       handleEraser, handleAddItemSetup
                                                   }) => {

    const [configurationCode, setConfigurationCode] = useState('');
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const apiService = new ApiService();
    const zippingSevice = new ZippingService()


    const handleShareClick = () => {
        if (setupItems.length == 0) {
            setConfigurationCode(`${window.location.origin}`);
            setIsWizardOpen(true);
            return;
        }
        const compressed = zippingSevice.compress(selectedMap, setupItems)
        buildConfigurationCode(compressed).then(() => setIsWizardOpen(true))
    };

    async function buildConfigurationCode(compressed: string) {
        apiService.saveSetupByCompressedData(compressed)
            .then((id) => {
                setConfigurationCode(`${window.location.origin}/${id}`);
            })
    }

    const allMaps = new AllMaps()
    return (
        <>
        <div
            style={{
                position: 'fixed',  // Fica fixado na tela
                top: 0,  // Alinhado ao topo
                left: 0,  // Alinhado à esquerda
                width: '100%',  // Ocupa 100% da largura da tela
                backgroundColor: '#0d1b2a',  // Cor de fundo
                padding: '3px',  // Padding para o conteúdo do componente
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',  // Sombra suave
                zIndex: 1000,  // Garante que ficará acima de outros elementos
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',  // Centraliza os itens verticalmente
                    justifyContent: 'space-between',  // Espaça o conteúdo entre os seletores e o botão
                    padding: '0 10px',  // Padding horizontal para espaçamento
                }}
            >
                {isBrowser &&
                    <>
                        <ControlPanel handleAddItemSetup={handleAddItemSetup} handleEraser={handleEraser}/>
                    </>

                }
                <div className="map-selector-container" style={{display: 'flex', alignItems: 'center'}}>
                    <select onChange={(e) => onSelectMap(allMaps.getMapByName(e.target.value))}>
                        {allMaps.getAllMaps().map((map, index) => (
                            <option key={index} value={map.name}>
                                {map.name}
                            </option>
                        ))}
                    </select>

                    {/* Seletor de Andares */}
                    <select onChange={(e) => onSelectLevel(selectedMap.getMapLevelByFloor(e.target.value))}>
                        {selectedMap?.levels.map((level, index) => (
                            <option key={index} value={level.floor}>
                                {level.floor}
                            </option>
                        ))}
                    </select>

                    {/* Seletor de Bombsite */}
                    <select
                        onChange={(e) => {
                            onSelectBombSite(selectedMap.getBombSiteByName(e.target.value));
                            onSelectLevel(selectedMap.getMapLevelByFloor(selectedMap.getBombSiteByName(e.target.value).bombs[0].floor));
                        }}>
                        {selectedMap.bombSites.map((bombsite, index) => (
                            <option key={index} value={bombsite.name}>
                                {bombsite.name}
                            </option>
                        ))}
                    </select>
                </div>

                {!isBrowser &&

                    <div style={{opacity: '80%', zIndex: '101', position: "fixed", bottom: '1vh', left: '1vw', font: '10px', fontStyle: 'oblique', color: "yellowgreen", padding: '30px', width: '80%'}}>
                        Mobile devices access read-only version.
                    </div>

                }
                <FaShareFromSquare
                    color={"#E0E1DD"}
                    onClick={handleShareClick}
                    style={{
                        minWidth: "25px",
                        minHeight: "25px",
                        cursor: "pointer",
                        alignSelf: 'center',  // Alinha verticalmente ao centro
                    }}
                />
            </div>
        </div>
            <ShareWizard isWizardOpen={isWizardOpen} configurationCode={configurationCode}
                         closeWizard={() => setIsWizardOpen(false)}/>
            </>
    );
};

export default MapControlPanel;
