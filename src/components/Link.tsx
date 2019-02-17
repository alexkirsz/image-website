import {
  Link as GatsbyLink,
  GatsbyLinkProps,
  useStaticQuery,
  graphql,
} from "gatsby";
import React, { useContext } from "react";
import LocaleContext from "@/locale";
import getLocalePrefix from "@/utils/getLocalePrefix";
import { DefaultLocaleQuery } from "@/types/DefaultLocaleQuery";

export default function Link<TState>({
  to,
  ...otherProps
}: GatsbyLinkProps<TState>) {
  const locale = useContext(LocaleContext);
  const data = useStaticQuery<DefaultLocaleQuery>(graphql`
    query DefaultLocaleQuery {
      site {
        siteMetadata {
          defaultLocale
        }
      }
    }
  `);
  const prefix = getLocalePrefix(
    locale,
    data.site!.siteMetadata!.defaultLocale!,
  );
  const prefixedPathname = `${prefix}${to}`;
  const pathname =
    prefixedPathname === "/" ? "/" : prefixedPathname.replace(/\/$/, "");
  // Gatsby's TS definitions leave much to be desired.
  return <GatsbyLink {...otherProps as any} to={pathname} />;
}
