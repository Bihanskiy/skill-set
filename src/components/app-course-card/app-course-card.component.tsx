import React, { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Typography,
  CardMedia,
  CardContent,
  Card,
  CardActionArea,
  CardActions,
  Rating,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './app-course-card.style.scss';
import { IAllCourses } from "../../types/course.types";

interface AppCourseCardType {
  courseData: IAllCourses;
}

const AppCourseCard: FC<AppCourseCardType> = ({ courseData }) => {
  const navigate = useNavigate();

  return (
    <Card className="course-card">
      <Box className="course-card__info">
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="course-card__title"
            sx={{ fontWeight: 700 }}
          >
            {courseData.title}
          </Typography>
          <Box className="course-card__rating-wrapper">
            <Typography>
              {courseData.rating}
            </Typography>
            <Rating name="read-only" value={courseData.rating} readOnly />
          </Box>
          <Typography>
            {courseData.lessonsCount} lesons
          </Typography>
          <Box className="course-card__skills-wrapper">
            <Typography sx={{ fontWeight: 700 }}>
              Skills
            </Typography>
            <List dense={true}>
              {courseData.meta?.skills?.map(skill => {
                return (
                  <ListItem key={skill}>
                    <ListItemIcon sx={{ minWidth: 35 }}>
                      <FiberManualRecordIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText
                      primary={skill}
                    />
                  </ListItem>
                )
              })}
            </List>
          </Box>
        </CardContent>
        <CardActions sx={{ pl: 2, pb: 2 }}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => navigate(`/course/${courseData.id}`)}
          >
            See more
          </Button>
        </CardActions>
      </Box>
      <CardActionArea
        className="course-card__media-wrapper"
        onClick={() => navigate(`/course/${courseData.id}`)}
      >
        <CardMedia
          component="img"
          className="media"
          image={`${courseData?.previewImageLink}/cover.webp`}
          alt="green iguana"
        />
      </CardActionArea>
    </Card>
  )
}

export default AppCourseCard;