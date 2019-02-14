import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet-async";

export default function Meta({ title }: { title: string }) {
  return (
    <StaticQuery
      query={graphql`
        query MetaQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <Helmet
          htmlAttributes={{
            lang: "fr",
          }}
          title={title}
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
        />
      )}
    />
  );
}
