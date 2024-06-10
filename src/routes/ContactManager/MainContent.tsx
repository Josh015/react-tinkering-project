import { Box, Card, CardContent, Tab, Typography } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import { TabList, TabPanel } from '@mui/lab';
import React from 'react';
import { Params, useLoaderData } from 'react-router-dom';

import { getUser } from 'src/api/users';
import { User } from 'src/api/types';
import { format } from 'date-fns';

export function mainContentLoader({
  params: { id }
}: {
  params: Readonly<Params<string>>;
}): Promise<User | null> {
  return getUser(+(id ?? 0));
}

export default function MainContent() {
  const user = useLoaderData() as User;
  const [value, setValue] = React.useState('0');

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue.toString());
  };

  return (
    <Card
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.name} {user.gender}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Birthday: {format(user?.birthDate, 'MMMM d, yyyy')}
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
            <TabPanel value="0">{user?.bio ?? ''}</TabPanel>
            <TabPanel value="1">Item Two</TabPanel>
          </TabContext>
        </Box>
      </CardContent>
    </Card>
  );
}
