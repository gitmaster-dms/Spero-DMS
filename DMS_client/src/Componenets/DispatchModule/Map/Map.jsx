// src/pages/Dashboard.jsx
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const rows = [
  { task: "Flood", status: "Completed", action: "Get Data" },
  { task: "Flood", status: "Pending", action: "Dispatch" },
];

const Map = () => {


      useEffect(() => {
    document.title = "DMS|Dashboard";
  }, []);
  
  return (
    <Box sx={{ height: "100vh", width: "100vw", position: "relative" }}>
      {/* Full-screen Map */}
      <MapContainer
        center={[20.5937, 78.9629]} // India coordinates
        zoom={5}
        style={{ height: "100%", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
      </MapContainer>

      {/* Overlay UI on top of map */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          width: "400px",
          bgcolor: "white",
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          zIndex: 1000,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Task
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Task Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.task}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Button variant="contained" size="small">
                      {row.action}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Map;
