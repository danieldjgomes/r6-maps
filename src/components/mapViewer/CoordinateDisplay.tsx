import React, { useState } from 'react';

interface CoordinateDisplayProps {
    mapImageRef: React.RefObject<HTMLImageElement>; // Referência para a imagem do mapa
}

const CoordinateDisplay: React.FC<CoordinateDisplayProps> = ({ mapImageRef }) => {
    const [coordinates, setCoordinates] = useState<{ x: number; y: number } | null>(null); // Estado para armazenar as coordenadas

    const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
        if (mapImageRef.current) {
            const rect = mapImageRef.current.getBoundingClientRect(); // Obter a posição do elemento
            const x = event.clientX - rect.left; // Calcular a posição X relativa
            const y = event.clientY - rect.top; // Calcular a posição Y relativa
            setCoordinates({ x, y }); // Atualizar as coordenadas
        }
    };

    const handleMouseLeave = () => {
        setCoordinates(null); // Limpar as coordenadas ao sair do mouse
    };

    return (
        <div>
            {coordinates && (
                <div style={{
                    position: 'absolute',
                    top: `${coordinates.y}px`, // Posicionar no lugar das coordenadas
                    left: `${coordinates.x}px`,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo semi-transparente
                    color: 'white',
                    padding: '5px',
                    borderRadius: '4px',
                    transform: 'translate(-50%, -100%)', // Ajustar a posição do tooltip
                    pointerEvents: 'none', // Ignorar eventos do mouse
                }}>
                    X: {coordinates.x.toFixed(0)}, Y: {coordinates.y.toFixed(0)} {/* Exibir as coordenadas */}
                </div>
            )}
        </div>
    );
};

export default CoordinateDisplay;
