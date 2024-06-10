import { TabList, TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import { Box, Card, CardContent, Tab, Typography } from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

import Notes from './Notes';
import { User } from 'src/api/types';

export default function MainContent() {
  const user = useLoaderData() as User | null;
  const [value, setValue] = React.useState('0');

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue.toString());
  };

  if (user === null) {
    return <Box />;
  } else {
    return (
      <Card
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.name} {user.gender}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Birthday: {format(user.birthDate, 'MMMM d, yyyy')}
          </Typography>

          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Bio" value="0" />
                  <Tab label="Notes" value="1" />
                </TabList>
              </Box>
              <TabPanel value="0">{user.bio}</TabPanel>
              <TabPanel value="1">
                <Notes notes={user.notes} />
              </TabPanel>
            </TabContext>
          </Box>
        </CardContent>
      </Card>
    );
  }
}
