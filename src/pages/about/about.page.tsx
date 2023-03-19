import React from 'react';

import {
  useNavigate,
} from 'react-router-dom';

import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
} from '@mui/material';
import './about.styles.scss';

import BackButton from '../../components/app-buttons/back-button.component';


const About = (): React.ReactElement => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }
  return (
    <section className="about">
      <Box className="about__header header">
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
            About
          </Link>
        </Breadcrumbs>
      </Box>
      <Box sx={{ p: "20px 0" }}>
        <Typography
          component="h2"
          variant="h2"
          sx={{ textAlign: "center", mb: 2 }}
        >
          About
        </Typography>
        <Typography>
          A Skill set is an online platform that provides a wide range of courses to learners of all ages and backgrounds. These platforms offer a variety of courses in various fields, such as technology, business, healthcare, language learning, and more.
        </Typography>
      </Box>
    </section>
  );
};

export default About;