/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MenuQuery
// ====================================================

export interface MenuQuery_site_siteMetadata {
  __typename: "siteMetadata_2";
  defaultLocale: string | null;
}

export interface MenuQuery_site {
  __typename: "Site";
  siteMetadata: MenuQuery_site_siteMetadata | null;
}

export interface MenuQuery {
  site: MenuQuery_site | null;
}
