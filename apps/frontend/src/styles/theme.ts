"use client";

import { backdropClasses, createTheme, ThemeOptions } from "@mui/material";

const theme: ThemeOptions = createTheme({
  palette: {
    background: {
      default: "#F5F5F5",
      paper: "#F5F5F5",
    },
    primary: {
      main: "#D4E5EF",
    },
    secondary: {
      main: "#F0EBE7",
    },
    text: {
      primary: "#000000",
      secondary: "#5C573E",
    },
    info: {
      main: "#000000",
    },
  },
  typography: {
    allVariants: {
      lineHeight: "1.25",
    },
    fontFamily: "var(--font-body)",
    body2: {
      fontSize: "1rem",
      fontWeight: "700",
    },
    subtitle1: {
      fontSize: "0.875rem",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: "700",
    },
    h1: {
      fontFamily: "var(--font-heading)",
      fontSize: "inherit",
    },
    h2: {
      fontFamily: "var(--font-heading)",
      fontSize: "2rem",
      fontWeight: "700",
    },
    h3: {
      fontFamily: "var(--font-heading)",
      fontSize: "1.5rem",
      lineHeight: "1",
    },
    h4: {
      fontFamily: "var(--font-heading)",
      fontSize: "1.25rem",
      lineHeight: "1",
    },
    h5: {
      fontFamily: "var(--font-heading)",
      fontSize: "inherit",
    },
    h6: {
      fontFamily: "var(--font-heading)",
      fontSize: "inherit",
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "inherit",
          textDecoration: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          whiteSpace: "nowrap",
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            fontWeight: "700",
            border: "2px solid #000000",
            boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
          },
        },
        {
          props: { variant: "text" },
          style: {
            padding: 0,
            fontSize: "0.875rem",
            color: "#000000",
            display: "flex",
            justifyContent: "flex-start",
          },
        },
      ],
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          border: "2px solid #000000",
          boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        select: {
          padding: "0.25rem 0.5rem",
          display: "flex",
          alignItems: "center",
        },
      },
      variants: [
        {
          props: { variant: "filled", size: "small" },
          style: {
            borderRadius: 4,
            fontSize: "0.875rem",
            backgroundColor: "#F0EBE7",
            icon: {
              color: "#F0EBE7",
            },
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: "1px solid #000000",
        },
        notchedOutline: {
          // border: "1px solid #000000",
        },
        focused: {
          border: "2px solid #000000",
          boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

export default theme;
