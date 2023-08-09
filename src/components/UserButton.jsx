import React from 'react';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';

const UserButton = () => {
    return (
        <Button
            startIcon={<AccountCircleIcon />}

            sx={{

                alignItems: 'center', // Center vertically
                color: 'white',
            }}
        >
        </Button>
    );
};

export default UserButton;
