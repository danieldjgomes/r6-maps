
import { useState, useEffect } from 'react';

const useIsLandscape = () => {
    const [isLandscape, setIsLandscape] = useState(() => window.innerWidth > window.innerHeight);

    const handleResize = () => {
        setIsLandscape(window.innerWidth > window.innerHeight);
    };

    useEffect(() => {
        // Adiciona o listener de redimensionamento da janela
        window.addEventListener('resize', handleResize);

        // Chama handleResize inicialmente para definir a orientação ao carregar
        handleResize();

        // Cleanup: remove o listener quando o componente for desmontado
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isLandscape;
};

export default useIsLandscape;
