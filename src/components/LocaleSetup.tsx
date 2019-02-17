import { useContext } from "react";
import LocaleContext from "@/locale";
import { IntlProvider, addLocaleData, defineMessages } from "react-intl";
import frLocaleData from "react-intl/locale-data/fr";
import enLocaleData from "react-intl/locale-data/en";
import React from "react";

addLocaleData([...frLocaleData, ...enLocaleData]);

const messages = {
  en: require("@/locales/en.yaml"),
  fr: require("@/locales/fr.yaml"),
};

export default function LocaleSetup({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useContext(LocaleContext);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
}
