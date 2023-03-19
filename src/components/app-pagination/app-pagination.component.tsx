import React, { useEffect } from 'react';
import { Link, MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import useQuery from '../../hooks/use-query.hook';

interface IPaginationProps {
    count: number;
    onChange: ({ page }: { page: number }) => void;
}

const AppPagination = ({
    count,
    onChange,
}: IPaginationProps): React.ReactElement => {
    const query = useQuery();
    const page: number = Number(query.get('page')) || 1;
    const { pathname } = useLocation()

    useEffect(() => {
        onChange({ page });
    }, [page, onChange]);

    return (
        <Pagination
            shape="rounded"
            color="primary"
            page={page}
            count={count}
            renderItem={(item) => (
                <PaginationItem
                    component={Link}
                    to={`${pathname}?page=${item.page}`}
                    {...item}
                />
            )}
        />
    );
};

export default AppPagination;