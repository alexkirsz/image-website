import "./bootstrap";

import React from "react";
import { SheetsRegistry } from "jss";
import {
  StylesProvider,
  createGenerateClassName,
  ThemeProvider,
} from "@material-ui/styles";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import theme from "@/theme";
import Layout from "@/components/Layout";

const sheetsRegistryMap = new Map();

export const wrapRootElement = ({ element, pathname }) => {
  const generateClassName = createGenerateClassName();

  const sheetsRegistry = new SheetsRegistry();
  sheetsRegistryMap.set(pathname, sheetsRegistry);

  return (
    <StylesProvider
      generateClassName={generateClassName}
      sheetsRegistry={sheetsRegistry}
      sheetsManager={new Map()}
    >
      <ThemeProvider theme={createMuiTheme(theme)}>
        {/* <MuiThemeProvider theme={createMuiTheme(theme)}> */}
        <CssBaseline />
        <Layout>{element}</Layout>
        {/* </MuiThemeProvider> */}
      </ThemeProvider>
    </StylesProvider>
  );
};

export const onRenderBody = ({ setHeadComponents, pathname }) => {
  const sheetsRegistry = sheetsRegistryMap.get(pathname);

  if (sheetsRegistry) {
    setHeadComponents([
      <style
        type="text/css"
        id="jss-server-side"
        key="jss-server-side"
        dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() }}
      />,
    ]);

    sheetsRegistryMap.delete(pathname);
  }
};
