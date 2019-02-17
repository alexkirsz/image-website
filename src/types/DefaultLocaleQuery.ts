/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DefaultLocaleQuery
// ====================================================

export interface DefaultLocaleQuery_site_siteMetadata {
  __typename: "siteMetadata_2";
  defaultLocale: string | null;
}

export interface DefaultLocaleQuery_site {
  __typename: "Site";
  siteMetadata: DefaultLocaleQuery_site_siteMetadata | null;
}

export interface DefaultLocaleQuery {
  site: DefaultLocaleQuery_site | null;
}
