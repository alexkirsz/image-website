import * as React from "react";
import { useContext } from "react";
import { injectIntl, InjectedIntl } from "react-intl";

export const IntlContext = React.createContext<InjectedIntl>(
  {} as InjectedIntl,
);

export const IntlContextProvider = injectIntl(({ intl, children }) => {
  return <IntlContext.Provider value={intl}>{children}</IntlContext.Provider>;
});
