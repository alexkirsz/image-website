import React from "react";
import { SheetsRegistry } from "jss";
import {
  StylesProvider,
  createGenerateClassName,
  ThemeProvider,
} from "@material-ui/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import theme from "@/theme";
import Layout from "@/components/Layout";

const sheetsRegistryMap = new Map();

export function wrapRootElement({
  element,
  pathname,
}: {
  element: React.ReactNode;
  pathname: string;
}) {
  const generateClassName = createGenerateClassName();

  const sheetsRegistry = new SheetsRegistry();
  sheetsRegistryMap.set(pathname, sheetsRegistry);

  return (
    <StylesProvider
      generateClassName={generateClassName}
      sheetsRegistry={sheetsRegistry}
      sheetsManager={new Map()}
    >
      <MuiThemeProvider theme={createMuiTheme(theme)}>
        <ThemeProvider theme={createMuiTheme(theme)}>
          <CssBaseline />
          <Layout>{element}</Layout>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export function onRenderBody({
  setHeadComponents,
  pathname,
}: {
  setHeadComponents: (elts: Array<React.ReactNode>) => void;
  pathname: string;
}) {
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
}
