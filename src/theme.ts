import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { pink, lightBlue } from "@material-ui/core/colors";

const theme: ThemeOptions = {
  typography: {
    useNextVariants: true,
  },
  palette: {
    background: {
      default: "white",
    },
    primary: {
      main: lightBlue.A400,
    },
    secondary: {
      main: pink.A400,
    },
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontWeight: 100,
      },
      h2: {
        fontWeight: 100,
      },
      h3: {
        fontWeight: 100,
      },
      h4: {
        fontWeight: 300,
      },
      h5: {
        fontWeight: 300,
      },
      h6: {
        fontWeight: 300,
      },
    },
  },
};

export default theme;
