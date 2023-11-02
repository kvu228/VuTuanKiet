import React from "react";
import { Navbar, Container, Image } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand>
                    <Image
                        alt='logo'
                        src='assets/images/logo.svg'
                        width='30'
                        height='30'
                        className='d-inline-block align-top'
                    />
                    My Fancy Form
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default Header;
