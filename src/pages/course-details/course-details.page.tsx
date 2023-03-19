import React, { useState, useEffect } from 'react';

import {
    useNavigate,
    useParams,
} from 'react-router-dom';

import {
    Box,
    Breadcrumbs,
    Link,
    Typography,
    CircularProgress,
    Grid,
} from '@mui/material';
import './course-details.styles.scss';

import BackButton from '../../components/app-buttons/back-button.component';

import CourseService from '../../services/course.service';
import { useRequest } from '../../hooks/useRequest';
import VideoJS from '../../components/app-video/VideoJS';
import AppLessonCard from '../../components/app-lesson-card/app-lesson-card.component';

export interface VideoLinkType {
    id: string | null;
    link: string | null;
}

const CourseDetails = (): React.ReactElement => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [videoLink, setVideoLink] = useState<VideoLinkType>({
        id: null,
        link: null,
    });

    const playerRef = React.useRef<any>(null);

    const {
        loading: isCourseDetailsLoading,
        error: courseDetailsError,
        data: courseDetails,
        request: requestCourseDetails
    } = useRequest(CourseService.CourseDetails);

    console.log(courseDetails);

    const changeVideoLinkHandle = (newData: { id?: string; link?: string }) => {
        setVideoLink(currentState => ({
            ...currentState,
            ...newData
        }))
    }

    const fetchCourseDetails = async (id: string) => {
        const courseDetailsResponse = await requestCourseDetails(id);
        console.log(courseDetailsResponse);

        if (!courseDetailsResponse?.error) {
            changeVideoLinkHandle({ link: courseDetailsResponse?.data?.meta?.courseVideoPreview?.link })
        }
    }

    useEffect(() => {
        if (id) {
            fetchCourseDetails(id)
        }
    }, [])

    const goBack = () => {
        navigate(-1);
    }

    const videoJsOptions = {
        autoplay: true,
        preload: "auto",
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: videoLink.link,
            }
        ]
    };

    const handlePlayerReady = (player: any) => {
        playerRef.current = player;
    };

    return (
        <section className="course-details">
            <Box className="course-details__header header">
                <BackButton onClickHandler={goBack} />
                <Breadcrumbs
                    aria-label="breadcrumb"
                    className="header__breadcrumb"
                    sx={{
                        "& .MuiBreadcrumbs-ol": {
                            justifyContent: "center",
                        }
                    }}
                >
                    <Link
                        underline="hover"
                        color="inherit"
                        onClick={goBack}
                        className="header__breadcrumb-link"
                    >
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        className="header__breadcrumb-link"
                    >
                        Course details
                    </Link>
                </Breadcrumbs>
            </Box>
            <Box>
                {isCourseDetailsLoading ?
                    <CircularProgress sx={{ display: "block", m: "0 auto" }} />
                    :
                    <>
                        {courseDetailsError ?
                            <Typography color="error" sx={{ fontSize: "14px" }}>
                                Ooops... Error: {courseDetailsError.message}
                            </Typography>
                            :
                            <>
                                <Typography
                                    component="h4"
                                    variant="h4"
                                    sx={{ textAlign: "center", mb: 2 }}
                                >
                                    {courseDetails?.data?.title}
                                </Typography>
                                <Box>
                                    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                                    <Box className="course-details__description-box">
                                        <Typography className="course-details__box-title">
                                            Description
                                        </Typography>
                                        <Typography>
                                            {courseDetails?.data?.description}
                                        </Typography>
                                    </Box>
                                    <Box className="course-details__lessons-box">
                                        <Typography className="course-details__box-title">
                                            Lessons
                                        </Typography>
                                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                            {courseDetails?.data?.lessons?.map(lesson => {
                                                return (
                                                    <Grid
                                                        item
                                                        xs={4} sm={4} md={4}
                                                        key={lesson.id}
                                                    >
                                                        <AppLessonCard
                                                            lessonData={lesson}
                                                            selectHandle={changeVideoLinkHandle}
                                                            selectedLesson={videoLink}
                                                        />
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                    </Box>
                                </Box>
                            </>
                        }
                    </>
                }
            </Box>
        </section>
    )
}

export default CourseDetails;