import React from 'react';
import MapViewer from './components/mapViewer/MapViewer';
import {InteractionProvider} from "./components/State/InteractionContext";

const App: React.FC = () => {

  return (
      <InteractionProvider>
          <MapViewer />
      </InteractionProvider>
  );
};

export default App;
