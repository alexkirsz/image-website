import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme, ButtonBase, IconButton, Drawer } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/MenuTwoTone";
import PeopleIcon from "@material-ui/icons/PeopleTwoTone";
import HomeIcon from "@material-ui/icons/HomeTwoTone";
import ClassIcon from "@material-ui/icons/ClassTwoTone";
import Container from "@/components/Container";
import Headroom from "react-headroom";
import Link from "@/components/Link";
import { FormattedMessage } from "react-intl";
import { MenuItem } from "@/components/MenuItem";
import ResponsiveMenu from "@/components/ResponsiveMenu";
import Menu from "@/components/Menu";

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
