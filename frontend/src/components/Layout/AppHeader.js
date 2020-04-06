import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { useUser } from '../../context/user';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'block',
  },
  name: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  menuLink: {
    color: 'black',
    textDecoration: 'none',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  menu: {
    marginTop: 40,
  },
  sectionDesktop: {
    display: 'flex'
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const { data: { currentUser } } = useUser();
  const { methods: { signOut, isLoggedIn, isAdmin } } = useUser();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const logout = () => {
    handleMenuClose();
    signOut();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      className={classes.menu}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    > 
      {isLoggedIn() ? <>
        <MenuItem onClick={handleMenuClose}><Link className={classes.menuLink} to="/profile">Profile</Link></MenuItem>
        <MenuItem onClick={handleMenuClose}><Link className={classes.menuLink} to="/password-change">Change Password</Link></MenuItem>
        <MenuItem onClick={logout}>Sign out</MenuItem>
      </> : 
      <>
        <MenuItem onClick={handleMenuClose}><Link className={classes.menuLink} to="/login">Login</Link></MenuItem>
        <MenuItem onClick={handleMenuClose}><Link className={classes.menuLink} to="/signup">Sign Up</Link></MenuItem>
      </>
      }
    </Menu>
  );


  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
          >
            <Link to=""><HomeIcon /></Link>
          </IconButton>
          <MenuItem>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link className={classes.link} to="/users">Users</Link>
            </Typography>
          </MenuItem>
          {isAdmin() ?
            <MenuItem>
              <Typography className={classes.title} variant="h6" noWrap>
                <Link className={classes.link} to="/categories">Categories</Link>
              </Typography>
            </MenuItem>
            : null}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Typography className={classes.name} variant="h6" noWrap>{currentUser.first_name || ""} {currentUser.last_name || ""}</Typography>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
