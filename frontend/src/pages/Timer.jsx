import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

const Timer = () => {
    const [selectedMinutes, setSelectedMinutes] = useState(45); // default to 45 mins
    const [timeLeft, setTimeLeft] = useState(45 * 60); // in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        let timer = null;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleStart = () => {
        setTimeLeft(selectedMinutes * 60);
        setIsRunning(true);
        setHasStarted(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleResume = () => {
        setIsRunning(true);
    };

    const handleReset = () => {
        setIsRunning(false);
        setHasStarted(false);
        setTimeLeft(selectedMinutes * 60);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            {!hasStarted && (
                <>
                    <Typography gutterBottom>
                        Select time: {selectedMinutes} minute{selectedMinutes !== 1 && 's'}
                    </Typography>
                    <Slider
                        value={selectedMinutes}
                        min={1}
                        max={120}
                        onChange={(e, value) => setSelectedMinutes(value)}
                        valueLabelDisplay="auto"
                        sx={{ width: 300, margin: 'auto' }}
                    />
                </>
            )}

            <Typography variant="h3" gutterBottom sx={{ mt: 3 }}>
                {formatTime(hasStarted ? timeLeft : selectedMinutes * 60)}
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center">
                {!isRunning && !hasStarted && (
                    <Button variant="contained" onClick={handleStart}>
                        Start
                    </Button>
                )}
                {isRunning && (
                    <Button variant="contained" onClick={handlePause}>
                        Pause
                    </Button>
                )}
                {!isRunning && hasStarted && (
                    <Button variant="contained" onClick={handleResume}>
                        Resume
                    </Button>
                )}
                <Button variant="outlined" onClick={handleReset}>
                    Reset
                </Button>
            </Stack>
        </div>
    );
};

export default Timer;
