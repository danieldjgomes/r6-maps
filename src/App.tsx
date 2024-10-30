import React from 'react';
import MapViewer from './components/MapViewer/MapViewer';
import {InteractionProvider} from "./stateControl/InteractionContext";

const App: React.FC = () => {

  return (
      <InteractionProvider>
          <MapViewer />
      </InteractionProvider>
  );
};

export default App;
