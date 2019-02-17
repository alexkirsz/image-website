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
import LocaleContext from "@/locale";
import { HelmetProvider } from "react-helmet-async";
import { IntlContextProvider } from "@/utils/IntlContext";
import LocaleSetup from "@/components/LocaleSetup";

const sheetsRegistryMap = new Map();
const helmetContextMap = new Map();

export const wrapRootElement = ({ element, pathname }) => {
  const generateClassName = createGenerateClassName();

  const sheetsRegistry = new SheetsRegistry();
  sheetsRegistryMap.set(pathname, sheetsRegistry);
  const helmetContext = {};
  helmetContextMap.set(pathname, helmetContext);

  return (
    <HelmetProvider context={helmetContext}>
      <StylesProvider
        generateClassName={generateClassName}
        sheetsRegistry={sheetsRegistry}
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

export const wrapPageElement = ({ element, props }) => {
  return (
    <LocaleContext.Provider value={props.pageContext.locale}>
      <LocaleSetup>
        <IntlContextProvider>
          <Layout>{element}</Layout>
        </IntlContextProvider>
      </LocaleSetup>
    </LocaleContext.Provider>
  );
};

export const onRenderBody = ({
  setHtmlAttributes,
  setBodyAttributes,
  setHeadComponents,
  pathname,
}) => {
  const helmetContext = helmetContextMap.get(pathname);

  if (helmetContext) {
    setHtmlAttributes(helmetContext.helmet.htmlAttributes.toComponent());
    setBodyAttributes(helmetContext.helmet.bodyAttributes.toComponent());
    setHeadComponents([
      helmetContext.helmet.title.toComponent(),
      helmetContext.helmet.link.toComponent(),
      helmetContext.helmet.meta.toComponent(),
      helmetContext.helmet.noscript.toComponent(),
      helmetContext.helmet.script.toComponent(),
      helmetContext.helmet.style.toComponent(),
    ]);
  }

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
