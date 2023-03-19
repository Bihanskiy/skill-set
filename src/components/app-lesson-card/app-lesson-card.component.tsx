import React, { useState, FC } from 'react';

import {
    Box,
    Typography,
    CardMedia,
    CardContent,
    Card,
    CardActionArea,
    Snackbar,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import './app-lesson-card.style.scss';

import { ILesson } from "../../types/course.types";

import { VideoLinkType } from "../../pages/course-details/course-details.page";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface AppLessonCardType {
    lessonData: ILesson;
    selectHandle: (args: { id?: string; link?: string }) => void;
    selectedLesson: VideoLinkType;
}

const AppLessonCard: FC<AppLessonCardType> = ({ lessonData, selectHandle, selectedLesson }) => {
    const [openLockedAlert, setOpenLockedAlert] = useState(false);

    const handleLockedAlertClick = () => {
        setOpenLockedAlert(true);
    };

    const handleLockedAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenLockedAlert(false);
    };

    const cardActionHandle = (status: string) => {
        if (status === "unlocked") {
            return selectHandle({
                id: lessonData?.id,
                link: lessonData?.link,
            })
        } else if (status === "locked") {
            handleLockedAlertClick();
        }
    }

    return (
        <>
            <Card
                className={selectedLesson.id === lessonData?.id ? "active-card" : ""}
            >
                <CardActionArea
                    onClick={() => cardActionHandle(lessonData?.status)}
                >
                    <CardMedia
                        component="img"
                        height="200"
                        image={`${lessonData?.previewImageLink}/lesson-${lessonData?.order}.webp`}
                        alt={`Image of ${lessonData?.title} lesson`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {lessonData?.title}
                        </Typography>
                        <Box>
                            <Typography>Status</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {lessonData?.status}
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Snackbar open={openLockedAlert} autoHideDuration={3000} onClose={handleLockedAlertClose}>
                <Alert onClose={handleLockedAlertClose} severity="info" sx={{ width: '100%' }}>
                    This lesson is locked!
                </Alert>
            </Snackbar>
        </>
    )
}

export default AppLessonCard;