import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#c09300", // Main primary color
      light: "#ffd54f", // Lighter shade of primary
      dark: "#8c6800", // Darker shade of primary
      contrastText: "#ffffff", // Text color for primary buttons and elements
    },
    secondary: {
      main: "#000000", // Main secondary color
      light: "#333333", // Lighter shade of secondary
      dark: "#000000", // Darker shade of secondary
      contrastText: "#ffffff", // Text color for secondary buttons and elements
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
    },
    warning: {
      main: "#ffa726",
      light: "#ffcc80",
      dark: "#fb8c00",
    },
    info: {
      main: "#29b6f6",
      light: "#4fc3f7",
      dark: "#0288d1",
    },
    success: {
      main: "#66bb6a",
      light: "#81c784",
      dark: "#388e3c",
    },
    background: {
      default: "#f4f4f4", // Default background color
      paper: "#ffffff", // Background for cards and dialogs
    },
    text: {
      primary: "#212121", // Primary text color
      secondary: "#757575", // Secondary text color
      disabled: "#bdbdbd", // Disabled text color
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif", // Font family for the entire application
    fontSize: 14, // Base font size
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 700,
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.5,
    },
    overline: {
      fontSize: "0.625rem",
      fontWeight: 700,
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Prevent uppercase text on buttons
          borderRadius: 8, // Rounded corners for buttons
        },
      },
    },
  },
});

export default theme;
