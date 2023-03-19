import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
} from '@mui/material';
import useQuery from '../../hooks/use-query.hook';

interface IPaginationProps {
  onChange: ({ page }: { page: number }) => void;
}

const AppPagination = ({
  onChange,
}: IPaginationProps): React.ReactElement => {
  const query = useQuery();
  const page: number = Number(query.get('page')) || 1;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    onChange({ page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Button
      variant="contained"
      size="large"
      onClick={() => navigate(`${pathname}?page=${page + 1}`)}
      sx={{
        display: "flex",
        m: "0 auto",
      }}
    >
      Show more
    </Button>
  );
};

export default AppPagination;