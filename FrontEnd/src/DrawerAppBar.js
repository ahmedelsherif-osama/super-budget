import * as React from 'react';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

/**interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   
  window?: () => Window;
} **/

const drawerWidth = 240;
const pagesNotLoggedIn = ['Sign Up', 'Login', 'About'];
const pagesPathsNotLoggedIn = ['/register','/login','/about'];
const pagesLoggedIn = ['Add Expense', 'Profile', 'About', 'Log Out','View By Date', 'View By Item'];
const pagesPathsLoggedIn = ['/addexpense','/profile','/about','/logout','/viewbydate','/viewbyitem'];


export default function DrawerAppBar(props) {

  const {loggedIn} = useContext(UserContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawerLoggedIn = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {
        pagesLoggedIn.map(
          (page, i) => (
            <ListItem key={page} disablePadding>
              <ListItemButton 
                component={Link} 
                to={pagesPathsLoggedIn[i]} 
                key={page} 
                sx={{ textAlign: 'center' }}>
                <ListItemText primary={page} />
              </ListItemButton>
            </ListItem>
        ))}
      </List>
    </Box>
  );

  const drawerNotLoggedIn = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {
        pagesNotLoggedIn.map(
          (page, i) => (
            <ListItem key={page} disablePadding>
              <ListItemButton 
                component={Link} 
                to={pagesPathsNotLoggedIn[i]} 
                key={page} 
                sx={{ textAlign: 'center' }}>
                <ListItemText primary={page} />
              </ListItemButton>
            </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  if(loggedIn){
        return (
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar sx={{backgroundColor:"darkblue"}} component="nav">
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                
                <Typography
                  variant="h6"
                  component="div"
                  
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  <Link to={'/'}>
                  Super Budget
                  </Link>
                </Typography>
               
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {pagesLoggedIn.map((page, i) => (
                    <Button component={Link} to={pagesPathsLoggedIn[i]} key={page} sx={{ color: '#fff' }}>
                      {page}
                    </Button>
                  ))}
                </Box>
              </Toolbar>
            </AppBar>
            <Box component="nav">
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
              >
                {drawerLoggedIn}
              </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }}>
              <Toolbar />
              
            </Box>
          </Box>
        );
  }
  else{
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar sx={{backgroundColor:"darkblue"}} component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Super Budget
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {pagesNotLoggedIn.map((page, i) => (
                <Button component={Link} to={pagesPathsNotLoggedIn[i]} key={page} sx={{ color: '#fff' }}>
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawerNotLoggedIn}
          </Drawer>
        </Box>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          
        </Box>
      </Box>
    );
  }
}
