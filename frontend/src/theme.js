import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0288D1',
            light: '#B3E5FC',
            dark: '#01579B',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#FF9800',
            light: '#FFE0B2',
            contrastText: '#000000',
        },
        background: {
            default: '#F8FAFC',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1E293B',
            secondary: '#64748B',
        },
        success: {
            main: '#2E7D32',
        },
        error: {
            main: '#D32F2F',
        },
    },
    typography: {
        fontFamily: "'Manrope', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            letterSpacing: '-0.02em',
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
            letterSpacing: '-0.01em',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.125rem',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: '50px',
                    padding: '10px 24px',
                    fontSize: '0.95rem',
                },
                contained: {
                    '&:hover': {
                        boxShadow: '0px 10px 25px rgba(2, 136, 209, 0.15)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                fullWidth: true,
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: '#F8FAFC',
                        '& fieldset': {
                            borderColor: '#E2E8F0',
                        },
                        '&:hover fieldset': {
                            borderColor: '#B3E5FC',
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                },
            },
        },
    },
});

export default theme;
