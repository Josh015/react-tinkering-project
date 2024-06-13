import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Fragment, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import NewContactDialog from './NewContactDialog';

const drawerWidth = 240;

interface AppBarProps {
  open: boolean;
  toggleDrawer: () => void;
}

interface AppBarStylesProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBarStyles = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarStylesProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

export default function AppBar({ open, toggleDrawer }: AppBarProps) {
  const { t } = useTranslation();
  const prefix = 'ContactManager.Toolbar.';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [newContactDialogOpen, setNewContactDialogOpen] = useState(false);
  const handleNewContactDialogOpen = () => {
    setNewContactDialogOpen(true);
    handleClose();
  };
  const handleNewContactDialogClose = () => {
    setNewContactDialogOpen(false);
  };

  return (
    <Fragment>
      <AppBarStyles position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px' // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {t(`${prefix}Title`)}
          </Typography>
          <IconButton
            aria-label="more"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
          >
            <MenuItem onClick={handleNewContactDialogOpen}>
              {t(`${prefix}Menu.NewContact`)}
            </MenuItem>
            <MenuItem disabled={true} onClick={handleClose}>
              {t(`${prefix}Menu.ToggleTheme`)}
            </MenuItem>
            <MenuItem disabled={true} onClick={handleClose}>
              {t(`${prefix}Menu.ToggleDir`)}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBarStyles>

      <NewContactDialog
        open={newContactDialogOpen}
        onClose={handleNewContactDialogClose}
      />
    </Fragment>
  );
}
