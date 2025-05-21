// src/styles/themeStyles.js

import { colors } from "@mui/material";
import { styled } from "@mui/material/styles";

export const getThemeBgColors = (darkMode) => {
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


const darkMode = true; // Replace this later with actual dynamic value

// STEP 3: Destructure theme values
const { textColor, bgColor, borderColor, inputBgColor } =
  getThemeBgColors(darkMode);


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
    boxShadow: `0 0 8px ${status === "Completed"
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

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: bgColor,
  color: textColor,
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const CustomTextField = {
  height: "3rem",
  "& .MuiInputBase-input": {
    color: textColor,
  },
  "& .MuiInputBase-root": {
    height: "100%", // Ensure input wrapper matches height
    padding: "0 12px", // Horizontal padding
    display: "flex",
    alignItems: "center", // Center content vertically
  },
  borderRadius: "12px",
  "& fieldset": {
    border: "none", // Remove border
  },
  backgroundColor: "rgba(255, 255, 255, 0.16)",
  "& input::placeholder": {
    fontSize: "0.85rem",
    color: textColor,
  },
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)", // Add box shadow
  "&:hover": {
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", // Increase shadow on hover
  },
};
export const inputStyle = {
  height: "3rem",
  "& .MuiInputBase-input": {
    color: `${textColor} !important`,
  },
  "& .MuiInputBase-root": {
    height: "100%",
    padding: "0 12px",
    display: "flex",
    alignItems: "center",
  },
  borderRadius: "12px",
  "& fieldset": {
    border: "none",
  },
  backgroundColor: inputBgColor,
  "& input::placeholder": {
    fontSize: "0.85rem",
    color: `${textColor} !important`,
  },
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  },
};

export const fontsTableBody = {
  fontFamily: "Roboto",
  fontWeight: 400,
  fontSize: 18,
  letterSpacing: 0,
  textAlign: "center",
};

export const fontsTableHeading = {
  fontFamily: "Roboto",
  fontWeight: 500,
  fontSize: 14,
  letterSpacing: 0,
  textAlign: "center",
  color: textColor,
};

export const textfieldInputFonts = {
  fontFamily: "Roboto",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "25.2px",
  letterSpacing: 0,
  verticalAlign: "middle",
  color: textColor,
};

export const getCustomSelectStyles = (isDarkMode) => {
  const textColor = isDarkMode ? "#fff" : "#000";
  const textfieldcolor = isDarkMode ? "#fff" : "grey";
  const placeholderColor = isDarkMode ? "#bbb" : "#666";
  const bgColor = isDarkMode
    ? "rgba(255, 255, 255, 0.16)"
    : "rgba(0, 0, 0, 0.04)";

  return {
    height: "3rem",
    borderRadius: "12px",
    backgroundColor: bgColor,
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    },
    "& .MuiSelect-select": {
      color: textColor,
      fontSize: "13px",
    },
    "& .MuiSelect-displayEmpty": {
      color: placeholderColor,
      fontSize: "0.9rem",
      fontweight: "400",
      fontFamily: "Roboto",
    },
    "& .MuiInputBase-root": {
      height: "100%",
      padding: "0 12px",
      display: "flex",
      alignItems: "center",
    },
    "& fieldset": {
      border: "none",
    },
  };
};
