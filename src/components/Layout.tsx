import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/styles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Theme } from "@material-ui/core";
import Helmet from "react-helmet-async";

const useStyles = makeStyles((theme: Theme) => ({
  "@global": {
    "html, body": {
      height: "100%",
      [theme.breakpoints.down("xs")]: {
        fontSize: 14,
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: 18,
      },
    },

    "#___gatsby, #___gatsby > div": {
      height: "100%",
    },
  },

  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  main: {
    flexGrow: 1,
    flexShrink: 0,
    overflowY: "auto",
  },
}));

export default function Layout({ children }: { children?: ReactNode }) {
  const styles = useStyles();

  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500"
        />
      </Helmet>

      <div className={styles.root}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
