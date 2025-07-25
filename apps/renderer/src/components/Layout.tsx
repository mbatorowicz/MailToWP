import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { Email, Mail, Article, Settings, Build } from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Layout: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Gmail" icon={<Mail />} {...a11yProps(0)} />
          <Tab label="AI Analysis" icon={<Email />} {...a11yProps(1)} />
          <Tab label="Article" icon={<Article />} {...a11yProps(2)} />
          <Tab label="WordPress" icon={<Settings />} {...a11yProps(3)} />
          <Tab label="Settings" icon={<Build />} {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Gmail Integration - Coming Soon
      </TabPanel>
      <TabPanel value={value} index={1}>
        AI Analysis - Coming Soon
      </TabPanel>
      <TabPanel value={value} index={2}>
        Article Management - Coming Soon
      </TabPanel>
      <TabPanel value={value} index={3}>
        WordPress Integration - Coming Soon
      </TabPanel>
      <TabPanel value={value} index={4}>
        Settings & Configuration - Coming Soon
      </TabPanel>
    </Box>
  );
};

export default Layout; 