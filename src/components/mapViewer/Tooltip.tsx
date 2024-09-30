import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.css';  // Estilos do tooltip separados em um arquivo CSS

interface TooltipProps {
    iconSrc: string;
    title: string;
    description: string;
    children: React.ReactNode;  // Adicionando suporte a children
}

const Tooltip: React.FC<TooltipProps> = ({ iconSrc, title, description, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showBelow, setShowBelow] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isHovered && containerRef.current && tooltipRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            // Verifica se o tooltip está muito próximo do topo da tela
            if (containerRect.top - tooltipRect.height < 0) {
                setShowBelow(true);  // Exibe o tooltip abaixo do item
            } else {
                setShowBelow(false);  // Exibe o tooltip acima do item
            }
        }
    }, [isHovered]);

    return (
        <div
            ref={containerRef}
            className="tooltip-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Renderizando o ícone ou qualquer outro children */}
            {children}

            {/* Tooltip visível apenas quando hover */}
            {isHovered && (
                <div
                    ref={tooltipRef}
                    className={`tooltip-box ${showBelow ? 'tooltip-below' : 'tooltip-above'}`}
                >
                    <img src={iconSrc} alt={title} className="tooltip-image" />
                    <h3 className="tooltip-title">{title}</h3>
                    <p className="tooltip-description">{description}</p>
                </div>
            )}
        </div>
    );
};

export default Tooltip;
