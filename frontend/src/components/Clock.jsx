import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(timer); // Clean up on unmount
    }, []);

    return (
        <Typography variant="h4" component="div" align="center" sx={{ mt: 2 }}>
            {time.toLocaleTimeString()}
        </Typography>
    );
};

export default Clock;
