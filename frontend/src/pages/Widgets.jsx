import React, { useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import Timer from './Timer';
import ToDo from './ToDo';
import Spotify from './Spotify';
import Scheduling from './Scheduling';
import Button from '@mui/material/Button';

const WIDGET_WIDTH = 350;
const GRID_SIZE = 20;

const snapToGrid = (x, y) => ({
    x: Math.round(x / GRID_SIZE) * GRID_SIZE,
    y: Math.round(y / GRID_SIZE) * GRID_SIZE,
});

function DraggableWidget({ id, position, children, isDragging }) {
    const { attributes, listeners, setNodeRef, transform, isDragging: dragging } = useDraggable({ id });

    const style = {
        position: 'absolute',
        left: position.x + (transform?.x || 0),
        top: position.y + (transform?.y || 0),
        zIndex: dragging ? 1000 : 10,
        width: id === 'scheduling' ? WIDGET_WIDTH + 30 : WIDGET_WIDTH,
        backgroundColor: 'white',
        border: '2px solid black',
        borderRadius: 10,
        boxShadow: dragging ? '0 0 12px rgba(0,0,0,0.4)' : 'none',
        transition: dragging ? 'none' : 'box-shadow 0.3s ease',
    };

    const handleStyle = {
        cursor: 'grab',
        padding: '8px',
        backgroundColor: '#eee',
        borderRadius: '10px 10px 0 0',
        userSelect: 'none',
        touchAction: 'none',
        fontWeight: 'bold',
    };

    const label = {
        timer: 'Timer',
        todo: 'To-Do',
        spotify: 'Spotify',
        scheduling: 'Scheduling',
    }[id] || id;

    return (
        <div ref={setNodeRef} style={style}>
            <div {...listeners} {...attributes} style={handleStyle}>
                :: {label}
            </div>
            <div style={{ padding: 10 }}>{children}</div>
        </div>
    );
}

export default function Widgets() {
    const defaultPositions = {
        timer: { x: 100, y: 100 },
        scheduling: { x: 510, y: 100 },
        todo: { x: 940, y: 100 },
        spotify: { x: 100, y: 470 },
    };

    const [positions, setPositions] = useState(() => {
        const saved = localStorage.getItem('widgetPositions');
        return saved ? JSON.parse(saved) : defaultPositions;
    });

    const [activeId, setActiveId] = useState(null);

    const handleDragEnd = (event) => {
        const { active, delta } = event;
        const id = active.id;

        setPositions((prev) => {
            const old = prev[id];
            const newPos = snapToGrid(old.x + delta.x, old.y + delta.y);
            const updated = {
                ...prev,
                [id]: newPos,
            };
            localStorage.setItem('widgetPositions', JSON.stringify(updated));
            return updated;
        });

        setActiveId(null);
    };

    const resetLayout = () => {
        localStorage.setItem('widgetPositions', JSON.stringify(defaultPositions));
        setPositions(defaultPositions);
    };

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    top: 80,
                    right: 20,
                    zIndex: 2000,
                }}
            >
                <Button variant="outlined" onClick={resetLayout}>
                    Reset Positions
                </Button>
            </div>

            <DndContext
                onDragStart={({ active }) => setActiveId(active.id)}
                onDragEnd={handleDragEnd}
            >
                <DraggableWidget
                    id="timer"
                    position={positions.timer}
                    isDragging={activeId === 'timer'}
                >
                    <Timer />
                </DraggableWidget>

                <DraggableWidget
                    id="scheduling"
                    position={positions.scheduling}
                    isDragging={activeId === 'scheduling'}
                >
                    <Scheduling />
                </DraggableWidget>

                <DraggableWidget
                    id="todo"
                    position={positions.todo}
                    isDragging={activeId === 'todo'}
                >
                    <ToDo />
                </DraggableWidget>

                <DraggableWidget
                    id="spotify"
                    position={positions.spotify}
                    isDragging={activeId === 'spotify'}
                >
                    <Spotify />
                </DraggableWidget>
            </DndContext>
        </>
    );
}
