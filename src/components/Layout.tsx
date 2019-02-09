import React, { ReactNode } from "react";
import Helmet from "react-helmet";

require("@/styles/globals.css");

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Fira+Sans:300,400,600"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Unica+One"
          rel="stylesheet"
        />
      </Helmet>

      {children}
    </>
  );
}
