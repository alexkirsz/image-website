import React, { HTMLAttributes } from "react";
import Container from "@/components/Container";
import theme from "@/theme";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { MuiThemeProvider } from "@material-ui/core";

export const darkTheme = createMuiTheme({
  ...theme,
  palette: {
    ...theme.palette,
    type: "dark",
  },
});

export default function Hero({
  children,
  type = "dark",
  ...otherProps
}: {
  children: React.ReactNode;
  type?: "dark" | "light";
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...otherProps}>
      <Container>
        {type === "dark" ? (
          <MuiThemeProvider theme={darkTheme}>{children}</MuiThemeProvider>
        ) : (
          children
        )}
      </Container>
    </div>
  );
}
