import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { Fragment } from 'react';

const Navbar = ({ title, icon }) => {

  const authContext = React.useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {

    logout();
  }

  const authLinks = (

    <Fragment>
      <li>
        Hello {user && user.name}
      </li>
      <li>
        <a onClick={onLogout} href="!#">
          <i className="fas fa-sign-out-alt">  </i>
          <span> logout </span>
        </a>
      </li>
    </Fragment>

  );

  const guestLinks = (

    <Fragment>
      <Link to="/register">
        <Button color="inherit"> Register </Button>
      </Link>
      <Link to="/login">
        <Button color="inherit"> Login </Button>
      </Link>
    </Fragment>
  )

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
            <i className={icon}></i> {title}
          </Typography>

          {isAuthenticated ? authLinks : guestLinks}

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
