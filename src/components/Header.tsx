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
import { Link } from "gatsby";
import { TabProps } from "@material-ui/core/Tab";
import { Location } from "@reach/router";
import Container from "@/components/Container";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import { ListItemProps } from "@material-ui/core/ListItem";
import classNames from "classnames";
import color from "color";

type MenuItem = {
  label: React.ReactNode;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
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

const useMenuButtonStyles = makeStyles((theme: Theme) => ({
  menuContainer: {
    display: "flex",
    paddingBottom: theme.spacing(1),
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
    // <Tabs
    //   indicatorColor="primary"
    //   // Note that in the case no item matches, the first item will be
    //   // selected by default.
    //   value={
    //     items.reduce((longestMatch, item) =>
    //       location.pathname.includes(item.to) &&
    //       item.to.length > longestMatch.to.length
    //         ? item
    //         : longestMatch,
    //     ).to
    //   }
    // >
    //   {items.map(item => (
    //     <TabLink
    //       key={item.to}
    //       value={item.to}
    //       label={item.label}
    //       to={item.to}
    //     />
    //   ))}
    // </Tabs>
  );
}

function ListItemLink({ to, ...otherProps }: { to: string } & ListItemProps) {
  return (
    <ListItem button {...otherProps} component={Link} {...{ to } as any} />
  );
}

function ResponsiveMenu({
  items,
  onSelect,
}: {
  items: Array<MenuItem>;
  onSelect: () => void;
}) {
  return (
    <List>
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
  menu: {
    display: "flex",
  },
  menuFill: {
    flexGrow: 1,
  },
  top: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
  menuIcon: {
    position: "absolute",
    left: theme.spacing(2),
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
                  <ResponsiveMenu
                    onSelect={() => setDrawerOpen(false)}
                    items={menuItems}
                  />
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

        {!smallScreen && <Menu items={menuItems} />}
      </Container>
    </header>
  );
}
