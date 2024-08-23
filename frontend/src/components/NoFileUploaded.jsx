import React from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const NoFileUploaded = () => {
  return (
    <Box className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <Typography variant="h4" component="h2" className="text-center mb-4">
        No File Uploaded
      </Typography>
      <Box>
        <Typography sx={{textAlign:'left', marginLeft:2}} variant="h6" className="mb-4">
          Please ensure your Excel file follows the structure below:
        </Typography>
        <List className="list-disc pl-5 space-y-2">
          <ListItem className="py-1">
            <ListItemText primary="Book Name (string, required)" />
          </ListItem>
          <ListItem className="py-1">
            <ListItemText primary="ISBN Code (string, required)" />
          </ListItem>
          <ListItem className="py-1">
            <ListItemText primary="Author Name (string, required)" />
          </ListItem>
          <ListItem className="py-1">
            <ListItemText primary="Author Email (string, required)" />
          </ListItem>
          <ListItem className="py-1">
            <ListItemText primary="Date of Birth (date, required)" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default NoFileUploaded;
