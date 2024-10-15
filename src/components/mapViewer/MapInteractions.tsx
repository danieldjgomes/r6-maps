// MapInteraction.tsx
import React, { useState, useRef, useEffect } from 'react';

interface MapInteractionProps {
    onMapClick: (event: React.MouseEvent<HTMLImageElement>) => void;
    containerWidth: number;
    setContainerWidth: (width: number) => void;
    src: string
}

const MapInteraction: React.FC<MapInteractionProps> = ({ onMapClick, containerWidth, setContainerWidth, src }) => {
    const [dragging, setDragging] = useState(false);
    const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);
    const [dragOffset, setDragOffset] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [imagePosition, setImagePosition] = useState<{ x: number, y: number }>({ x: 0, y: 80 });

    const mapImageRef = useRef<HTMLImageElement>(null);

    const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
        setDragging(true);
        setDragStart({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
        if (dragging && dragStart) {
            const dx = event.clientX - dragStart.x;
            const dy = event.clientY - dragStart.y;
            setImagePosition({ x: dragOffset.x + dx, y: dragOffset.y + dy });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
        setDragOffset(imagePosition);
        setDragStart(null);
    };

    const handleMouseWheel = (event: React.WheelEvent<HTMLImageElement>) => {
        const zoomFactor = containerWidth * 0.1;
        if (event.deltaY < 0) {
            setContainerWidth(Math.min(containerWidth + zoomFactor, 200));
        } else {
            setContainerWidth(Math.max(containerWidth - zoomFactor, 50));
        }
    };

    return (
        <img
            src={src}
            ref={mapImageRef}
            className="map-image"
            style={{ transform: `matrix(${containerWidth / 100}, 0, 0, ${containerWidth / 100}, ${imagePosition.x}, ${imagePosition.y})` }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleMouseWheel}
            onClick={onMapClick}
            alt="Map"
        />
    );
};

export default MapInteraction;
