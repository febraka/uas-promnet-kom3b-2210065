import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-dark bg-info">
                    <div className="container-fluid">
                        <Link to="/users" className="navbar-brand">
                            Books Library
                        </Link>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;
