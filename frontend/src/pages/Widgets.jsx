import React, { useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import Timer from './Timer';
import ToDo from './ToDo';
import Spotify from './Spotify';
import Scheduling from './Scheduling';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const WIDGET_WIDTH = 350;
const GRID_SIZE = 20;

const snapToGrid = (x, y) => ({
    x: Math.round(x / GRID_SIZE) * GRID_SIZE,
    y: Math.round(y / GRID_SIZE) * GRID_SIZE,
});

function DraggableWidget({
                             id,
                             position,
                             children,
                             activeId,
                             zIndex,
                             collapsed,
                             onToggleCollapse,
                         }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    const isDragging = activeId === id;

    const style = {
        position: 'absolute',
        left: position.x + (transform?.x || 0),
        top: position.y + (transform?.y || 0),
        zIndex: isDragging ? 1000 : zIndex,
        width: id === 'scheduling' ? WIDGET_WIDTH + 30 : WIDGET_WIDTH,
        backgroundColor: 'white',
        border: '2px solid black',
        borderRadius: 10,
        boxShadow: isDragging ? '0 0 12px rgba(0,0,0,0.4)' : 'none',
        transition: isDragging ? 'none' : 'box-shadow 0.3s ease',
        overflow: 'hidden',
    };

    const handleStyle = {
        cursor: 'grab',
        padding: '8px',
        backgroundColor: '#eee',
        borderRadius: '10px 10px 0 0',
        userSelect: 'none',
        touchAction: 'none',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const label = {
        timer: 'Timer',
        todo: 'To-Do',
        spotify: 'Spotify',
        scheduling: 'Scheduling',
    }[id] || id;

    return (
        <div ref={setNodeRef} style={style}>
            <div style={handleStyle}>
        <span {...listeners} {...attributes} style={{ flex: 1 }}>
          :: {label}
        </span>
                <IconButton
                    size="small"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleCollapse?.();
                    }}
                >
                    {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
            </div>
            {!collapsed && <div style={{ padding: 10 }}>{children}</div>}
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

    const [zIndexes, setZIndexes] = useState(() => ({
        timer: 1,
        scheduling: 2,
        todo: 3,
        spotify: 4,
    }));

    const [collapsedWidgets, setCollapsedWidgets] = useState({
        timer: false,
        scheduling: false,
        todo: false,
        spotify: false,
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

        setZIndexes((prev) => {
            const maxZ = Math.max(...Object.values(prev));
            return { ...prev, [id]: maxZ + 1 };
        });

        setActiveId(null);
    };

    const resetLayout = () => {
        localStorage.setItem('widgetPositions', JSON.stringify(defaultPositions));
        setPositions(defaultPositions);
        setZIndexes({
            timer: 1,
            scheduling: 2,
            todo: 3,
            spotify: 4,
        });
        setCollapsedWidgets({
            timer: false,
            scheduling: false,
            todo: false,
            spotify: false,
        });
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
                {['timer', 'scheduling', 'todo', 'spotify'].map((id) => (
                    <DraggableWidget
                        key={id}
                        id={id}
                        position={positions[id]}
                        activeId={activeId}
                        zIndex={zIndexes[id]}
                        collapsed={collapsedWidgets[id]}
                        onToggleCollapse={() =>
                            setCollapsedWidgets((prev) => ({
                                ...prev,
                                [id]: !prev[id],
                            }))
                        }
                    >
                        {{
                            timer: <Timer />,
                            scheduling: <Scheduling />,
                            todo: <ToDo />,
                            spotify: <Spotify />,
                        }[id]}
                    </DraggableWidget>
                ))}
            </DndContext>
        </>
    );
}
