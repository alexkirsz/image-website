import "./bootstrap";

import React from "react";
import {
  StylesProvider,
  createGenerateClassName,
  ThemeProvider,
} from "@material-ui/styles";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import theme from "@/theme";
import Layout from "@/components/Layout";
import { HelmetProvider } from "react-helmet-async";

// Remove the server-side injected CSS.
export const onInitialClientRender = () => {
  const jssStyles = document.getElementById("jss-server-side");
  if (jssStyles && jssStyles.parentNode) {
    jssStyles.parentNode.removeChild(jssStyles);
  }
};

export const wrapRootElement = ({ element }) => {
  const generateClassName = createGenerateClassName();

  return (
    <HelmetProvider>
      <StylesProvider
        generateClassName={generateClassName}
        sheetsManager={new Map()}
      >
        <ThemeProvider theme={createMuiTheme(theme)}>
          {/* <MuiThemeProvider theme={createMuiTheme(theme)}> */}
          <CssBaseline />
          {element}
          {/* </MuiThemeProvider> */}
        </ThemeProvider>
      </StylesProvider>
    </HelmetProvider>
  );
};

export const wrapPageElement = ({ element }) => {
  return <Layout>{element}</Layout>;
};

export const shouldUpdateScroll = () => false;
