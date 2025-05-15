// src/styles/themeStyles.js

import { styled } from "@mui/material/styles";
const { inputBgColor ,bgColor,textColor,borderColor} = getThemeBgColors(darkMode);


export const TableHeadingCard = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#5FECC8",
  borderRadius: "8px 10px 0 0",
  padding: "6px 12px",
  color: "black",
  height: "40px",
}));

export const TableDataCardBody = styled("tr")(({ theme, status }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.mode === "dark" ? "#1E243E" : "#FFFFFF",
  color: theme.palette.mode === "dark" ? "red" : "#FFFFFF",
  marginTop: "0.5em",
  borderRadius: "8px",
  padding: "10px 12px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  height: "45px",
  "&:hover": {
    boxShadow: `0 0 8px ${
      status === "Completed"
        ? "#00e67699"
        : status === "Pending"
        ? "#f4433699"
        : "#88888855"
    }`,
  },
}));

export const StyledCardContent = styled("td")({
  padding: "0 8px",
  display: "flex",
  alignItems: "center",
});

// Modal style
export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: bgColor,
  color: "black",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};


export const getThemeBgColors= (darkMode) => {
  const textColor = darkMode ? "#ffffff" : "#000000";
  const bgColor = darkMode ? "#0a1929" : "#ffffff";
  const borderColor = darkMode ? "#7F7F7F" : "#ccc";
  const inputBgColor = darkMode
    ? "rgba(255, 255, 255, 0.16)"
    : "rgba(0, 0, 0, 0.04)";
  const TableDataColor = darkMode
    ? "rgba(0, 0, 0, 0.04)"
    : "rgba(255, 255, 255, 0.16)";

  return {
    labelColor: darkMode ? "#5FECC8" : "#1976d2",
    textColor,
    bgColor,
    borderColor,
    inputBgColor,
    TableDataColor,
  };
};

// Shared Input Style
export const CustomTextField = {
    
  height: "3rem",
  "& .MuiInputBase-input": {
    color: "inherit !important",
  },
  "& .MuiInputBase-root": {
    height: "100%",
    padding: "0 12px",
    display: "flex",
    alignItems: "center",
  },
  borderRadius: "12px",
  "& fieldset": {
    border: borderColor,
  },
  backgroundColor: inputBgColor,
  "& input::placeholder": {
    fontSize: "0.85rem",
    color: textColor,
  },
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  },
};

export const textfieldInputFonts = {
  fontFamily: "Roboto",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "25.2px",
  letterSpacing: 0,
  verticalAlign: "middle",
};

// export const selectStyle = {
//   ...inputStyle,
//   "& .MuiSelect-select": {
//     fontSize: "0.85rem",
//     color: "inherit",
//   },
//   "& .MuiSelect-icon": {
//     color: "inherit",
//   },
// };
