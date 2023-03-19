import React, { FC } from 'react';

import {
    IconButton,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

interface BackButtonType {
    onClickHandler: () => void;
}

const BackButton: FC<BackButtonType> = ({ onClickHandler }) => {

    return (
        <IconButton
            onClick={onClickHandler}
            size="small"
            sx={{
                backgroundColor: "#ffffff !important",
                border: "1px solid #efefef !important",
            }}
        >
            <KeyboardBackspaceIcon
                sx={{ fontSize: "20px", color: "#222222" }}
            />
        </IconButton>
    )
}

export default BackButton;