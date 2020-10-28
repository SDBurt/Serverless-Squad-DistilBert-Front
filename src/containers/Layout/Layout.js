import React from 'react'

import Container from '@material-ui/core/Container';

const Layout = (props) => {
    return (
        <Container maxWidth="md">
            {props.children}
        </Container>
    )
}

export default Layout
