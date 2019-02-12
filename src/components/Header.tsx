import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import {
  Tabs,
  Tab,
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
import { Link, GatsbyLinkProps } from "gatsby";
import { TabProps } from "@material-ui/core/Tab";
import { Location } from "@reach/router";
import Container from "@/components/Container";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import { ListItemProps } from "@material-ui/core/ListItem";

type MenuItem = {
  label: React.ReactNode;
  to: string;
  icon: React.ComponentType<{}>;
};

const useTabStyles = makeStyles((theme: Theme) => ({
  tab: {
    textTransform: "none",
    fontWeight: 400,
  },
}));

function TabLink({ to, ...otherProps }: { to: string } & TabProps) {
  const styles = useTabStyles();
  return (
    <Tab
      {...otherProps}
      classes={{ root: styles.tab }}
      component={Link}
      {...{ to } as any}
    />
  );
}

function Menu({ items }: { items: Array<MenuItem> }) {
  return (
    <Location>
      {({ location }) => (
        <Tabs
          indicatorColor="primary"
          // Note that in the case no item matches, the first item will be
          // selected by default.
          value={
            items.reduce((longestMatch, item) =>
              location.pathname.includes(item.to) &&
              item.to.length > longestMatch.to.length
                ? item
                : longestMatch,
            ).to
          }
        >
          {items.map(item => (
            <TabLink
              key={item.to}
              value={item.to}
              label={item.label}
              to={item.to}
            />
          ))}
        </Tabs>
      )}
    </Location>
  );
}

function ListItemLink({ to, ...otherProps }: { to: string } & ListItemProps) {
  return (
    <ListItem button {...otherProps} component={Link} {...{ to } as any} />
  );
}

function ResponsiveMenu({ items }: { items: Array<MenuItem> }) {
  return (
    <List>
      {items.map(item => (
        <ListItemLink to={item.to} button key={item.to}>
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
  menu: {
    display: "flex",
  },
  menuFill: {
    flexGrow: 1,
  },
  top: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    justifyContent: "center",
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
    width: theme.spacing.unit * 3,
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing.unit * 2,
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
  contactButton: {
    textTransform: "none",
    fontWeight: "inherit",
    alignSelf: "center",
  },
  contactIcon: {
    marginRight: theme.spacing.unit,
  },
  menuIcon: {
    position: "absolute",
    left: theme.spacing.unit * 2,
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
  const theme = useTheme<Theme>();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.top}>
          {smallScreen && (
            <>
              <IconButton
                className={styles.menuIcon}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <div tabIndex={0} role="button">
                  <ResponsiveMenu items={menuItems} />
                </div>
              </Drawer>
            </>
          )}

          <Link to="/">
            <ButtonBase classes={{ root: styles.logoContainer }}>
              <img
                src={require("@/images/logo_clear.svg")}
                alt="Logo"
                className={styles.logo}
              />
              {/* <AnimatedLogo className={styles.logo} /> */}

              <div className={styles.logoSpacer} />

              <img
                src={require("@/images/logo_text.svg")}
                alt="IMAGE"
                className={styles.logoText}
              />
            </ButtonBase>
          </Link>
        </div>

        {!smallScreen && (
          <div className={styles.menu}>
            <Menu items={menuItems} />

            <div className={styles.menuFill} />

            <Button
              color="primary"
              classes={{ root: styles.contactButton }}
              size="small"
              component="a"
              href="mailto:2020-image@ml.cri.epita.fr"
            >
              <MailIcon className={styles.contactIcon} />
              Contact
            </Button>
          </div>
        )}
      </Container>
    </header>
  );
}
