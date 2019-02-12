import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import {
  StylesProvider,
  createGenerateClassName,
  ThemeProvider,
} from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import theme from "@/theme";
import Layout from "@/components/Layout";

// Remove the server-side injected CSS.
export function onInitialClientRender() {
  const jssStyles = document.getElementById("jss-server-side");
  if (jssStyles && jssStyles.parentNode) {
    jssStyles.parentNode.removeChild(jssStyles);
  }
}

export function wrapRootElement({ element }: { element: React.ReactNode }) {
  const generateClassName = createGenerateClassName();
  console.log(arguments, element);
  return (
    <StylesProvider
      generateClassName={generateClassName}
      sheetsManager={new Map()}
    >
      <ThemeProvider theme={createMuiTheme(theme)}>
        <MuiThemeProvider theme={createMuiTheme(theme)}>
          <CssBaseline />
          <Layout>{element}</Layout>
        </MuiThemeProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}
