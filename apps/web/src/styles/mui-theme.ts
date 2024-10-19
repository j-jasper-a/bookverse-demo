import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
  cssVariables: true,
  shape: {
    borderRadius: "0.3rem",
  },
  typography: {
    fontFamily: "var(--font-main), sans-serif",
    allVariants: {
      fontSize: "1rem",
      fontWeight: "400",
      lineHeight: "1",
    },
    body1: {
      fontFamily: "var(--font-main), sans-serif",
      lineHeight: "1.25",
    },
    body2: {
      fontFamily: "var(--font-main), sans-serif",
      fontSize: "0.875rem",
      lineHeight: "1.25",
    },
    subtitle1: {
      fontFamily: "var(--font-heading), sans-serif",
      fontSize: "1.25rem",
      fontWeight: "400",
      lineHeight: "1",
    },
    subtitle2: {
      fontFamily: "var(--font-main), sans-serif",
      fontWeight: "700",
      lineHeight: "1.25",
    },
    h1: {
      fontFamily: "var(--font-heading), sans-serif",
    },
    h2: {
      fontFamily: "var(--font-heading), sans-serif",
      fontSize: "1.5rem",
    },
  },
  palette: {
    background: {
      default: "hsl(25, 100%, 95%)",
      paper: "hsl(25, 100%, 95%)",
    },
    error: {
      main: "hsl(0, 100%, 50%)",
    },
    info: {
      main: "hsl(210, 100%, 50%)",
    },
    primary: {
      main: "hsl(25, 100%, 40%)",
    },
    secondary: {
      main: "hsl(25, 40%, 85%)",
    },
    success: {
      main: "hsl(120, 100%, 40%)",
    },
    text: {
      disabled: "hsl(0, 0%, 60%)",
      primary: "hsl(0, 0%, 15%)",
      secondary: "hsl(0, 0%, 40%)",
    },
    warning: {
      main: "hsl(39, 100%, 50%)",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "outlined",
        size: "medium",
        color: "inherit",
        fullWidth: false,
        disableElevation: true,
        disableRipple: true,
        disableFocusRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          if (
            ownerState.variant === "outlined" ||
            ownerState.variant === "contained"
          ) {
            return {
              border: "2px solid",
              textTransform: "none",
              fontWeight: "700",
              boxShadow: `4px 4px 0 0 ${theme.palette.text.primary}`,
              ":hover": {
                boxShadow: `2px 2px 0 0 ${theme.palette.text.primary}`,
              },
            };
          }
          return {
            textTransform: "none",
            fontWeight: 700,
          };
        },
        sizeSmall: {
          padding: "0.25rem 1rem",
          fontSize: "0.75rem",
        },
        sizeMedium: {
          padding: "0.5rem 1rem",
          fontSize: "0.875rem",
        },
        sizeLarge: {
          padding: "1rem 2rem",
          fontSize: "1rem",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: `4px 4px 0 0 ${theme.palette.text.primary}`,
          border: "2px solid",
          ":hover": {
            boxShadow: `2px 2px 0 0 ${theme.palette.text.primary}`,
          },
        }),
      },
    },
    MuiSkeleton: {
      defaultProps: {
        variant: "rectangular",
        animation: "pulse",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.main,
          "::after": {
            backgroundColor: theme.palette.background.default,
          },
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          textDecoration: "none",
          color: theme.palette.primary.main,
          cursor: "pointer",
          ":hover": {
            textDecoration: "underline",
          },
        }),
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: () => ({
          fontSize: "0.875rem",
        }),
      },
    },
  },
});
