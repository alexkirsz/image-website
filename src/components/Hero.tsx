import React, { HTMLAttributes } from "react";
import Container from "@/components/Container";
import theme from "@/theme";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { MuiThemeProvider } from "@material-ui/core";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";

const heroTheme = createMuiTheme({
  ...theme,
  palette: {
    ...theme.palette,
    type: "dark",
  },
});

const useStyles = makeStyles({
  hero: {
    position: "relative",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  container: {
    position: "relative",
  },
});

export default function Hero({
  children,
  type = "dark",
  className,
  background,
  ...otherProps
}: {
  children: React.ReactNode;
  className?: string;
  type?: "dark" | "light";
  background?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  const styles = useStyles();

  return (
    <div {...otherProps} className={classNames(styles.hero, className)}>
      {background && <div className={styles.background}>{background}</div>}

      <Container className={styles.container}>
        {type === "dark" ? (
          <MuiThemeProvider theme={heroTheme}>{children}</MuiThemeProvider>
        ) : (
          children
        )}
      </Container>
    </div>
  );
}
