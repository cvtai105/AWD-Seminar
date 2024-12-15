import React from 'react';
import Header from '../components/Header';

import { Navigate, Outlet } from 'react-router-dom';
const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default MainLayout;
