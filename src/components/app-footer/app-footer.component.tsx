import React, { useMemo } from 'react';
import './app-footer.styles.scss';
import { Link } from 'react-router-dom';

interface ILink {
    path: string;
    text: string;
}

const navigation: ILink[] = [
    {
        text: 'Home',
        path: '/',
    },
    {
        text: 'About',
        path: '/about',
    },
];

const AppFooter: React.FC = () => {

    const currentYear = useMemo(() => {
        const date = new Date();

        return date.getFullYear();
    }, []);

    return (
        <footer className="footer">
            <div className="container footer__container">
                <nav className="footer__nav">
                    <ul className="footer__list">
                        {navigation.map((link) => (
                            <li key={link.path} className="footer__item">
                                <Link to={link.path} className="footer__link">
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="footer__copy">&copy; SkillSet {currentYear}</div>
            </div>
        </footer>
    );
};

export default AppFooter;