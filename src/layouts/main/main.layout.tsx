import React, { FC } from 'react';
import AppFooter from '../../components/app-footer/app-footer.component';
import AppHeader from '../../components/app-header/app-header.component';
import './main-layout.styles.scss';

interface MainLayoutType {
    children: React.ReactNode;
}

const MainLayout: FC<MainLayoutType> = ({ children }) => (
    <div className="app-main-wrapper">
        <AppHeader />
        <main className="main">
            <div className="container">
                {children}
            </div>
        </main>
        <AppFooter />
    </div>
);

export default MainLayout;