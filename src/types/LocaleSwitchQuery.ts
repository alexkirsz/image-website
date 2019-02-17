/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LocaleSwitchQuery
// ====================================================

export interface LocaleSwitchQuery_site_siteMetadata {
  __typename: "siteMetadata_2";
  defaultLocale: string | null;
}

export interface LocaleSwitchQuery_site {
  __typename: "Site";
  siteMetadata: LocaleSwitchQuery_site_siteMetadata | null;
}

export interface LocaleSwitchQuery {
  site: LocaleSwitchQuery_site | null;
}
