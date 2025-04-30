import React, { useState, useEffect } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import Timer from './Timer';
import ToDo from './ToDo';
import Spotify from './Spotify';
import Scheduling from './Scheduling';

function DraggableWidget({ id, position, children }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    const style = {
        position: 'absolute',
        left: position.x + (transform?.x || 0),
        top: position.y + (transform?.y || 0),
        zIndex: 10,
        width: 350,
        backgroundColor: 'white',
        border: '2px solid black',
        borderRadius: 10,
    };

    const handleStyle = {
        cursor: 'grab',
        padding: '8px',
        backgroundColor: '#eee',
        borderRadius: '10px 10px 0 0',
        userSelect: 'none',
        touchAction: 'none',
    };

    return (
        <div ref={setNodeRef} style={style}>
            <div {...listeners} {...attributes} style={handleStyle}>
                :: {id.charAt(0).toUpperCase() + id.slice(1)}
            </div>
            <div style={{ padding: 10 }}>{children}</div>
        </div>
    );
}

export default function Widgets() {
    const defaultPositions = {
        timer: { x: 100, y: 100 },
        todo: { x: 500, y: 100 },
        spotify: { x: 100, y: 400 },
        scheduling: { x: 500, y: 400 },
    };

    const [positions, setPositions] = useState(() => {
        const saved = localStorage.getItem('widgetPositions');
        return saved ? JSON.parse(saved) : defaultPositions;
    });

    const handleDragEnd = (event) => {
        const { active, delta } = event;

        setPositions((prev) => {
            const old = prev[active.id];
            const updated = {
                ...prev,
                [active.id]: {
                    x: old.x + delta.x,
                    y: old.y + delta.y,
                },
            };
            localStorage.setItem('widgetPositions', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <DraggableWidget id="timer" position={positions.timer}>
                <Timer />
            </DraggableWidget>

            <DraggableWidget id="todo" position={positions.todo}>
                <ToDo />
            </DraggableWidget>

            <DraggableWidget id="spotify" position={positions.spotify}>
                <Spotify />
            </DraggableWidget>

            <DraggableWidget id="scheduling" position={positions.scheduling}>
                <Scheduling />
            </DraggableWidget>
        </DndContext>
    );
}
