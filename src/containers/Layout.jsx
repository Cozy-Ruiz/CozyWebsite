import React from 'react';
import Login from './Login';

const Layout = ({ children }) => {
    return (
        <div className="Layout">
            {children}
        </div>
    );
}

export default Layout;