import { TabList, TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import { Box, Card, CardContent, Tab, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';

import Notes from './Notes';
import { User } from 'src/models';

export default function MainContent() {
  const { t } = useTranslation();
  const prefix = 'ContactManager.MainContent.';
  const user = useLoaderData() as User | null;
  const [currentTab, setCurrentTab] = useState('0');

  const tabChange = (_event: SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue.toString());
  };

  if (user === null) {
    return <Box />;
  }

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
          {t(`${prefix}Title.NameAndGender`, {
            name: user.name,
            gender: user.gender
          })}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t(`${prefix}SubTitle.Birthday`, {
            birthDate: user.birthDate
          })}
        </Typography>

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={currentTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={tabChange}>
                <Tab label={t(`${prefix}Tabs.Bio`)} value="0" />
                <Tab label={t(`${prefix}Tabs.Notes`)} value="1" />
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
