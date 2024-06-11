import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Avatar, AVATARS, Gender, GENDERS, User } from 'src/api/types';
import { createUser } from 'src/api/users';

interface NewContactDialogProps {
  open: boolean;
  onClose?: (user: User | null) => void;
}

export default function NewContactDialog({
  open,
  onClose
}: NewContactDialogProps) {
  const prefix = 'ContactManager.NewContactDialog.';
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [newUserId, setNewUserId] = React.useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleDialogClose = () => {
    if (onClose !== undefined) {
      onClose(null);
    }
  };

  const action = (
    <React.Fragment>
      <Button
        color="secondary"
        size="small"
        onClick={() => {
          navigate(`/contact-manager/${newUserId}`);
          handleSnackbarClose();
        }}
      >
        {t(`${prefix}SnackBar.Action`)}
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            const newUser = await createUser({
              id: null,
              avatar: formJson.avatar as Avatar,
              gender: formJson.gender as Gender,
              name: formJson.name as string,
              birthDate: new Date(formJson.born as string),
              bio: formJson.bio as string,
              notes: []
            });

            setNewUserId(newUser.id ?? 0);
            handleDialogClose();
            setSnackbarOpen(true);
          }
        }}
      >
        <DialogTitle>{t(`${prefix}Title`)}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            select
            name="avatar"
            label={t(`${prefix}Fields.Avatar.Label`)}
            SelectProps={{
              native: true
            }}
            variant="filled"
            fullWidth
          >
            {AVATARS.map((avatar) => (
              <option key={avatar} value={avatar}>
                {avatar}
              </option>
            ))}
          </TextField>
          <TextField
            autoFocus
            required
            margin="dense"
            select
            name="gender"
            label={t(`${prefix}Fields.Gender.Label`)}
            SelectProps={{
              native: true
            }}
            variant="filled"
            fullWidth
          >
            {GENDERS.map((gender) => (
              <option key={gender} value={gender}>
                {t(`${prefix}Fields.Gender.Options`, { gender })}
              </option>
            ))}
          </TextField>
          <TextField
            required
            margin="dense"
            name="name"
            label={t(`${prefix}Fields.Name.Label`)}
            type="text"
            fullWidth
            variant="filled"
            inputProps={{ maxLength: 20 }}
          />
          <TextField
            required
            margin="dense"
            name="born"
            label={t(`${prefix}Fields.Born.Label`)}
            type="date"
            fullWidth
            variant="filled"
          />
          <TextField
            margin="dense"
            name="bio"
            multiline
            rows={10}
            label={t(`${prefix}Fields.Bio.Label`)}
            type="text"
            fullWidth
            variant="filled"
            inputProps={{ maxLength: 30 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>{t(`${prefix}Cancel`)}</Button>
          <Button type="submit">{t(`${prefix}Save`)}</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        message={t(`${prefix}SnackBar.Message`)}
        action={action}
      />
    </React.Fragment>
  );
}