import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

function MultiScreen() {

         useEffect(() => {
        document.title = "DMS|System";
      }, []);
  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: 'black',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          animation: `${pulse} 2s infinite`,
        }}
      >
        System is starting
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            animation: `${bounce} 1s infinite`,
            ml: 1,
          }}
        >
          ...
        </Box>
      </Typography>
    </Box>
  );
}

export default MultiScreen;
