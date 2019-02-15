import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
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
import { Link } from "gatsby";
import { TabProps } from "@material-ui/core/Tab";
import { Location } from "@reach/router";
import Container from "@/components/Container";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import { ListItemProps } from "@material-ui/core/ListItem";
import classNames from "classnames";
import color from "color";
import Headroom from "react-headroom";

type MenuItem = {
  label: React.ReactNode;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
};

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
        Contact
      </Button>
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
        <ListItemText primary="Contact" />
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
    position: "absolute",
    left: theme.spacing(1),
  },
  verticalSpacer: {
    height: theme.spacing(2),
  },
  headerContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      alignItems: "center",
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
    label: "Accueil",
    to: "/",
    icon: HomeIcon,
  },
  {
    label: "Le programme",
    to: "/curriculum",
    icon: ClassIcon,
  },
  {
    label: "Les étudiants",
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
              <IconButton
                onClick={() => setDrawerOpen(true)}
                className={styles.menuIcon}
              >
                <MenuIcon />
              </IconButton>

              <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <div tabIndex={0} role="button">
                  <ResponsiveMenu
                    onSelect={() => setDrawerOpen(false)}
                    items={menuItems}
                  />
                </div>
              </Drawer>

              <Link to="/">
                <ButtonBase classes={{ root: styles.logoContainer }}>
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
            </Container>
          </header>
        </Headroom>
      </div>

      <div className={styles.bigScreen}>
        <header className={styles.header}>
          <Container className={styles.headerContainer}>
            <div className={styles.top}>
              <Link to="/">
                <ButtonBase classes={{ root: styles.logoContainer }}>
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
