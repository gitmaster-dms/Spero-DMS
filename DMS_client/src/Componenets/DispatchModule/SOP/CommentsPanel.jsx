import { useState } from 'react';
import { Paper, Typography, TextField, Button, Stack, Box } from '@mui/material';

function CommentsPanel({ darkMode }) {
  const [placeholderVisible, setPlaceholderVisible] = useState(true);

  const textColor = darkMode ? '#ffffff' : '#000000';
  const bgColor = darkMode ? '#0a1929' : '#ffffff';

  const paperStyle = {
    padding: 2,
    marginTop: 7,
    borderRadius: 3,
    height: 'auto', // You can adjust height as needed
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: bgColor,
    color: textColor,
    transition: 'background-color 0.5s ease-in-out, color 0.5s ease-in-out',
  };

  const commentFieldStyle = {
    mb: 2,
    backgroundColor: darkMode ? '#1e293b' : '#f9f9f9',
    borderRadius: 1,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: 'none',
      },
    },
    input: { color: textColor },
    textarea: { color: textColor },
  };

  return (
    <Paper elevation={3} sx={paperStyle}>
      <Box>
        <Typography variant="h6" mb={2}  color="#5FECC8">
          Comments
        </Typography>

        <TextField
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          placeholder={placeholderVisible ? 'Write your comments here...' : ''}
          onFocus={() => setPlaceholderVisible(false)}
          onBlur={(e) => {
            if (e.target.value.trim() === '') {
              setPlaceholderVisible(true);
            }
          }}
          sx={commentFieldStyle}
          aria-label="Comment text area"
        />
      </Box>

      <Stack direction="row" justifyContent="flex-end">
        <Button variant="contained" color="primary">
          Save
        </Button>
      </Stack>
    </Paper>
  );
}

export default CommentsPanel;
