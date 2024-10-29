import React, { createContext, useContext, useState } from 'react';
import { InteractionState } from './InteractionState';

interface InteractionContextType {
    interactionState: InteractionState;
    setInteractionState: React.Dispatch<React.SetStateAction<InteractionState>>;
}

const InteractionContext = createContext<InteractionContextType | undefined>(undefined);

export const InteractionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [interactionState, setInteractionState] = useState<InteractionState>({
        isPlacingItem: false,
        isErasing: false,
        mouseOverMap: false,
        dragging: false,
        itemPlacingType: null
    });

    return (
        <InteractionContext.Provider value={{ interactionState, setInteractionState }}>
            {children}
        </InteractionContext.Provider>
    );
};

export const useInteraction = () => {
    const context = useContext(InteractionContext);
    if (!context) {
        throw new Error('useInteraction must be used within an InteractionProvider');
    }
    return context;
};
