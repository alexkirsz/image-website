import { makeStyles } from "@material-ui/styles";
import { Theme, Button, IconButton } from "@material-ui/core";
import color from "color";
import { useContext } from "react";
import LocaleContext from "@/locale";
import { useStaticQuery, graphql } from "gatsby";
import React from "react";
import getLocalePrefix from "@/utils/getLocalePrefix";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { Location } from "@reach/router";
import MailIcon from "@material-ui/icons/MailTwoTone";
import LocaleSwitchLink from "@/components/LocaleSwitchLink";
import { MenuItem } from "@/components/MenuItem";
import { MenuQuery } from "@/types/MenuQuery";
import Link from "@/components/Link";

const useStyles = makeStyles((theme: Theme) => ({
  menuContainer: {
    display: "flex",
  },
  menuFill: {
    flexGrow: 1,
  },
  buttonRoot: {
    textTransform: "none",
    fontWeight: 400,
    color: theme.palette.primary.dark,
    marginRight: theme.spacing(1),
    "&:hover": {
      backgroundColor: color(theme.palette.primary.dark)
        .alpha(0.08)
        .toString(),
    },
    "&:last-child": {
      marginRight: 0,
    },
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
  buttonLast: {
    marginRight: 0,
  },
  buttonActive: {
    boxShadow: `0px 0px 0px 1px ${color(theme.palette.primary.dark).alpha(
      0.25,
    )}`,
  },
  flag: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Menu({ items }: { items: Array<MenuItem> }) {
  const styles = useStyles();
  const locale = useContext(LocaleContext);
  const data = useStaticQuery<MenuQuery>(graphql`
    query MenuQuery {
      site {
        siteMetadata {
          defaultLocale
        }
      }
    }
  `);

  return (
    <div className={styles.menuContainer}>
      <Location>
        {({ location }) => {
          const prefix = getLocalePrefix(
            locale,
            data.site!.siteMetadata!.defaultLocale!,
          );
          const pathname =
            location.pathname.indexOf(prefix) === 0
              ? location.pathname.slice(prefix.length)
              : location.pathname;
          const activeMenuButton = items.reduce((longestMatch, item) =>
            pathname.includes(item.to) &&
            item.to.length > longestMatch.to.length
              ? item
              : longestMatch,
          ).to;

          return items.map((item, idx) => (
            <Button
              key={item.to}
              classes={{
                root: classNames(
                  styles.buttonRoot,
                  activeMenuButton === item.to && styles.buttonActive,
                  idx === items.length - 1 && styles.buttonLast,
                ),
              }}
              component={Link}
              {...{ to: item.to } as any}
            >
              <item.icon className={styles.buttonIcon} />
              {item.label}
            </Button>
          ));
        }}
      </Location>

      <div className={styles.menuFill} />

      <Button
        classes={{
          root: styles.buttonRoot,
        }}
        component="a"
        href="mailto:2020-image@ml.cri.epita.fr"
      >
        <MailIcon className={styles.buttonIcon} />
        <FormattedMessage id="menu_contact" />
      </Button>

      <IconButton
        classes={{
          root: classNames(styles.buttonRoot, styles.flag),
        }}
        // Issue with MUI's Typescript Defs.
        {...{ component: LocaleSwitchLink }}
      />
    </div>
  );
}
