import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Theme,
  Button,
  ButtonBase,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@material-ui/core";
import MailIcon from "@material-ui/icons/MailTwoTone";
import MenuIcon from "@material-ui/icons/MenuTwoTone";
import PeopleIcon from "@material-ui/icons/PeopleTwoTone";
import HomeIcon from "@material-ui/icons/HomeTwoTone";
import ClassIcon from "@material-ui/icons/ClassTwoTone";
import { Location } from "@reach/router";
import Container from "@/components/Container";
import classNames from "classnames";
import color from "color";
import Headroom from "react-headroom";
import Link from "@/components/Link";
import LocaleContext from "@/locale";
import {
  useStaticQuery,
  graphql,
  Link as GatsbyLink,
  GatsbyLinkProps,
} from "gatsby";
import getLocalePrefix from "@/utils/getLocalePrefix";
import { FormattedMessage } from "react-intl";
import { LocaleSwitchQuery } from "@/types/LocaleSwitchQuery";
import { ListItemProps } from "@material-ui/core/ListItem";

type MenuItem = {
  label: React.ReactNode;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
};

const useLocaleSwitchStyles = makeStyles({
  flag: {
    width: "1em",
    height: "1em",
    lineHeight: "1.2em",
    margin: "-0.2em",
  },
});

function LocaleSwitchLink<TState>(props: GatsbyLinkProps<TState>) {
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
  const styles = useLocaleSwitchStyles();

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
      {({ location }) => (
        <GatsbyLink
          {...props as any}
          to={
            newPrefix +
            (location.pathname.indexOf(prevPrefix) === 0
              ? location.pathname.slice(prevPrefix.length)
              : location.pathname)
          }
        >
          <div className={styles.flag}>{flags[otherLocale]}</div>
        </GatsbyLink>
      )}
    </Location>
  );
}

const useMenuButtonStyles = makeStyles((theme: Theme) => ({
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

function Menu({ items }: { items: Array<MenuItem> }) {
  const styles = useMenuButtonStyles();

  return (
    <div className={styles.menuContainer}>
      <Location>
        {({ location }) => {
          const activeMenuButton = items.reduce((longestMatch, item) =>
            location.pathname.includes(item.to) &&
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

function ListItemLink({ to, ...otherProps }: { to: string } & ListItemProps) {
  return (
    <ListItem button {...otherProps} component={Link} {...{ to } as any} />
  );
}

const useResponsiveMenuStyles = makeStyles({
  root: {
    width: 250,
  },
});

function ResponsiveMenu({
  items,
  onSelect,
}: {
  items: Array<MenuItem>;
  onSelect: () => void;
}) {
  const styles = useResponsiveMenuStyles();

  return (
    <List classes={{ root: styles.root }}>
      {items.map(item => (
        <ListItemLink to={item.to} button key={item.to} onClick={onSelect}>
          <ListItemIcon>
            <item.icon />
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemLink>
      ))}
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id="menu_contact" />} />
      </ListItem>
    </List>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    // Draw it on top of other elements.
    position: "relative",
    backgroundColor: "white",
  },
  smallScreen: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  bigScreen: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  menuIcon: {
    flexShrink: 0,
  },
  verticalSpacer: {
    height: theme.spacing(2),
  },
  buttonContainer: {
    marginLeft: theme.spacing(-1),
    marginRight: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    width: 0,
  },
  headerContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      justifyContent: "center",
    },
  },
  menu: {
    display: "flex",
  },
  menuFill: {
    flexGrow: 1,
  },
  top: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
  },
  logoButton: {
    borderRadius: theme.shape.borderRadius,
  },
  logo: {
    height: 64,
    [theme.breakpoints.down("xs")]: {
      height: 48,
    },
  },
  logoSpacer: {
    width: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(2),
    },
  },
  logoText: {
    height: 32,
    [theme.breakpoints.down("xs")]: {
      height: 24,
    },
  },
  topFill: {
    flexGrow: 1,
  },
}));

const menuItems: Array<MenuItem> = [
  {
    label: <FormattedMessage id="menu_home" />,
    to: "/",
    icon: HomeIcon,
  },
  {
    label: <FormattedMessage id="menu_curriculum" />,
    to: "/curriculum",
    icon: ClassIcon,
  },
  {
    label: <FormattedMessage id="menu_students" />,
    to: "/students",
    icon: PeopleIcon,
  },
];

export default function Header() {
  const styles = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className={styles.smallScreen}>
        <Headroom>
          <header className={styles.header}>
            <Container className={styles.headerContainer}>
              <div className={styles.buttonContainer}>
                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  className={styles.menuIcon}
                >
                  <MenuIcon />
                </IconButton>
              </div>

              <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <div tabIndex={0} role="button">
                  <ResponsiveMenu
                    onSelect={() => setDrawerOpen(false)}
                    items={menuItems}
                  />
                </div>
              </Drawer>

              <div className={styles.logoContainer}>
                <Link to="/">
                  <ButtonBase classes={{ root: styles.logoButton }}>
                    <img
                      src={require("@/images/logo_clear.svg")}
                      alt="Logo"
                      className={styles.logo}
                    />

                    <div className={styles.logoSpacer} />

                    <img
                      src={require("@/images/logo_text.svg")}
                      alt="IMAGE"
                      className={styles.logoText}
                    />
                  </ButtonBase>
                </Link>
              </div>
            </Container>
          </header>
        </Headroom>
      </div>

      <div className={styles.bigScreen}>
        <header className={styles.header}>
          <Container className={styles.headerContainer}>
            <div className={styles.top}>
              <Link to="/">
                <ButtonBase classes={{ root: styles.logoButton }}>
                  <img
                    src={require("@/images/logo_clear.svg")}
                    alt="Logo"
                    className={styles.logo}
                  />

                  <div className={styles.logoSpacer} />

                  <img
                    src={require("@/images/logo_text.svg")}
                    alt="IMAGE"
                    className={styles.logoText}
                  />
                </ButtonBase>
              </Link>
            </div>

            <div className={styles.verticalSpacer} />

            <Menu items={menuItems} />
          </Container>
        </header>
      </div>
    </>
  );
}
