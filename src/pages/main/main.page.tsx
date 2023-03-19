import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    CircularProgress
} from '@mui/material';
import AppCourseCard from '../../components/app-course-card/app-course-card.component';
import { useRequest } from '../../hooks/useRequest';
import CourseService from '../../services/course.service';
import './main.styles.scss';
import AppPagination from '../../components/app-pagination/app-pagination.component';

import { IAllCourses } from "../../types/course.types";

const MainPage = (): React.ReactElement => {
    const [paginateCourses, setPaginateCourses] = useState<IAllCourses[]>([]);
    const {
        loading: isAllCoursesLoading,
        error: allCoursesError,
        data: allCourses,
        request: requestAllCourses
    } = useRequest(CourseService.GetAllCourses);

    const pages = 10;

    const handlePageChange = useCallback(
        ({ page }: { page: number }) => {
            console.log(page);

        },
        [allCourses]
    );

    // const fetchAllCourses = async () => {
    //     const allCoursesResponse = await requestAllCourses();

    //     if (!allCoursesResponse?.error) {
    //         setAllCourses(allCoursesResponse?.data?.courses)
    //     }
    // }

    useEffect(() => {
        requestAllCourses();
    }, [])

    return (
        <section className="home">
            <Typography
                component="h2"
                variant="h2"
                sx={{ textAlign: "center" }}
            >
                All courses
            </Typography>
            <Box sx={{ pt: 3 }}>
                {isAllCoursesLoading ?
                    <CircularProgress sx={{ display: "block", m: "0 auto" }} />
                    :
                    <>
                        <Box className="home__courses-list">
                            {
                                allCourses?.data?.courses?.map(course => {
                                    return (
                                        <React.Fragment key={course.id}>
                                            <AppCourseCard courseData={course} />
                                        </React.Fragment>
                                    )
                                })
                            }
                        </Box>
                        <AppPagination
                            count={pages}
                            onChange={handlePageChange}
                        />
                    </>
                }
                {allCoursesError &&
                    <Typography color="error" sx={{ fontSize: "14px" }}>
                        Ooops... Error: {allCoursesError.message}
                    </Typography>
                }
            </Box>
        </section>
    )
};

export default MainPage;