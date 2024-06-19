import AssignmentIcon from '@mui/icons-material/Assignment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { useAtom, useAtomValue } from 'jotai';
import { Link } from 'react-router-dom';

import { usersAtom } from 'src/api/users';
import { isDrawerOpenAtom, textDirectionAtom } from 'src/contexts';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}));

export default function SideNav() {
  const [drawerOpen, setDrawerOpen] = useAtom(isDrawerOpenAtom);
  const [users] = useAtom(usersAtom);
  const textDirection = useAtomValue(textDirectionAtom);

  return (
    <Drawer
      anchor={textDirection === 'ltr' ? 'left' : 'right'}
      variant="permanent"
      open={drawerOpen}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <IconButton
          onClick={() => {
            setDrawerOpen(!drawerOpen);
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {users.map((user) => (
          <Link
            key={user.id}
            color="inherit"
            to={`/contact-manager/${user.id}`}
          >
            <ListItemButton>
              <ListItemText hidden={!drawerOpen} primary={user.name} />
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
