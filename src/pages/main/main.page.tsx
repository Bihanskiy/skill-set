import React, { useState, useEffect } from 'react';
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

const limit = 10;

const MainPage = (): React.ReactElement => {
  const [paginateCoursesLimit, setPaginateCoursesLimit] = useState<number>(limit);

  const {
    loading: isAllCoursesLoading,
    error: allCoursesError,
    data: allCourses,
    request: requestAllCourses
  } = useRequest(CourseService.GetAllCourses);

  const handlePageChange = ({ page }: { page: number }) => {
    setPaginateCoursesLimit(limit * page);
  }

  useEffect(() => {
    requestAllCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                allCourses?.data?.courses?.map((course, index) => {
                  if (index < paginateCoursesLimit) {
                    return (
                      <React.Fragment key={course.id}>
                        <AppCourseCard courseData={course} />
                      </React.Fragment>
                    )
                  }

                  return null;
                })
              }
            </Box>
            {allCourses && paginateCoursesLimit <= allCourses?.data?.courses?.length &&
              <AppPagination
                onChange={handlePageChange}
              />
            }
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