import React from 'react';
import { Container } from 'reactstrap';
import NavBar from './NavBar';
import './Layout.css';

function Layout(props) {
    return (
        <div>
            <NavBar />
            <Container>
                {props.children}
            </Container>
        </div>
    );
}

Layout.displayName = 'Layout';

export default Layout;
