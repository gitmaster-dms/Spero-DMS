
import { Grid, Box } from "@mui/material";
import SopTask from "../SOP/SopTask";
import CommentsPanel from "../SOP/CommentsPanel";
import IncidentDetails from "../SOP/IncidentDetails";
// import Footer from "..";

function Sop({ darkMode, setDarkMode }) {
  return (
    <>
      <Box
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3 },
          backgroundColor: darkMode ? "#0a1929" : "#f5f5f5",
          minHeight: "100vh",
          transition: "background-color 0.5s ease-in-out, color 0.5s ease-in-out", // 👈 Add this
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <SopTask darkMode={darkMode} setDarkMode={setDarkMode} />
          </Grid>
          <Grid item xs={12} md={3}>
            <CommentsPanel darkMode={darkMode} setDarkMode={setDarkMode} />
          </Grid>
          <Grid item xs={12} >
            <IncidentDetails darkMode={darkMode} setDarkMode={setDarkMode} />
          </Grid>
        </Grid>
      </Box>
      {/* <Footer darkMode={darkMode} setDarkMode={setDarkMode} /> */}
    </>
  );
}

export default Sop;
