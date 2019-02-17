import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { Location } from "@reach/router";
import LocaleContext from "@/locale";
import {
  useStaticQuery,
  graphql,
  Link as GatsbyLink,
  GatsbyLinkProps,
} from "gatsby";
import getLocalePrefix from "@/utils/getLocalePrefix";
import { LocaleSwitchQuery } from "@/types/LocaleSwitchQuery";

const useStyles = makeStyles({
  flag: {
    width: "1em",
    height: "1em",
    lineHeight: "1.2em",
    margin: "-0.2em",
  },
});

export default function LocaleSwitchLink<TState>(
  props: GatsbyLinkProps<TState>,
) {
  const locale = useContext(LocaleContext);
  const data = useStaticQuery<LocaleSwitchQuery>(graphql`
    query LocaleSwitchQuery {
      site {
        siteMetadata {
          defaultLocale
        }
      }
    }
  `);
  const styles = useStyles();

  const otherLocale = locale === "fr" ? "en" : "fr";
  const defaultLocale = data.site!.siteMetadata!.defaultLocale!;
  const newPrefix = getLocalePrefix(otherLocale, defaultLocale);
  const prevPrefix = getLocalePrefix(locale, defaultLocale);
  const flags = {
    en: "🇬🇧",
    fr: "🇫🇷",
  };
  return (
    <Location>
      {({ location }) => {
        const unprefixedPathname =
          location.pathname.indexOf(prevPrefix) === 0
            ? location.pathname.slice(prevPrefix.length)
            : location.pathname;
        const nextPathname = newPrefix + unprefixedPathname;
        const pathname =
          nextPathname === "/" ? "/" : nextPathname.replace(/\/$/, "");
        return (
          <GatsbyLink {...props as any} to={pathname}>
            <div className={styles.flag}>{flags[otherLocale]}</div>
          </GatsbyLink>
        );
      }}
    </Location>
  );
}
