import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {

    return (
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             <i className={icon}></i> { title }
          </Typography>
          <Link to="/">
          <Button color="inherit"> Home </Button>
          </Link>
          <Link to="/about">
          <Button color="inherit"> About Us </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
    )
}

Navbar.propTypes = {

    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {

    title: 'Talverse Community',
    icon: 'fa fa-id-card-alt'
}

export default Navbar;
