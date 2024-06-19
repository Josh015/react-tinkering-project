import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAtom } from 'jotai';
import { Fragment, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import NewContactDialog from './NewContactDialog';
import { isDrawerOpenAtom, isLeftToRightAtom } from 'src/contexts';

const drawerWidth = 240;

interface AppBarStylesProps extends MuiAppBarProps {
  open?: boolean;
  isLeftToRight?: boolean;
}

const AppBarStyles = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isLeftToRight'
})<AppBarStylesProps>(({ theme, open, isLeftToRight }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    ...(isLeftToRight
      ? { marginLeft: drawerWidth }
      : { marginRight: drawerWidth }),
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

export default function AppBar() {
  const { t } = useTranslation();
  const prefix = 'ContactManager.Toolbar.';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newContactDialogOpen, setNewContactDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useAtom(isDrawerOpenAtom);
  const [isLeftToRight, setIsLeftToRight] = useAtom(isLeftToRightAtom);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <AppBarStyles
        position="absolute"
        open={drawerOpen}
        isLeftToRight={isLeftToRight}
      >
        <Toolbar
          sx={{
            pr: '24px' // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge={isLeftToRight ? 'start' : 'end'}
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setDrawerOpen(!drawerOpen);
            }}
            sx={{
              ...(isLeftToRight
                ? { marginRight: '36px' }
                : { marginLeft: '36px' }),
              ...(drawerOpen && { display: 'none' })
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
            aria-controls={drawerOpen ? 'long-menu' : undefined}
            aria-expanded={drawerOpen ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
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
            <MenuItem
              onClick={() => {
                setNewContactDialogOpen(true);
                handleClose();
              }}
            >
              {t(`${prefix}Menu.NewContact`)}
            </MenuItem>
            <MenuItem disabled={true} onClick={handleClose}>
              {t(`${prefix}Menu.ToggleTheme`)}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIsLeftToRight(!isLeftToRight);
                handleClose();
              }}
            >
              {t(`${prefix}Menu.ToggleDir`)}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBarStyles>

      <NewContactDialog
        open={newContactDialogOpen}
        onClose={() => {
          setNewContactDialogOpen(false);
        }}
      />
    </Fragment>
  );
}
