import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Theme, Link } from "@material-ui/core";
import Container from "@/components/Container";

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
  footerContent: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  fill: {
    flexGrow: 1,
  },
}));

export default function Footer() {
  const styles = useStyles();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          <Typography variant="caption" color="textSecondary">
            © Étudiants IMAGE 2020
          </Typography>

          <div className={styles.fill} />

          <Typography variant="caption" color="textSecondary">
            <Link href="https://www.lrde.epita.fr/">LRDE</Link>
            {" — "}
            <Link href="https://www.epita.fr/">EPITA</Link>
          </Typography>
        </div>
      </Container>
    </footer>
  );
}
